import { SET_CURRENT_USER } from '../../mutation-types'
// actions
export const updateUserInfo = (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    data: {}
  })
}
