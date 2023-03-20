import { openai, MODELS } from '../services/openai.js'
import { createNamespace } from './server.js'

createNamespace('openai', (socket, message, payload) => {
  if(message === 'openai:input') {
    input(socket, payload)
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

    if(!params.stream) {
      socket.emit('openai:response', response.data.choices[0].text)
      return socket.emit('openai:done')
    }

    response.data.on('data', data => {
      const lines = data.toString().split('\n')
        .filter(line => line.trim() !== '')

      for(const line of lines) {
        const message = line.replace(/^data: /, '')

        if(message === '[DONE]') {
          return socket.emit('openai:done')
        }

        try {
          const parsed = JSON.parse(message).choices[0]
          const content = parsed.delta?.content || parsed.text

          if(typeof content !== 'undefined') {
            socket.emit('openai:response', content)
          }
        } catch (error) {
          console.error({ message, error })
          socket.emit('openai:error', { message, error })
        }
      }
    })

    response.data.on('error', (e) => {
      throw e
    })
  } catch (e) {
    const { status, statusText } = e.response
    console.error({ status, statusText, input, instruction, id })
    return socket.emit('openai:error', { status, statusText })
  }
}