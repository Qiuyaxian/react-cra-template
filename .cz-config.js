// .cz-config.js
const limitTypeList = require('./versionrc').types
module.exports = {
  types: limitTypeList,
  scopes: [{ name: 'src' }, { name: 'config' }, { name: 'docs' }],
  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',
  // it needs to match the value for field type. Eg.: 'fix'
  // scopeOverrides: {
  //   feat: [
  //     { name: 'element' }
  //   ],
  //   fix: [
  //     { name: 'element' },
  //     { name: 'style' },
  //   ]
  // },
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型(必填):',
    scope: '请选择一个scope (可选):',
    // customScope: '请输入文件修改范围(可选):',
    // used if allowCustomScopes is true
    subject: '请简要描述提交(必填):',
    // body: '请输入详细描述，使用"|"换行(可选):\n',
    // breaking: '列出任务非兼容性说明 (可选):\n',
    // footer: '请输入要关闭的issue，例如：#12, #34(可选):\n',
    confirmCommit: '确定提交此说明吗？'
  },
  // allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  // 限制 subject 长度
  subjectLimit: 100
  // 跳过问题 skip any questions you want
  // skipQuestions: ['body', 'footer'],
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
