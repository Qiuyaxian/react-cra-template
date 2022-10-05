import React, { useState, useEffect } from 'react'
import {
  HashRouter,
  useRoutes,
  useLocation,
  Navigate
  // createHashRouter
} from 'react-router-dom'
import routes, { asyncRoutes } from './routes.js'
/* eslint-disable-next-line */
class BeforeRouteEnter extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    enabledEnter: false,
    to: null,
    option: null
  }
  componentDidMount() {
    const { route } = this.props
    const routeConfig = route ? route.props.match.route : null
    const next = (nextRoute, option = { replace: false }) => {
      if (nextRoute) {
        this.setState({ enabledEnter: true, to: nextRoute, option: option })
      } else {
        this.setState({ enabledEnter: true, to: null, option: null })
      }
    }
    if (routeConfig && routeConfig.beforeEnter) {
      routeConfig.beforeEnter(next)
    } else {
      next()
    }
  }
  render() {
    const { route } = this.props
    const { enabledEnter, to, option } = this.state
    if (!enabledEnter) return null
    if (to) {
      return <Navigate to={to} {...option} />
    }
    return route
  }
}

function RouterRenderElement(RouteEnter, globalBeforeEach) {
  return class RouterRenderComponent extends React.PureComponent {
    constructor(props) {
      super(props)
    }
    state = {
      routeState: false,
      to: null,
      option: null
    }
    componentDidMount() {
      const { route } = this.props
      const next = (nextRoute, option = { replace: false }) => {
        if (nextRoute) {
          this.setState({
            routeState: true,
            to: nextRoute,
            option: option
          })
        } else {
          this.setState({
            routeState: true,
            to: null,
            option: null
          })
        }
      }
      if (route && globalBeforeEach) {
        globalBeforeEach(route, next)
      } else {
        next()
      }
    }
    render() {
      const { routeState, to, option } = this.state
      const { route, to: from } = this.props
      if (!routeState) return null
      if (to) {
        return <Navigate to={to} {...option} />
      }
      return <RouteEnter route={route} to={from}></RouteEnter>
    }
  }
}

function ReactRouter(routeConfig) {
  const defaultRouteMode = 'element'
  let updateGlobalRoutes = null
  let globalBeforeEach = null
  let globalRoutes = [].concat(routeConfig.routes || [])
  let initGlobalRouteQueue = []
  let routeMode = routeConfig.mode || defaultRouteMode
  // 进入路由前
  // 渲染路由前
  const ReactRouterContent = RouterRenderElement(
    BeforeRouteEnter,
    globalBeforeEach
  )

  function ReactRouterComponent() {
    // 初始化监听，负责路由更新，addRoutes
    const [initRoutes, updateRoutes] = useState(globalRoutes)
    let routerIndex = 1
    useEffect(() => {
      if (initGlobalRouteQueue.length !== 0) {
        let mergeRoutes = []
        initGlobalRouteQueue.forEach((fn) => {
          mergeRoutes = mergeRoutes.concat(fn())
        })
        initGlobalRouteQueue = []
        updateRoutes(initRoutes.concat(mergeRoutes))
      }
      if (!updateGlobalRoutes) {
        updateGlobalRoutes = (routes) => {
          updateRoutes(initRoutes.concat(routes))
        }
      }
      routerIndex++
    }, [initRoutes])
    const toLocation = useLocation()
    const { key } = toLocation
    const element = useRoutes(initRoutes)
    return (
      <ReactRouterContent
        key={element ? `${routerIndex}-${key}` : key}
        route={element}
        to={toLocation}
      ></ReactRouterContent>
    )
  }

  function RouterRender() {
    if (routeMode === defaultRouteMode) {
      // 负责路由进入拦截，beforeEach
      return (
        <HashRouter>
          <ReactRouterComponent></ReactRouterComponent>
        </HashRouter>
      )
    }
    return null
  }

  RouterRender.addRoutes = function (routes) {
    if (updateGlobalRoutes) {
      updateGlobalRoutes(routes)
    } else {
      initGlobalRouteQueue.push(function () {
        return routes
      })
    }
  }

  RouterRender.beforeEach = function (callback) {
    globalBeforeEach = callback
  }

  RouterRender.beforeResolve = function () {
    // globalBeforeEach = callback
  }

  RouterRender.afterEach = function () {
    // globalBeforeEach = callback
  }

  return RouterRender
}

const router = new ReactRouter({
  routes: routes
})

router.beforeEach((to, next) => {
  next()
})

setTimeout(() => {
  router.addRoutes(asyncRoutes)
}, 3000)
export default router
