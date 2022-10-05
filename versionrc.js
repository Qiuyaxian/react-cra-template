const limitTypeMap = {
  upd: '更新某功能',
  feat: '创建新特性',
  fix: '修复bug',
  docs: '更新文档',
  style: '不影响代码含义的更改(空白、格式、缺少分号等)',
  refactor: '代码重构不影响功能(既不修复bug也不添加特性)',
  perf: '改进性能的代码更改',
  test: '添加缺失的测试或纠正现有的测试',
  build: '影响构建系统或外部依赖项的更改(示例范围:gulp、broccoli、npm)',
  ci: '对CI配置文件和脚本的更改(示例范围:Travis, Circle, BrowserStack, SauceLabs)',
  chore: '其他不修改src或测试文件的更改',
  revert: '回滚上一次提交'
}
const limitTypeList = []
Object.keys(limitTypeMap).forEach((key) => {
  limitTypeList.push({
    value: key,
    name: `${key}:${limitTypeMap[key]}`
  })
})
module.exports = {
  types: limitTypeList
}
