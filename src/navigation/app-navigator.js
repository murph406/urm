import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Dimensions } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/menu';
import StoreScreen from '../screens/StoreScreen';
import NewsScreen from '../screens/NewsScreen';
import TaskScreen from '../screens/TaskScreen';
import NewItemDetail from '../screens/NewItemDetail';
import ItemScreen from '../screens/ItemScreen';
import LoadScreen from '../screens/LoadScreen';
import LoginScreen from '../screens/LoginScreen';
import NewItemScreen from '../screens/NewItemScreen';
import PromoItemScreen from '../screens/PromoItemScreen';
import StoreInfoOrder from '../screens/StoreInfoOrder';
import OrderPreview from '../screens/OrderPreview';

const navigator = createDrawerNavigator({
  load: LoadScreen,
  login: LoginScreen,
  home: HomeScreen,
  store: StoreScreen,
  news: NewsScreen,
  task: TaskScreen,
  items: ItemScreen,
  newList: NewItemScreen,
  newDetail: NewItemDetail,
  promoList: PromoItemScreen,
  promoDetail: NewItemDetail,
  storeInfoOrder: StoreInfoOrder,
  orderPreview: OrderPreview
},
{
  contentComponent: Menu,
  drawerWidth: Dimensions.get('window').width * 0.7,
  drawerType: 'front'
})

const AppNavigator = createAppContainer(navigator)

export default AppNavigator;
