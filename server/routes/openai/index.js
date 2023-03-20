import { openai, MODELS } from '../../services/openai.js'
import '../../ws/openai.js'
import '../../ws/guesslang.js'

async function handler(cb) {
  let response = {}

  try {
    response = await cb()
  } catch (error) {
    console.error(error)
    return { error }
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

const routes = {
  '/openai/models': {
    method: 'get',
    serialization: { transformKeys: false },
    handlers: [
      async function(req, res, next) {
        const { data } = await handler(() => {
          return openai.listModels()
        })

        return {
          all: data,
          filtered: MODELS,
        }
      }
    ],
    cacheDuration: '1 day',
  },
  '/openai/model': {
    method: 'get',
    serialization: { transformKeys: false },
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

export default routes