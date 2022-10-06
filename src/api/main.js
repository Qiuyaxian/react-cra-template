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
  transformResponse: (response) => {
    return response.status === 200 ? response.data : null
  }
})

export function getCurrentUser() {
  return silentRequestService({
    url: '/user/userinfo',
    method: 'get'
  })
}
