import React from 'react';
import { combineReducers } from 'redux';

import nav from './navigation-reducer';
import user from './user-reducer';
import storeDetail from './store-detail-reducer';
import item from './item-reducer';
import specialItems from './special-item-reducer';

const MainReducer = combineReducers({
  nav,
  user,
  storeDetail,
  item,
  specialItems
})

export default MainReducer;
