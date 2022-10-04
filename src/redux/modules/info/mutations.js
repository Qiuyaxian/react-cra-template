import { SET_CURRENT_USER } from '../../mutation-types'
// mutations
export default {
  [SET_CURRENT_USER]: (state, data) => ({
    ...state,
    ...data
  })
}
