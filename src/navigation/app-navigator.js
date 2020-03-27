import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Fonts, HeaderHeight } from '../theme/styling';
import { RED, SECONDARY } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import LoadScreen from '../screens/LoadScreen';
import PromoItemScreen from '../screens/PromoItemScreen';
import ProductReferenceScreen from '../screens/ProductReferenceScreen'

const navigator = createStackNavigator({
  load: LoadScreen,
  home: HomeScreen,
  promoList: PromoItemScreen,
  productReference: ProductReferenceScreen
},
{
  initialRouteName: 'load',
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
