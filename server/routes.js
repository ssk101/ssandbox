import { exec } from 'child_process'
import { openai } from './services/openai.js'
import {
  SocketServer,
  SocketClient,
} from '@steelskysoftware/facade-sockets'
import config from '../config.js'

const { port, wsNamespace, wsRoot, wsPort } = config
const socketServer = new SocketServer({ port: wsPort })
await socketServer.createServer()
const io = await socketServer.namespace(`/${wsNamespace}`, {
  connectCallback: (socket) => {
    console.info(wsNamespace, socket.id, 'connected')
  },
  closeCallback: (socket) => {
    console.info(wsNamespace, socket.id, 'closed')
  },
  disconnectCallback: (socket) => {
    console.info(wsNamespace, socket.id, 'disconnected')
  },
  eventCallback: async (socket, message, payload) => {
    if(message === 'prompt:input') {
      prompt(socket, payload)
    }

    if(message === 'guesslang:guess') {
      guesslang(socket, payload)
    }
  }
})

const ROOMS = new Set()

const MODELS = {
  'gpt-3.5-turbo': {
    max_tokens: 2048,
    types: ['chat'],
    endpoints: [
      '/chat/completions',
    ],
  },
  'gpt-3.5-turbo-0301': {
    max_tokens: 2048,
    types: ['chat'],
    endpoints: [
      '/chat/completions',
    ],
  },
  'text-davinci-003': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'text-davinci-002': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'text-curie-001': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'text-babbage-001': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'text-ada-001': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'davinci': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'curie': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'babbage': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'ada': {
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'text-davinci-edit-001': {
    max_tokens: 2048,
    types: ['text', 'edit'],
    endpoints: [
      '/edits',
    ],
  },
  'code-davinci-edit-001': {
    max_tokens: 2048,
    types: ['code', 'edit'],
    endpoints: [
      '/edits',
    ],
  },
  'code-davinci-002': {
    max_tokens: 2048,
    types: ['code', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'code-cushman-001': {
    max_tokens: 2048,
    types: ['code', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  'whisper-1': {
    max_tokens: 2048,
    types: ['audio'],
    endpoints: [
      '/audio/transcriptions',
      '/audio/translations',
    ],
  },
  'text-embedding-ada-002': {
    max_tokens: 2048,
    types: ['text', 'embedding'],
    endpoints: [
      '/embeddings',
    ],
  },
  'text-search-ada-doc-001': {
    max_tokens: 2048,
    types: ['text', 'search'],
    endpoints: [
      '/embeddings',
    ],
  },
  'text-moderation-stable': {
    max_tokens: 2048,
    types: ['text', 'moderation'],
    endpoints: [
      '/moderations',
    ],
  },
  'text-moderation-latest': {
    max_tokens: 2048,
    types: ['text', 'moderation'],
    endpoints: [
      '/moderations',
    ],
  },
}

async function guesslang(socket, payload) {
  const {
    namespace,
    code,
  } = payload

  const formatted = code.trim()
  if(!formatted) return

  try {
    exec([
      `echo \"\n`,
      formatted,
      ` \" | guesslang`,
    ].join(' '), {}, (error, stdout, stderr) => {
      if(error) {
        console.error(error)
        return socket.emit('guesslang:error', { error, namespace })
      }

      const result = stdout.match(/(?<=Programming language: )(.*)/)[0]
        .trim()
        .toLowerCase()

      socket.emit('guesslang:result', { result, namespace })
    })
  } catch (error) {
    console.error(error)
    socket.emit('guesslang:error', { error, namespace })
  }
}

async function prompt(socket, payload) {
  if(!Object.keys(payload).length) {
    return
  }

  const {
    id,
    temperature = 1,
    top_p,
    instruction,
    input,
  } = payload

  console.log('======= INPUT =======')
  console.log({ input, instruction, id })
  console.log('=====================')

  function is(type) {
    return MODELS[id].types.includes(type)
  }

  const params = {
    model: id,
    max_tokens: 2048,
    n: 1,
    temperature,
    stream: !is('edit'),
  }

  let method

  if(is('chat')) {
    params.messages = input
    method = 'createChatCompletion'
  } else {
    if(is('edit')) {
      params.instruction = instruction
      delete params.stream
      delete params.max_tokens
      method = 'createEdit'
    } else {
      method = 'createCompletion'
    }

    params.input = input
  }

  const opts = {
    ...(!is('edit') && { responseType: 'stream' }),
  }

  if(top_p) {
    params.top_p = top_p
    delete params.temperature
  }

  try {
    const response = await openai[method](params, opts)

    if(!params.stream) {
      socket.emit('prompt:response', response.data.choices[0].text)
      return socket.emit('prompt:done')
    }

    response.data.on('data', data => {
      const lines = data.toString().split('\n')
        .filter(line => line.trim() !== '')

      for(const line of lines) {
        const message = line.replace(/^data: /, '')

        if(message === '[DONE]') {
          return socket.emit('prompt:done')
        }

        try {
          const parsed = JSON.parse(message).choices[0]
          const content = parsed.delta?.content || parsed.text

          if(typeof content !== 'undefined') {
            socket.emit('prompt:response', content)
          }
        } catch (error) {
          console.error({ message, error })
          socket.emit('prompt:error', { message, error })
        }
      }
    })

    response.data.on('error', (e) => {
      throw e
    })
  } catch (e) {
    const { status, statusText } = e.response
    console.error({ status, statusText, input, instruction, id })
    return socket.emit('prompt:error', { status, statusText })
  }
}

async function handler(cb) {
  let response = {}

  try {
    response = await cb()
  } catch (e) {
    console.error(e)
    return { status: 500, error: e }
  }

  if(response.data?.error) {
    return {
      status: response.status,
      statusText: response.statusText,
      error: response.data.error,
    }
  }

  return response.data || {}
}

export const routes = {
  '/config': {
    method: 'get',
    cacheDuration: false,
    serialization: { transformKeys: false },
    handler: async function(req, res, next) {
      return Object.assign({}, config, { models: MODELS })
    },
  },
  '/openai/models': {
    method: 'get',
    handlers: [
      async function(req, res, next) {
        const { data } = await handler(() => {
          return openai.listModels()
        })

        return data.filter(model => {
          return Object.keys(MODELS).includes(model.id)
        })
      }
    ],
    cacheDuration: '1 day',
  },
  '/openai/model': {
    method: 'get',
    handlers: [
      async function(req, res, next) {
        const { id } = req.query
        const data = await handler(() => {
          return openai.retrieveModel(id)
        })

        return data
      }
    ],
    cacheDuration: '1 day',
  },
}