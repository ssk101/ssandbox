import {
  SocketServer,
  SocketClient,
} from '@steelskysoftware/facade-sockets'
import config from '../config/index.js'

const { ws } = config
const socketServer = new SocketServer({ port: ws.port })
await socketServer.createServer()

export async function createNamespace(namespace, callbacks = {}) {
  return socketServer.namespace(`/${ws.namespace}/${namespace}`, Object.assign({
    connectCallback: (socket) => {
      console.log(`${namespace}:${socket.id}`, 'connected')
    },
    closeCallback: (socket) => {
      console.log(`${namespace}:${socket.id}`, 'closed')
    },
    disconnectCallback: (socket) => {
      console.log(`${namespace}:${socket.id}`, 'disconnected')
    },
  }, callbacks))
}