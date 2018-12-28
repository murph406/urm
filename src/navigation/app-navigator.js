import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/menu';
import StoreScreen from '../screens/StoreScreen';
import NewsScreen from '../screens/NewsScreen';
import TaskScreen from '../screens/TaskScreen';
import NewItem from '../screens/newItem';

const AppNavigator = createDrawerNavigator({
  home: HomeScreen,
  store: StoreScreen,
  news: NewsScreen,
  task: TaskScreen,
  newItem: NewItem,
},
{
  contentComponent: Menu,
  drawerWidth: Dimensions.get('window').width * 0.7,
  drawerType: 'front'
})

export default AppNavigator;
