import { openai, MODELS } from '../services/openai.js'
import { createNamespace } from './server.js'

const RESPONSES = new Map()

function endStream(socket, ...args) {
  const response = RESPONSES.get(socket.id)

  if(response) {
    response.data.destroy()
    RESPONSES.delete(socket.id)
  }

  return socket.emit(...args)
}

await createNamespace('openai', {
  eventCallback: (socket, message, payload) => {
    if(message === 'input') {
      input(socket, payload)
    }

    if(message === 'abort') {
      return endStream(socket, 'aborting')
    }
  }
})

async function input(socket, payload) {
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

  const model = MODELS.find(model => model.id === id)

  if(!model) {
    return
  }

  const {
    max_tokens,
    types,
  } = model

  function is(type) {
    return types.includes(type)
  }

  const params = {
    model: id,
    max_tokens,
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
    RESPONSES.set(socket.id, response)

    if(!params.stream) {
      socket.emit('response', response.data.choices[0].text)
      return endStream(socket, 'done')
    }

    response.data.on('data', data => {
      const lines = data.toString().split('\n')
        .filter(line => line.trim() !== '')

      for(const line of lines) {
        const message = line.replace(/^data: /, '')

        if(message === '[DONE]') {
          return endStream(socket, 'done')
        }

        try {
          const parsed = JSON.parse(message).choices[0]
          const content = parsed.delta?.content || parsed.text

          if(typeof content !== 'undefined') {
            socket.emit('response', content)
          }
        } catch (error) {
          console.error({ message, error })
          return endStream(socket, 'error', { message, error })
        }
      }
    })

    response.data.on('error', (e) => {
      throw e
    })
  } catch (e) {
    console.log(e)
    const { status, statusText } = e.response
    console.error({ status, statusText, input, instruction, id })
    return endStream(socket, 'error', { status, statusText })
  }
}