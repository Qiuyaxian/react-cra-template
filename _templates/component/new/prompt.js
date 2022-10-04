module.exports = [
  {
    type: 'input',
    name: 'componentName',
    message: '请输入组件/文件夹名称: ',
    validate(value) {
      if (!value.length) {
        return '组件/文件夹不能为空！'
      }
      return true
    }
  },
  {
    type: 'select',
    name: 'type',
    message: '选择组件类型',
    choices: ['Class', 'Function']
  }
]
