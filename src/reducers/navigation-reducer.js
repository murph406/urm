// import * as NavActions from '../action-types/navigation-action-types';
// import { Home, Stores } from '../action-types/navigation-action-types';
import * as NavActions from '../action-types/navigation-action-types';

const HOME_INDEX = 0;
const STORES_INDEX = 1;
const ITEMS_INDEX = 2;

const initialState = {
  screenIndex: HOME_INDEX,
  menuOpen: false
}

export default function nav(state=initialState, action) {
  switch(action.type) {
    case NavActions.HOME:
      return {
        ...state,
        screenIndex: HOME_INDEX
      }

    case NavActions.STORES:
      return {
        ...state,
        screenIndex: STORES_INDEX
      }

    default:
      return state;
  }
}
