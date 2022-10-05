import request from '@/utils/request'
import apiConfig from '@/api.config'

// const silentRequestService = request({
//   ...apiConfig.main,
//   silent: true,
//   apiKey: 'request-apikey',
//   transformRequestConfig(config) {
//     return config
//   },
//   transformResponse(data) {
//     return data
//   }
// })

const silentRequestService = request({
  ...apiConfig.main,
  silent: true
})

export function getCurrentUser() {
  return silentRequestService({
    url: '/user/getCurrentUser',
    method: 'get'
  })
}
