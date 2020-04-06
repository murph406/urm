import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { Asset } from 'expo-asset'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as Font from 'expo-font';
import FontAwesome from './node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf';
import MaterialIcons from './node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf';
//     ^^^ Needs to be required so to not throw an error with react-native-elements 

import MainReducer from './src/reducers/main-reducer';
import AppNavigator from './src/navigation/app-navigator';

import { getByCategory } from './src/api/api'
import { BACKGROUND_DARK_LIGHT_GREY } from './src/theme/colors';
import { Fonts } from './src/theme/styling';
import { categories } from './src/api/api';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAppReady: false,
      errorLoadingApp: false
    }
  }

  store = createStore(MainReducer, applyMiddleware(thunk));

  componentWillMount() {
    console.disableYellowBox = true;
  }

  async componentDidMount() {
    try {
      await this.loadFonts()
      await this.loadIcons()
      // this.getData()
      this.setState({ isAppReady: true })
    } catch (err) {
      console.log(err)
      this.setState({ errorLoadingApp: true })
    }
  }

  // getData = () => {
  //   AsyncStorage.getItem('key:last_updated', (err, val) => {
  //     console.log(val)
  //     // if last update was a while ago or if hasnt ever been updated
  //     if(!val || Date.now() - parseInt(val) >= 1000000) {
  //       promiseArray = [];
  //       console.log(categories)
  //       categories.forEach(element => {
  //         promiseArray.push(getByCategory(element));
  //       });

  //       Promise.all(promiseArray)
  //       .then((value) => {
  //         // let numItems = 0;
  //         // for(let i = 0; i < value.length; i++) {
  //         //   console.log(value)
  //         //   numItems += value[i].length;
  //         // }
  //         // console.log(numItems)
  //         AsyncStorage.setItem('key:last_updated', Date.now().toString(), (err) => {
  //           this.setState({ isAppReady: true });
  //         })
  //       })
  //       .catch(err => console.log('Error: ', err)); 
  //     } else {
  //       this.setState({ isAppReady: true })
  //     }
  //   })
  //   // promiseArray = [];
  //   // console.log(categories)
  //   // categories.forEach(element => {
  //   //   promiseArray.push(getByCategory(element));
  //   // });


  //   // Promise.all(promiseArray)
  //   // .then((value) => {
  //   //   AsyncStorage.setItem('key:last_updated', Date.now().toString(), (err) => {
  //   //     this.setState({ isAppReady: true });
  //   //   })
  //   // })
  //   // .catch(err => console.log('Error: ', err)); 
  // }

  loadFonts = async () => {
    await Font.loadAsync({
      'regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Material Icons': MaterialIcons,
      FontAwesome,
    });
  }

  loadIcons = async () => {
    const icons = [
      require('./assets/icons/filter-icon.png'),
      require('./assets/icons/arrow-icon-white.png'),
      require('./assets/icons/X-icon-white.png'),
      require('./assets/icons/minus.png'),
      require('./assets/icons/add.png'),
      require('./assets/icons/reset-icon-white.png'),
      require('./assets/icons/order.png'),
      require('./assets/icons/cart-icon.png'),
      require('./assets/icons/search.png')
    ]

    await Asset.loadAsync(icons);
  }

  render() {
    let { isAppReady, errorLoadingApp } = this.state

    if (isAppReady) {
      return (
        <Provider store={this.store} >
          <AppNavigator />
        </Provider>
      );
    } else {
      return (
        <View
          style={styles.container}>
          {(errorLoadingApp)
            ? <Text style={[Fonts.headline, { color: BACKGROUND_DARK_GREY }]}>Error Loading App</Text>
            : <ActivityIndicator size='large' />}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK_LIGHT_GREY,
    alignItems: 'center',
    justifyContent: 'center',
  }
});