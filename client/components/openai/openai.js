import {
  Attribute,
  Define,
  Template,
  Styles,
} from '@steelskysoftware/facade-client'
import { wait } from '@steelskysoftware/facade-toolbox'
import { IDB } from '@steelskysoftware/facade-client/src/lib/idb.js'
import debounce from 'lodash/debounce'
import merge from 'lodash/merge'
import { OpenAI } from '../../models/openai.js'
import IO from 'socket.io-client'
import prismCSS from '../../lib/prism/prism.styl'
import '../../lib/prism/prism.js'
import template from './openai.pug'
import componentCSS from './openai.styl'
import '@steelskysoftware/facade-client/src/components/button/button.js'
import '@steelskysoftware/facade-client/src/components/select/select.js'

const { ws } = window.config

const SOCKETS = ['openai', 'guesslang'].reduce((acc, namespace) => {
  acc[namespace] = IO(`${ws.root}/${ws.namespace}/${namespace}`, {
    transports: ['websocket']
  })
  return acc
}, {})

@Define('ss')
@Template(template)
@Styles([componentCSS, prismCSS])
export default class Openai extends HTMLElement {
  created() {
    this.initPreRenderContext()
  }

  async connected() {
    this.initPostRenderContext()

    await this.initIDB()
    await this.loadAndPrepareModels()
    await this.loadCurrentOrDefaultModel()

    this.initSocketListeners()
    this.initResizeObserver()

    this.render()
  }

  disconnected() {
    for(const socket of SOCKETS) {
      SOCKETS[socket].emit('close')
    }
  }

  async initIDB() {
    this.idb = await new IDB('openai', 3)
    await this.idb.getOrCreateStore('settings')
  }

  async loadAndPrepareModels() {
    let modelsData

    try {
      modelsData = await OpenAI.load('models')

    } catch (e) {
      return console.error(e)
    }

    const { filtered, personalities, contexts } = modelsData

    if(!filtered?.length) {
      return console.error('No models were loadable! Aborting setup.')
    }

    this.models = filtered
    this.personalities = personalities
    this.contexts = contexts
  }

  async loadCurrentOrDefaultModel() {
    const selectedModelId = await this.getSetting('selectedModel')

    try {
      await this.selectModel(selectedModelId || this.models.find(model => model.default).id)
    } catch (e) {
      throw e
    }
  }

