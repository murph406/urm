import * as OrderActions from '../action-types/order-action-types';

const initialState = {
  items: [],
  storeInfo: {

  }
}

export default function order(state=initialState, action) {
  switch(action.type) {
    case OrderActions.SET_ITEMGROUP_ITEMS:
      return {
        ...state,
        items: action.items
      }

    case OrderActions.SET_STORE_INFO:
      return {
        ...state,
        storeInfo: action.store
      }

    default:
      return state
  }
}
