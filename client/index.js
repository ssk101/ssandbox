import { Config } from './models/config.js'
import { bootstrap } from '@steelskysoftware/facade-client'

window.config = await Config.load()

export const routes = [
  {
    name: 'index',
    description: 'Index',
    path: '/',
    async component(ctx) {
      const { default: c } = await import(`./components/index/index.js`)
      return c
    }
  },
  {
    name: 'openai',
    description: 'Open AI API playground',
    path: '/openai',
    async component(ctx) {
      const { default: c } = await import(`./components/openai/openai.js`)
      return c
    }
  },
]

bootstrap({
  routes,
  componentPrefix: 'ss',
})
