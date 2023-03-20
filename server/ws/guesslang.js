import { exec } from 'child_process'
import { createNamespace } from './server.js'

await createNamespace('guesslang', (socket, message, payload) => {
  if(message === 'guesslang:guess') {
    guesslang(socket, payload)
  }
})

async function guesslang(socket, payload) {
  const {
    namespace,
    code,
  } = payload

  const formatted = code.trim()
  if(!formatted) return

  try {
    exec([
      `echo \"\n`,
      formatted,
      ` \" | guesslang`,
    ].join(' '), {}, (error, stdout, stderr) => {
      if(error) {
        console.error(error)
        return socket.emit('guesslang:error', { error, namespace })
      }

      const result = stdout.match(/(?<=Programming language: )(.*)/)[0]
        .trim()
        .toLowerCase()

      socket.emit('guesslang:result', { result, namespace })
    })
  } catch (error) {
    console.error(error)
    socket.emit('guesslang:error', { error, namespace })
  }
}