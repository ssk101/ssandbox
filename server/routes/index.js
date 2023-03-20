import config from '../config/index.js'
import openaiRoutes from './openai/index.js'

export const routes = {
  '/config': {
    method: 'get',
    cacheDuration: false,
    serialization: { transformKeys: false },
    handler: async function(req, res, next) {
      const {
        port,
        root,
        ws,
      } = config

      return {
        port,
        root,
        ws,
      }
    },
  },
  ...openaiRoutes,
}