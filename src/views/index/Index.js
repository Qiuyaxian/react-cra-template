import React from 'react'
import { Link } from 'react-router-dom'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>我是首页</p>
        <Link to="/user">前往用户页</Link>
      </div>
    )
  }
}
