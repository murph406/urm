import { combineReducers } from 'redux';

import item from './item-reducer';

const MainReducer = combineReducers({
  item,
})

export default MainReducer;
