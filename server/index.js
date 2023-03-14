import path from 'path'
import {
  createServer,
} from '@steelskysoftware/facade-server'
import { routes } from './routes.js'
import config from '../config.js'

const {
  port,
  wsRoot,
  wsNamespace,
  wsPort,
  useRedis = true,
  compress = true,
} = config

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
