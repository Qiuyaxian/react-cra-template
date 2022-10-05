const isProd = process.env.REACT_APP_ENV === 'prod'
const isServer = process.env.REACT_APP_ENV === 'server'

module.exports = {
  // 应用主标题，会使用在 <title>
  title: '',

  // 应用描述，会使用在 <meta name="description" />
  description: '',

  // 接口调用超时时间
  requestTimeout: 20000,

  // 顶部进度条配置
  loading: {
    color: '#2d9',
    showSpinner: false
  },

  // 路由切换时是否显示顶部进度条
  routerLoading: true,

  // 发送 http 请求时是否显示顶部进度条
  requestLoading: true,

  // 默认请求方法下，接口报错时是否显示错误码信息
  errorMessageHasCode: false,

  // 默认请求方法下，请求失败时是否在 console 面板打印错误信息
  logOnRequestError: !isServer || !isProd
}
