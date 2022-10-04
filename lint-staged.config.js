module.exports = {
  '*.js': ['eslint --cache --fix', 'prettier --write', 'git add'],
  '*.json': ['prettier --write', 'git add'],
  '*.less': ['stylelint --cache --fix', 'prettier --write', 'git add']
}
