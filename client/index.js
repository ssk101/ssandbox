import { Config } from './models/config.js'
import { bootstrap } from '@steelskysoftware/facade-client'

window.config = await Config.load()

export const routes = [
  {
    name: 'main',
    path: '/',
    async component(ctx) {
      const { default: c } = await import(`./components/list/list.js`)
      return c
    }
  },
  {
    name: 'openai',
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
