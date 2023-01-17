import { bootstrap } from '@steelskysoftware/facade-client'

bootstrap({
  routes: [
    {
      name: 'list-test',
      path: '/',
      async component() {
        return import(`./components/list-test/list-test.js`)
      }
    },
  ],
  componentPrefix: 'ss',
})
