import {
  SocketServer,
  SocketClient,
} from '@steelskysoftware/facade-sockets'
import config from '../config/index.js'

const { ws } = config
const socketServer = new SocketServer({ port: ws.port })
await socketServer.createServer()

export async function createNamespace(namespace, cb) {
  const io = await socketServer.namespace(`/${ws.namespace}/${namespace}`, {
    connectCallback: (socket) => {
      console.log(`${namespace}:${socket.id}`, 'connected')
    },
    closeCallback: (socket) => {
      console.log(`${namespace}:${socket.id}`, 'closed')
    },
    disconnectCallback: (socket) => {
      console.log(`${namespace}:${socket.id}`, 'disconnected')
    },
    eventCallback: async (socket, message, payload) => {
      return cb(socket, message, payload)
    }
  })

  return io
}
