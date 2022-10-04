module.exports = {
  '/api': {
    target: 'http://localhost:3000/',
    pathRewrite: (path) => path.replace('/api', '/mock'),
    changeOrigin: true,
    secure: false
  }
}
