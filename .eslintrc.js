module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
    // "plugin:@typescript-eslint/recommended"
  ],
  overrides: [],
  // "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'prettier',
    'jsx-a11y'
    // "@typescript-eslint"
  ],
  rules: {
    // 'jsx-a11y/rule-name': 2,
    // 'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
    'no-dupe-keys': 2,
    'jsx-quotes': [2, 'prefer-double'],
    camelcase: 0 //强制驼峰法命名
  }
}
