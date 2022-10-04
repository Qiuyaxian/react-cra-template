/* eslint-disable */
const path = require('path')
const fs = require('fs')
const resolve = (dir) => path.join(__dirname, dir)
const mockPath = resolve('./src/mock')
// 模块注册映射
const mockApiMap = {}

function _initMockHandle(app) {
  // 自动执行每个模块的 init 方法
  try {
    const files = fs.readdirSync(mockPath)
    if (files && files.length !== 0) {
      for (var i = 0; i < files.length; i++) {
        const fileName = files[i]
        if (!mockApiMap[fileName]) {
          if (!/(\w+)\.js$/i.test(fileName)) {
            continue
          } else {
            const filePath = `${mockPath}/${files[i]}`
            if (fs.statSync(filePath).isFile()) {
              // 动态加载
              const mockModule = require(filePath)
              if (mockModule && mockModule.init) {
                mockModule.init(app)
              }
            }
          }
        }
        mockApiMap[fileName] = fileName
      }
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
// 返回一个函数
module.exports = function (app) {
  // 监听 http 请求
  _initMockHandle(app)
  // 监听文件变化
  // app.all(watch, function (req, res) {
  //   _initMockHandle(app)
  // })
}
/* eslint-enable */
