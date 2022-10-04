import React from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from '@/element-ui'
import store from '@/redux/store'

import { updateUserInfo } from '@/redux/modules/user/actions'
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo // User模块 映射
  }
}

// const mapDispatchToProps = () => {
//   return {
//     updateUserInfo: () => {
//       updateUserInfo({ name: '网撒' })
//     }
//     // click1: () => dispatch({ type: "ADD_NUMBER1", num: 2 }), // 操作Num模块的ADD_NUMBER1类型，修改对应状态
//     // click2: () => dispatch({ type: "ADD_NUMBER2", num: 3 }), // 操作User模块的ADD_NUMBER2类型，修改对应状态
//   }
// }

function Index({ userInfo }) {
  return (
    <div>
      <p className="user">我是用户页{userInfo.name}</p>
      <Button
        onClick={() => {
          store.dispatch(updateUserInfo({ userInfo: { name: '网撒' } }))
        }}
      >
        更新信息
      </Button>
    </div>
  )
}

// 暴露必须使用connect方法连接
export default connect(mapStateToProps)(Index)