  initSocketListeners() {
    SOCKETS.openai.on('response', (response) => {
      this.responseElement.textContent += response
      this.guesslang('response')
    })

    SOCKETS.openai.on('done', (response) => {
      this.isResponding = false
      this.render()
      if(this.isCode) {
        this.responseElement.textContent = this.responseElement
          .textContent.replace(/(```(\w.*|)(\n|$))/gmi, '')
      }
      this.guesslang('response')
    })

    SOCKETS.guesslang.on('result', ({ error, result, namespace }) => {
      this.isGuesslanging = false

      if(error) {
        return console.error('guesslang error', { namespace, error, result })
      }

      if(result && namespace) {
        this.textElements[namespace].lang = result
        this.highlight(namespace)
      }
    })
  }

  initResizeObserver() {
    const _resize = debounce(height => {
      this.shadowRoot.querySelector('pre.preview').style.height = `${height}px`
    }, 50)

    new ResizeObserver((entries) => {
      _resize(entries[0].borderBoxSize[0].blockSize)
    }).observe(this.inputElement)
  }

  initPreRenderContext() {
    this.models = []
    this.model = {}
    this.lastHighlight = Date.now() - 2000
    this.isResponding = false
    this.isGuesslanging = false
  }

  initPostRenderContext() {
    this.guesslang = debounce((namespace, opts = {}) => {
      this._guesslang(namespace, opts)
    }, 1000)

    this.inputElement = this.shadowRoot.querySelector('textarea.input')
    this.responseElement = this.shadowRoot.querySelector('pre.response code')
    this.inputPreviewElement = this.shadowRoot.querySelector('pre.preview code')

    this.textElements = {
      response: {
        source: this.responseElement,
        target: this.responseElement,
        lang: null,
      },
      input: {
        source: this.inputElement,
        target: this.inputPreviewElement,
        lang: null,
      },
    }
  }

  async getSetting(key) {
    return this.idb.get('settings', key)
  }

  async updateSetting(key, data) {
    return this.idb.set('settings', key, data)
  }

  async selectModel(id) {
    await this.loadModel(id)
    await this.setContexts()
    await this.selectPersonality()
  }

  async loadModel(id) {
    await this.updateSetting('selectedModel', id)

    const data = await OpenAI.load('model', { id })

    this.model = {
      ...this.models.find(model => model.id === data.id),
      ...data,
    }

    this.render()
  }

  async setContexts() {
    if(!this.model) return

    const settings = await this.getModelSettings()

    this.model.contexts = this.contexts.reduce((acc, cur) => {
      acc[cur] = settings.contexts?.[cur] || false
      return acc
    }, {})
  }

  async toggleContext(context, checked) {
    this.model.contexts[context] = checked
    await this.updateModelSettings({ contexts: this.model.contexts })
  }

  async selectPersonality(id) {
    const settings = await this.getModelSettings()
    const { messages = {}, personalityId } = settings
    id ??= personalityId
    this.messages = settings.messages?.[id] || []
    this.render()

    await this.updatePersonality(id)

    this.instructions.value = this.model.personalities[this.model.personalityId]
      ?.instructions
  }

  async updatePersonality(id, instructions) {
    await this.updateModelSettings({
      personalityId: id,
      ...instructions && { personalities: { [id]: { instructions } } }
    })
  }

  async getModelSettings() {
    const settings = await this.idb.get('settings', this.model.id)
    return settings || {}
  }

  async updateModelSettings(data = {}) {
    const settings = await this.getModelSettings()
    const newCustomModel = merge(settings, data)

    this.model = merge(
      {},
      {
        personalityId: 'default',
        personalities: this.personalities,
      },
      this.model,
      newCustomModel
    )
    this.render()

    return this.idb.set('settings', this.model.id, newCustomModel)
  }

  onInput(e) {
    this.render()

    if(this.isCode) {
      if(!e.target.value) {
        this.textElements.input.target.innerHTML = ''
        return
      }

      this.guesslang('input')
    }
  }

  async onInstructions(e) {
    const instructions = (e.target.value || '').trim()
    this.render()
    await this.updatePersonality(this.model.personalityId, instructions)
  }

  async submit() {
    if(!this.canSubmit) return

    this.isResponding = true
    this.responseElement.textContent = ''
    this.responseElement.classList = ''

    const payload = {
      id: this.model.id,
    }

    const newMessages = [{
      role: 'user',
      content: this.input,
    }]

    const instructions = this.instructions?.value

    payload.input = newMessages

    if(this.model.personalityId && instructions) {
      payload.input.unshift({
        role: 'system',
        content: instructions,
      })
    }

    this.messages = Array.from(new Set(this.messages.concat(newMessages)))

    this.updateModelSettings({ messages: { [this.model.personalityId]: this.messages }})

    try {
      Object.assign(this.textElements.response, { lang: null })
      SOCKETS.openai.emit('input', payload)
    } catch (e) {
      console.error(e)
      this.render(this.isResponding = false)
    }

    this.render()
  }

  receivingResponseLabel() {
    const base = 'Receiving response'
    let dots = 0

    setInterval(() => {
      if(dots === 3) dots = 0
      const label = `${base}${[...Array(dots).keys()].map(i => '.')}`
      dots += 1
      return label
    }, 1000)
  }

  langFor(namespace) {
    return this.textElements?.[namespace]?.lang
  }

  async _guesslang(namespace) {
    if(!this.isCode) return

    const { source } = this.textElements[namespace]
    const code = source.value || source.textContent

    if(!code) return

    if(!this.isGuesslanging) {
      this.isGuesslanging = true

      SOCKETS.guesslang.emit('guess', {
        namespace,
        code,
      })
    }
  }

  highlight(namespace) {
    if(!this.isCode) return

    if(Date.now() - this.lastHighlight > 1000) {
      this.lastHighlight = Date.now()
      const { source, lang, target } = this.textElements[namespace]
      const prismLang = Prism.languages[lang]
      const code = source.value || source.textContent

      if(!code || !lang || !prismLang) return

      const highlighted = Prism.highlight(code, prismLang, lang)
      target.innerHTML = highlighted
      target.className = `language-${lang}`
      this.render()
    }
  }

  async clearMessageHistory() {
    this.messages = []
    const settings = await this.getModelSettings()
    settings.messages[this.model.personalityId] = []
    this.idb.set('settings', this.model.id, settings)
  }

  clearInput() {
    if(!this.inputElement) return
    this.inputElement.value = ''
    Object.assign(this.textElements.input, { lang: null })
  }

  get input() {
    return (this.inputElement?.value || '').trim()
  }

  get canSubmit() {
    return this.input?.length && !this.isResponding
  }

  get isChat() {
    return !!this.model?.contexts?.chat
  }

  get isCode() {
    return !!this.model?.contexts?.code
  }

  get sortedModels() {
    return this.models?.sort((a, b) => {
      return a.id.localeCompare(b.id)
    }) || []
  }

  get instructions() {
    return this.shadowRoot.querySelector('textarea.instructions')
  }

  get selectedPersonality() {
    return this.personalities?.[this.model?.personalityId]
  }
}