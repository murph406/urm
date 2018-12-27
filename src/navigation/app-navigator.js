import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/menu';
import StoreScreen from '../screens/StoreScreen';
import NewsScreen from '../screens/NewsScreen';
import TaskScreen from '../screens/TaskScreen';

const AppNavigator = createDrawerNavigator({
  home: HomeScreen,
  store: StoreScreen,
  news: NewsScreen,
  task: TaskScreen,
},
{
  contentComponent: Menu
})

export default AppNavigator;
