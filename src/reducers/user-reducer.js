import * as UserActions from '../action-types/user-action-types';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    stores: []
  }
}

export default function user(state=initialState, action) {
  switch(action.type) {

    case UserActions.SET_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}
