import { SET_CURRENT_USER } from '../../mutation-types'
// actions
export const updateUserInfo = (data) => {
  return {
    type: SET_CURRENT_USER,
    data: data
  }
}
