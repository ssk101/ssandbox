import path from 'path'
import {
  createServer,
} from '@steelskysoftware/facade-server'
import { routes } from './routes/index.js'
import config from './config/index.js'

await import('./ws/server.js')

const {
  port,
  useRedis,
  compress,
} = config.server

const server = await createServer({
  client: true,
  port,
  routes,
  useRedis,
  compress,
})

server.on('listening', () => {
  console.log(`Listening on ${port}`)
})
