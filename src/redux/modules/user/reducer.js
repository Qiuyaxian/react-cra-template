import mutations from './mutations'
// state
const initState = {
  userInfo: {
    name: '章三'
  }
}
// gettres
const reducer = (state = initState, { type, data }) => {
  if (mutations[type]) {
    return mutations[type](state, data)
  }
  return state
}

export default reducer
