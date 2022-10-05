import NProgress from 'nprogress'
import appConfig from '@/app.config'

// 增加 color , height 2 个配置项可用于配置进度条颜色和高度
// 官方配置文档： https://github.com/rstacruz/nprogress#configuration
const loadingDefaultConfig = {
  color: '#29d',
  height: '2px',
  showSpinner: false
}
const { loading } = appConfig
const loadingConfig = {
  ...loadingDefaultConfig,
  ...loading
}
NProgress.configure(loadingConfig)

/**
 * 为实现可配置进度条颜色和高度，不直接使用官方样式表。
 * 官方样式文件： https://github.com/rstacruz/nprogress/blob/master/nprogress.css
 */
const styles = `
  #nprogress {
  pointer-events: none;
  }
  #nprogress .bar {
    background: ${loadingConfig.color};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: ${loadingConfig.height};
  }
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${loadingConfig.color}, 0 0 5px ${loadingConfig.color};
    opacity: 1.0;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: ${loadingConfig.color};
    border-left-color: ${loadingConfig.color};
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const node = document.createElement(`style`)
node.id = `nprogress-styles`
node.innerHTML = styles
document.head.appendChild(node)

export default NProgress
