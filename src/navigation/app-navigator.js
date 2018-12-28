import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/menu';
import StoreScreen from '../screens/StoreScreen';
import NewsScreen from '../screens/NewsScreen';
import TaskScreen from '../screens/TaskScreen';
import NewItemScreen from '../screens/NewItemScreen';
import ItemScreen from '../screens/ItemsScreen';
import LoadScreen from '../screens/LoadScreen';

const AppNavigator = createDrawerNavigator({
  load: LoadScreen,
  home: HomeScreen,
  store: StoreScreen,
  news: NewsScreen,
  task: TaskScreen,
  newItem: NewItemScreen,
  items: ItemScreen,
},
{
  contentComponent: Menu,
  drawerWidth: Dimensions.get('window').width * 0.7,
  drawerType: 'front'
})

export default AppNavigator;
