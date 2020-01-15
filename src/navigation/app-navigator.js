import { SECONDARY } from '../theme/colors';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Fonts, HeaderHeight } from '../theme/styling';

import HomeScreen from '../screens/HomeScreen';
import PromoItemScreen from '../screens/PromoItemScreen';
import ProductReferenceScreen from '../screens/ProductReferenceScreen'

const navigator = createStackNavigator({
  home: HomeScreen,
  promoList: PromoItemScreen,
  productReference: ProductReferenceScreen
},
{
  initialRouteName: 'home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: SECONDARY,
      height: HeaderHeight,
      marginRight: 0
    },
    headerTintColor: 'white',
    headerTitleStyle: Fonts.headline,
    headerBackTitleStyle: Fonts.subHeadingWhite
  },
})

const AppNavigator = createAppContainer(navigator)

export default AppNavigator;
