import isPlainObject from 'lodash/isPlainObject'
const confEnv = process.env.REACT_APP_ENV
function _loadApiEnvConfig(env) {
  const apiEnvConfigs = require.context('./config', true, /\.js$/)
  const envRegExp = new RegExp('/' + env + '.js', 'i')
  const apiEnvConfigKeys = apiEnvConfigs.keys()
  const apiConfig = apiEnvConfigKeys.find((fileName) => {
    return envRegExp.test(fileName)
  })
  if (!apiConfig) return null
  return apiEnvConfigs(apiConfig).default || apiEnvConfigs(apiConfig)
}

const globalApiConfig = _loadApiEnvConfig(confEnv)
if (!globalApiConfig) {
  throw Error(`${confEnv} api 配置项不存在，请在 src/api/config/ 内配置。`)
}

/**
 *
 * input:
 * {
 *   platform1: 'http://platform1.server',
 *   platform2: {
 *     url: 'http://platform2.server',
 *     apiKey: 'platform2-apikey
 *   }
 * }
 *
 * return:
 * {
 *   platform1: {
 *     baseURL: 'http://platform1.server'
 *   },
 *   platform2: {
 *     baseURL: 'http://platform2.server',
 *     apiKey: 'platform2-apikey
 *   }
 * }
 */
function _normalizeApiConfig(originConfig) {
  const finalConfig = {}
  const invalidConfig = []
  Object.entries(originConfig).forEach(([platform, config]) => {
    let normalizedConfig
    if (typeof config === 'string') {
      normalizedConfig = { baseURL: config }
    } else if (isPlainObject(config)) {
      const { url, apiKey } = config
      if (url) {
        normalizedConfig = { baseURL: config.url }
        if (apiKey) {
          normalizedConfig['apiKey'] = apiKey
        }
      }
    }
    if (normalizedConfig) {
      finalConfig[platform] = normalizedConfig
    } else {
      invalidConfig.push(platform)
    }
  })
  if (invalidConfig.length > 0) {
    throw Error(`Invalid api config (${confEnv}): ${invalidConfig.join(', ')}`)
  }

  return finalConfig
}

const normalizedApiConfig = _normalizeApiConfig(globalApiConfig)

export default normalizedApiConfig
