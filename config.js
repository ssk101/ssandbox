var devConfig

try {
  var { default: devConfig } = await import('./config.dev.js')
} catch (e) {}

const port = 3011
const wsPort = 3012
const host = 'http://localhost'
const root = `${host}:${port}`
const wsRoot = `${host}:${wsPort}`

const config = {
  port,
  root,
  wsPort,
  wsRoot,
  wsNamespace: 'ssandbox',
}

export default Object.assign({}, config, devConfig || {})