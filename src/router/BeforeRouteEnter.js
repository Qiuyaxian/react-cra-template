import React from 'react'
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom'

// 用这个组件包裹真实组件，实现类似vue-router组件路由独享钩子beforeEnter
function withRouter(Component) {
  return function ComponentWithRouterProp(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    // const { route } = useRouterItem()
    return (
      <Component
        {...props}
        router={{
          route: null,
          location,
          navigate,
          params
        }}
      />
    )
  }
}

/* 路由懒加载HOC */
export default function BeforeRouteEnter(loadRouter) {
  const Content = class Content extends React.Component {
    constructor(props) {
      super(props)
    }
    state = { Component: null, to: null, option: null }
    componentDidMount() {
      if (this.state.Component) return
      const { route } = this.props.router
      const routeConfig = route ? route.props.match.route : null
      const next = (nextRoute, option = { replace: false }) => {
        if (nextRoute) {
          this.setState({ Component: null, to: nextRoute, option: option })
        } else {
          this.setState({ Component: loadRouter, to: null, option: null })
        }
      }
      if (routeConfig && routeConfig.beforeEnter) {
        routeConfig.beforeEnter(next)
      } else {
        next()
      }
    }
    render() {
      const { Component, to, option } = this.state
      if (to) {
        return <Navigate to={to} {...option} />
      }
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
  return withRouter(Content)
}
