import * as ItemActions from '../action-types/item-action-types';

var initialState = {
  item: null,
}

export default function item(state=initialState, action) {
  switch(action.type) {
    case ItemActions.SET_ITEM:
      return {
        ...state,
        item: action.itemType,
      }

    default:
      return state;
  }
}
