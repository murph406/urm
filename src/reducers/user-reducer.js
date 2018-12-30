import * as UserActions from '../action-types/user-action-types';

const initialState = {
  user: null,
  isLoggedIn: false
}

export default function user(state=initialState, action) {
  switch(action.type) {

    case UserActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }

    case UserActions.SET_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}
