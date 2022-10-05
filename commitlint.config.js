const limitTypeList = require('./versionrc').types
const limitTypeKeyList = limitTypeList.map((item) => item.value)
module.exports = {
  // extends: ['@commitlint/config-conventional'],
  extends: ['cz'],
  rules: {
    'type-enum': [
      2,
      'always',
      limitTypeKeyList
      // ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert']
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}
