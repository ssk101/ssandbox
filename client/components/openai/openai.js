import {
  Attribute,
  Define,
  Template,
  Styles,
} from '@steelskysoftware/facade-client'
import { wait } from '@steelskysoftware/facade-toolbox'
import { IDB } from '@steelskysoftware/facade-client/src/lib/idb.js'
import debounce from 'lodash/debounce'
import { OpenAI } from '../../models/openai.js'
import IO from 'socket.io-client'
import prismCSS from '../../lib/prism/prism.styl'
import '../../lib/prism/prism.js'
import template from './openai.pug'
import componentCSS from './openai.styl'
import '@steelskysoftware/facade-client/src/components/button/button.js'
import '@steelskysoftware/facade-client/src/components/select/select.js'

const { ws } = window.config

const SOCKET = IO(`${ws.root}/${ws.namespace}/openai`, {
  transports: ['websocket', 'polling', 'flashsocket']
})

@Define('ss')
@Template(template)
@Styles([componentCSS, prismCSS])
export default class Openai extends HTMLElement {
  created() {
    this.models = []
    this.model = {}
  }

  async connected() {
    const models = await OpenAI.load('models')

    this.models = models

    this.idb = await new IDB('openai')
    const store = await this.idb.getOrCreateStore('modelSettings')
    const selectedModel = await this.getModelSetting('model')
    const defaultModel = this.models.filtered.find(model => model.default)

    this.model = this.models
      .filtered
      .find(model => model.id === selectedModel) || defaultModel

    await this.setModelSetting('model', this.model.id)
    await this.loadModel(this.model.id)

    this.guesslang = debounce((namespace) => {
      this._guesslang(namespace)
    }, 1000)

    this.inputElement = this.shadowRoot.querySelector('textarea.input')
    this.instructionElement = this.shadowRoot.querySelector('textarea.instruction')
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

    this.messages = await this.getModelSetting('messageHistory') || []
    this.lastHighlight = Date.now() - 2000
    this.isResponding = false
    this.isGuesslanging = false

    SOCKET.on('openai:response', (response) => {
      this.responseElement.textContent += response
      this.guesslang('response')
    })

    SOCKET.on('openai:done', (response) => {
      this.isResponding = false
      this.render()
    })

    SOCKET.on('guesslang:result', ({ error, result, namespace }) => {
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
    SOCKET.emit('close')
  }

  async getModelSetting(key) {
    return this.idb.get('modelSettings', key)
  }

  async setModelSetting(key, value) {
    return this.idb.set('modelSettings', key, value)
  }

  async _guesslang(namespace) {
    if(!this.isCode) return

    const { source } = this.namespaces[namespace]
    const code = source.value || source.textContent

    if(!code) return

    if(!this.isGuesslanging) {
      this.isGuesslanging = true

      SOCKET.emit('guesslang:guess', {
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

  clearMessageHistory() {
    return this.setModelSetting('messageHistory', [])
    this.messages = []
  }

  clearInput() {
    if(!this.inputElement) return
    this.inputElement.value = ''
    Object.assign(this.namespaces.input, { lang: null })
  }

  clearInstruction() {
    if(!this.instructionElement) return
    this.instructionElement.value = ''
  }

  async loadModel(id) {
    const data = await OpenAI.load('model', { id })

    this.model = {
      ...data,
      ...this.models.filtered.find(model => model.id === data.id),
    }

    await this.setModelSetting('model', id)

    if(this.model.personalities?.length) {
      const personalityName = (await this.getModelSetting('personality'))
      await this.selectPersonality(personalityName)
    }

    console.log(this.model)

    this.clearInstruction()
    this.render()
  }

  async selectModel(e) {
    await this.loadModel(e.value)
  }

  async selectPersonality(personalityName = 'default') {
    this.model.personality = personalityName
    await this.setModelSetting('personality', personalityName)
    this.render()
  }

  getPersonality(personalityName) {
    return this.model.personalities.find(personality => {
      return personality.name === personalityName
    })
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

  async submit() {
    if(!this.canSubmit) return

    this.isResponding = true
    this.responseElement.textContent = ''
    this.responseElement.classList = ''

    const payload = {
      id: this.model.id,
    }

    if(this.isChat) {
      this.messages.push({
        role: 'user',
        content: this.input,
      })

      const system = this.messages.find(message => message.role === 'system')

      if(this.model.personality) {
        const personality = this.getPersonality(this.model.personality)

        if(!system || system.content !== personality.instructions) {
          this.messages = this.messages.filter(message => {
            return message.role !== 'system'
          })

          this.messages.unshift({
            role: 'system',
            content: personality.instructions,
          })
        }

      }

      payload.input = this.messages
      localStorage.setItem('messages', JSON.stringify(this.messages))
    } else {
      payload.input = this.input

      if(this.isEdit) {
        payload.instruction = this.instruction
      }
    }

    try {
      Object.assign(this.namespaces.response, { lang: null })
      SOCKET.emit('openai:input', payload)
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

  get input() {
    return (this.inputElement?.value || '').trim()
  }

  get instruction() {
    return (this.instructionElement?.value || '').trim()
  }

  get canSubmit() {
    return this.input?.length && !this.isResponding
  }

  get modelTypes() {
    return this.model?.types || []
  }

  get isChat() {
    return this.modelTypes.includes('chat')
  }

  get isCode() {
    return this.modelTypes.includes('code')
  }

  get isEdit() {
    return this.modelTypes.includes('edit')
  }

  get sortedModels() {
    return this.models?.filtered?.sort((a, b) => {
      return a.id.localeCompare(b.id)
    }) || []
  }
}