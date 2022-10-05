/*
lazy和Suspense是react自带的功能。
lazy能够使得加载页面的时候快速加载，防止加载时所有的组件的一起加载。
Suspense是在路由加载时显示的界面：比如：这个组件中加载的界面就是文字‘加载中。。。。。’
*/

/* eslint-disable */
import React, { lazy, Suspense } from 'react'
function Layout(path) {
  const ViewComponent = lazy(() => import(`@/views/${path}`))
  return (
    <Suspense>
      <ViewComponent />
    </Suspense>
  )
}
/* eslint-enable */
const routes = [
  {
    path: '/',
    element: Layout('index/Index'),
    name: 'index',
    beforeEnter: (next) => {
      next()
    },
    auth: true
  },
  {
    path: '/index',
    element: Layout('index/Index'),
    name: 'index',
    beforeEnter: (next) => {
      next()
    },
    auth: true
  },
  {
    path: '/404',
    element: Layout('layout/ErrorPage'),
    name: '404',
    auth: true
  }
  // {
  //   path: '*',
  //   element: Layout('layout/ErrorPage'),
  //   name: '404',
  //   auth: false
  // }
]

export const asyncRoutes = [
  {
    path: '/user',
    element: Layout('user/Index'),
    name: 'user',
    beforeEnter: (next) => {
      next()
    },
    children: [
      {
        path: 'info',
        element: Layout('user/Info'),
        name: 'info',
        beforeEnter: (next) => {
          next()
        },
        auth: true
      }
    ],
    auth: true
  }
]

export default routes
