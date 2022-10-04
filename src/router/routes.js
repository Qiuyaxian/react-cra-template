// import Index from "@/views/index/Index";
// import User from "@/views/user/Index";
// import ErrorPage from "@/views/layout/ErrorPage";

import Layout from './Layout.js'
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
