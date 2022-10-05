import React from 'react'
// 验证上下文空间
const RouterContext = React.createContext(null)

// 利用useContext导出验证上下文，供其它组件使用
export function useRouterItem() {
  return React.useContext(RouterContext)
}

// 验证提供者
export default function RouterProvider({ children, route }) {
  const providerContext = {
    route: route
  }
  return (
    <RouterContext.Provider value={providerContext}>
      {children}
    </RouterContext.Provider>
  )
}
