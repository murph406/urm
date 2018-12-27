import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/menu';

const AppNavigator = createDrawerNavigator({
  home: HomeScreen
},
{
  menu: Menu
})

export default AppNavigator;
