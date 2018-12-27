import * as DetailActions from '../action-types/store-detail-action-types';

const initialState = {
  store: null,
  items: null
}

export default function storeDetail(state=initialState, action) {
  switch(action.type) {
    case DetailActions.SET_STORE:
      return {
        ...state,
        store: action.store
      }

    case DetailActions.SET_ITEMS:
      return {
        ...state,
        items: action.items
      }

    default:
      return state;
  }
}
