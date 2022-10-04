import mutations from './mutations'
// state
const initState = {
  userInfo: {}
}
// gettres
const reducer = (state = initState, { type, data }) => {
  if (mutations[type]) {
    return mutations[type](state, data)
  }
  return state
}

export default reducer
