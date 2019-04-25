import * as ItemActions from '../action-types/item-action-types';

var initialState = {
  item: null,
  itemType: ItemActions.TYPE_NEW_ITEM
}

export default function item(state=initialState, action) {
  switch(action.type) {
    case ItemActions.SET_ITEM:
      return {
        ...state,
        itemType: action.itemType,
        item: action.item
      }

    default:
      return state;
  }
}
