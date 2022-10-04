const Mock = require('mockjs')
//get请求
module.exports = {
  init: function (app) {
    app.get('/mock/user/userinfo', function (rep, res) {
      // 设置要返回的数据
      const ret = Mock.mock({
        user: {
          name: '章三',
          age: 18,
          position: '前端开发工程师'
        }
      })
      res.json({
        status: 200,
        data: ret
      })
    })
    /*
    app.post('/mock/update/userinfo', function (rep, res) {
      
    })
    */
  }
}
