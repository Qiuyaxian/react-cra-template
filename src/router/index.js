/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  RouterProvider,
  createHashRouter,
  HashRouter,
  useRoutes,
  useLocation,
  Navigate,
  useMatch
} from 'react-router-dom'
import { getCurrentUser } from '@/api/main'
import store from '@/redux/store'
import { updateUserInfo } from '@/redux/modules/user/actions'

import routes, { asyncRoutes } from './routes.js'

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

function RouterRenderElement(RouteEnter, beforeEach) {
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
      if (beforeEach) {
        beforeEach(next, route)
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
  const globalRoutesMap = new Map()
  let updateGlobalRoutes = null
  let globalBeforeEach = null
  let globalRoutes = [].concat(routeConfig.routes || [])
  let initGlobalRouteQueue = []
  let routeMode = routeConfig.mode || defaultRouteMode
  let globalRoutePath = null
  // 进入路由前
  // 渲染路由前
  const ReactRouterContent = React.memo(
    RouterRenderElement(BeforeRouteEnter, function (to, next) {
      return globalBeforeEach(to, next)
    }),
    (prevProps, nextProps) => {
      if (prevProps.routePath && nextProps.routePath) {
        return prevProps.routePath === nextProps.routePath
      }
      return false
      // 传入的参数就是变化前的props和变化后的props,用来给我们手动对比
      // return true就是不更新,使用缓存组件,return false就是更新
    }
  )

  function ReactRouterElement({ routes }) {
    const toLocation = useLocation()
    const { key } = toLocation
    const element = useRoutes(routes)
    const routePath = element ? element.props.match.route.path : key
    // 防止多次执行 ReactRouterContent
    if (globalRoutePath === routePath) {
      return element
    }
    globalRoutePath = routePath
    return (
      <ReactRouterContent
        key={routePath}
        route={element}
        to={toLocation}
        path={routePath}
      ></ReactRouterContent>
    )
  }

  function ReactRouterComponent() {
    // 初始化监听，负责路由更新，addRoutes
    const [initRoutes, updateRoutes] = useState(globalRoutes)
    // let routerIndex = 1
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
    }, [initRoutes])
    return (
      <ReactRouterElement routes={[].concat(initRoutes)}></ReactRouterElement>
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

router.beforeEach(async (next) => {
  try {
    const user = store.getState()?.user
    if (!user.userInfo) {
      const response = await getCurrentUser()
      if (response) {
        store.dispatch(updateUserInfo({ userInfo: response.user }))
      }
      router.addRoutes(asyncRoutes)
      next()
    } else {
      next()
    }
  } catch (error) {
    next('/404')
  }
})

// setTimeout(() => {
//   router.addRoutes(asyncRoutes)
// }, 3000)
export default router
