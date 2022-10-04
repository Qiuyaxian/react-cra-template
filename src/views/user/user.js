import React, { Link, Outlet } from 'react-router-dom'
import '@/style/user.less'

export default function User() {
  return (
    <div>
      <p className="user">我是用户页</p>
      <Link to="/index">前往首页2</Link>
      <Outlet />
    </div>
  )
}
