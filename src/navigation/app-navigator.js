import { SECONDARY } from '../theme/colors';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Fonts, HeaderHeight } from '../theme/styling';

import LoadScreen from '../screens/LoadScreen';
import HomeScreen from '../screens/HomeScreen';
import PromoItemScreen from '../screens/PromoItemScreen';
import NewItemDetail from '../screens/NewItemDetail';
import ProductReferenceScreen from '../screens/ProductReferenceScreen'

const navigator = createStackNavigator({
  load: LoadScreen,
  home: HomeScreen,
  promoList: PromoItemScreen,
  promoDetail: NewItemDetail,
  productReference: ProductReferenceScreen
},
{
  initialRouteName: 'home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: SECONDARY,
      height: HeaderHeight,
    },
    headerTintColor: 'white',
    headerTitleStyle: Fonts.headline,
    headerBackTitleStyle: Fonts.subHeading
  },
})

const AppNavigator = createAppContainer(navigator)

export default AppNavigator;
