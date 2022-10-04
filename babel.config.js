module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
        },
        corejs: 2,
        useBuiltIns: 'usage',
        // @babel/polyfill 配置：usage 按需加载 ECMAscript 规范库
        //生产环境：全部加载打包后700kb，按需加载打包后20kb,所以必须瘦身处理
      },
    ],
    '@babel/preset-react',
  ],
}
