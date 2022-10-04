const path = require('path')
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addWebpackPlugin,
  overrideDevServer,
  // addPostcssPlugins,
  addWebpackResolve,
  addWebpackModuleRule
} = require('customize-cra')
// 代码压缩(webpack@5中已自带压缩)
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 大文件定位
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// 是否开启gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
// 本地转发
const proxyConfig = require('./proxy.config')
//
const mockConfig = require('./mock.config')
// path
const resolve = (dir) => path.join(__dirname, dir)
// 运行环境变量
const confEnv = process.env.REACT_APP_ENV
// 构建环境变量
const buildEnv = process.env.REACT_APP_CLIENT
// 构建gzip
const buildGzip = process.env.REACT_APP_GZIP
// mock
const mockEnv = process.env.REACT_APP_MOCK
// 是否是正式环境
const isProd = confEnv === 'prod'
// 是否是构建环境
const isbuild = buildEnv === 'server'
// 是否开启压缩
const isGzip = buildGzip === 'true'
// 打包模拟数据
const isMock = mockEnv === 'true'
// 用于判断部署于正式环境不生成 sourceMap
// const useSourceMap = isbuild || isProd
// 是否开启代码片段分析
const useAnalyzer = process.env.use_analyzer
// https://segmentfault.com/a/1190000039850941
const webpackEnv = process.env.NODE_ENV

const isEnvDevelopment = webpackEnv === 'development'

const isEnvProduction = webpackEnv === 'production'

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const paths = require('react-scripts/config/paths')
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: paths.publicUrlOrPath.startsWith('.')
        ? { publicPath: '../../' }
        : {}
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009'
                },
                stage: 3
              }
            ],
            'postcss-normalize'
          ]
        },
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
      }
    }
  ].filter(Boolean)
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          root: paths.appSrc,
          removeCR: true
        }
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true
        }
      }
    )
  }
  return loaders
}

module.exports = {
  // 可以修改多入口[http://www.javashuo.com/article/p-okyazfcu-dr.html]
  // paths: function (paths) {
  //   console.log(paths, 'paths')
  //   throw new Error('paths')
  //   return paths
  // },
  webpack: override(
    // 添加文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    }),
    //路径别名配置
    addWebpackAlias({
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@utils': resolve('src/utils'),
      '@api': resolve('src/api'),
      '@views': resolve('src/views')
    }),
    // 处理文件处理
    addWebpackModuleRule({
      test: /\.(png|jpg|gif|jpeg|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 20 * 1024,
            esModule: false,
            outputPath: `static/imgs/`
          }
        }
      ]
    }),
    // 添加webpack插件
    // 分析打包后的bundle.js文件(使用前要安装webpack-bundle-analyzer)
    useAnalyzer && addWebpackPlugin(new BundleAnalyzerPlugin()),
    // 需要nginx配合
    isGzip &&
      addWebpackPlugin(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          // 只有大小大于该值的资源会被处理 10240字节
          threshold: 10240,
          // 只有压缩率小于这个值的资源才会被处理
          minRatio: 1,
          // 删除原文件
          deleteOriginalAssets: false
        })
      ),
    // 预处理 postcss
    // addPostcssPlugins([
    //   require("postcss-px2rem")({ remUnit:37.5})
    // ]),
    // 全局引入
    // fixBabelImports('import', {
    //   libraryName: 'element-react',
    //   libraryDirectory: 'es',
    //   style: true,
    // }),
    //暴露webpack的配置 config ,env
    (config, env) => {
      // let entry = config.entry
      // Object.keys(entry).forEach(function (name) {
      //   entry[name] = ['./src/mock'].concat(entry[name]) //---在运行npm run mock时将mock这个文件在entry中打包编译进来
      // })
      // console.log(config.module.rules)
      // throw new Error('rules')
      // if(process.env.NODE_ENV !== "development") {
      //    config.plugins = [...config.plugins,...myPlugin]
      // }
      // 修改别名配置
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   '@': resolve('src')
      // }

      // 新增less处理
      const moduleLoaders = config.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
      )
      if (Array.isArray(moduleLoaders.oneOf)) {
        const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
        const lessRegex = /\.less$/
        const lessModuleRegex = /\.module\.less$/
        const publicPath = config.output.publicPath
        const shouldUseRelativeAssetPaths = publicPath === './'
        // 必须要添加全局变量吗（使用style-resources-loader【https://www.w3cschool.cn/article/48409824.html】）
        const len = moduleLoaders.oneOf.length
        moduleLoaders.oneOf.splice(
          len - 1,
          0,
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                modules: {
                  mode: 'icss'
                }
              },
              'less-loader'
            ),
            sideEffects: true
          },
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                modules: {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:5]',
                  getLocalIdent: getCSSModuleLocalIdent
                }
              },
              'less-loader'
            )
          }
        )
      }
      // 去掉打包生产map 文件
      config.devtool =
        config.mode === 'development' ? 'cheap-module-source-map' : false

      // 实现不同目录输出
      if (config.mode === 'production') {
        // 置顶时会导致构建失败
        const paths = require('react-scripts/config/paths')
        config.output.publicPath = `/`
        paths.appBuild = path.join(
          path.dirname(paths.appBuild),
          `dist/${confEnv}`
        )
        config.output.path = path.join(
          path.dirname(config.output.path),
          `dist/${confEnv}`
        )
      }
      // 代码拆分（拆分第三方库）
      if (isbuild) {
        config.optimization = {
          ...config.optimization,
          minimize: true,
          splitChunks: {
            cacheGroups: {
              reactVendors: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                name: 'react-vendors',
                chunks: 'all',
                enforce: true
              },
              reactRedux: {
                test: /[\\/]node_modules[\\/](react-redux|redux-thunk)[\\/]/,
                name: 'react-redux',
                chunks: 'all',
                enforce: true
              },
              elementReact: {
                test: /[\\/]node_modules[\\/](element-react)[\\/]/,
                name: 'element-react',
                chunks: 'all',
                enforce: true
              }
            }
          }
        }
      }
      return config
    }
  ),
  // 开发环境配置
  devServer: overrideDevServer((config) => {
    const devServerConfig = {
      ...config,
      // webpack@4
      // disableHostCheck: true,
      // webpack@5
      historyApiFallback: true,
      allowedHosts: 'all'
      // proxy: {}
    }
    if (isMock) {
      devServerConfig.proxy = proxyConfig
      devServerConfig.onBeforeSetupMiddleware = function (devServer) {
        mockConfig(devServer.app)
      }
    }
    return devServerConfig
  }),
  // 单元测试配置f
  jest: function (config) {
    return config
  }
}
