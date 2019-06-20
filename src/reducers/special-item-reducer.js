import * as SpecialItemActions from '../action-types/special-item-actions';

var initialState = {
  newItems: [],
  dealItems: []
}

export default function specialItems(state=initialState, action) {
  switch(action.type) {
    case SpecialItemActions.SET_NEW_ITEMS:
      return {
        ...state,
        newItems: action.items
      }

    case SpecialItemActions.SET_DEAL_ITEMS:
      return {
        ...state,
        dealItems: action.items
      }

    default:
      return state
  }
}
