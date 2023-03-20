import _ from 'lodash'
var devConfig

try {
  var { default: devConfig } = await import('./dev.js')
} catch (e) {}

const {
  SSANDBOX_USE_REDIS,
  SSANDBOX_COMPRESS,
  SSANDBOX_PORT,
  SSANDBOX_WS_PORT,
  SSANDBOX_HOST,
  OPENAI_API_KEY,
  OPENAI_ORGANIZATION_ID,
} = process.env

const port = SSANDBOX_PORT || 3011
const wsPort = SSANDBOX_WS_PORT || 3012
const host = SSANDBOX_HOST || 'http://localhost'
const root = `${host}:${port}`
const wsRoot = `${host}:${wsPort}`

const config = {
  server: {
    port,
    root,
    useRedis: SSANDBOX_USE_REDIS ?? true,
    compress: SSANDBOX_COMPRESS ?? true,
  },
  ws: {
    port: wsPort,
    root: wsRoot,
    namespace: 'ssandbox',
  },
  secrets: {
    openai: {
      apiKey: OPENAI_API_KEY,
      organization: OPENAI_ORGANIZATION_ID,
    },
  },
}

export default _.merge({}, config, devConfig || {})