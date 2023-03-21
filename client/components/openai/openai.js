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
    this.models = []
    this.model = {}
  }

  async connected() {
    const { filtered, personalities, contexts } = await OpenAI.load('models')

    this.models = filtered
    this.personalities = personalities
    this.contexts = contexts

    this.idb = await new IDB('openai', 3)
    await this.idb.getOrCreateStore('settings')

    this.guesslang = debounce((namespace, opts = {}) => {
      this._guesslang(namespace, opts)
    }, 1000)

    this.inputElement = this.shadowRoot.querySelector('textarea.input')
    this.responseElement = this.shadowRoot.querySelector('pre.response code')
    this.inputPreviewElement = this.shadowRoot.querySelector('pre.preview code')

    const _resize = debounce(height => {
      this.shadowRoot.querySelector('pre.preview').style.height = `${height}px`
    }, 100)

    new ResizeObserver((entries) => {
      _resize(entries[0].borderBoxSize[0].blockSize)
    }).observe(this.inputElement)

    this.namespaces = {
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

    const selectedModelId = await this.getSetting('selectedModel')
    await this.selectModel(selectedModelId || this.models.find(model => model.default).id)
    this.lastHighlight = Date.now() - 2000
    this.isResponding = false
    this.isGuesslanging = false

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
        this.namespaces[namespace].lang = result
        this.highlight(namespace)
      }
    })

    this.render()
  }

  disconnected() {
    for(const socket of SOCKETS) {
      SOCKETS[socket].emit('close')
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
        this.namespaces.input.target.innerHTML = ''
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
      Object.assign(this.namespaces.response, { lang: null })
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
    return this.namespaces?.[namespace]?.lang
  }

  async _guesslang(namespace) {
    if(!this.isCode) return

    const { source } = this.namespaces[namespace]
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
      const { source, lang, target } = this.namespaces[namespace]
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
    Object.assign(this.namespaces.input, { lang: null })
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
}