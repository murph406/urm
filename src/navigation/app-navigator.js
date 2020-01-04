import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Dimensions } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/menu';
import StoreScreen from '../screens/StoreScreen';
import NewsScreen from '../screens/NewsScreen';
import TaskScreen from '../screens/TaskScreen';
import ItemScreen from '../screens/ItemScreen';
import LoadScreen from '../screens/LoadScreen';
import NewItemScreen from '../screens/NewItemScreen';
import Announcements from '../screens/Announcements';

const navigator = createDrawerNavigator({
  load: LoadScreen,
  home: HomeScreen,
  store: StoreScreen,
  news: NewsScreen,
  task: TaskScreen,
  items: ItemScreen,
  newList: NewItemScreen,
  announcements: Announcements
},
{
  contentComponent: Menu,
  drawerWidth: Dimensions.get('window').width * 0.7,
  drawerType: 'front'
})

const AppNavigator = createAppContainer(navigator)

export default AppNavigator;
