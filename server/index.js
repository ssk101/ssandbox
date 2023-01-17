import path from 'path'
import {
  createServer,
} from '@steelskysoftware/facade-server'
import { routes } from './routes.js'

const port = 3000

const servinator = await createServer({
  port,
  client: true,
  routes,
  dataset: {},
  src: 'application.esm.js',
})

servinator.on('listening', () => {
  console.log(`Listening on ${port}`)
})
