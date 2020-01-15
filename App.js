import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { Asset } from 'expo-asset'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as Font from 'expo-font';
import FontAwesome from './node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf';
import MaterialIcons from './node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf';
//     ^^^ Needed to be required so to not throw an error with react-native-elements 

import MainReducer from './src/reducers/main-reducer';
import AppNavigator from './src/navigation/app-navigator';

import { BACKGROUND_DARK_LIGHTGREY } from './src/theme/colors';
import { getItemsAll } from './src/api/api'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isAppReady: false
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
      await this.getData()
      this.setState({ isAppReady: true });
    } catch (err) {
      console.log(err)
    }
  }


  getData = async () => {
    return new Promise((resolve, reject) => {
      getItemsAll(async (err, items) => {
        if (err) {
          Alert.alert('Error Refreshing Data', 'Old data being used instead')
          resolve(err)
        } else {
          try {
            await AsyncStorage.setItem('data', JSON.stringify(items));
            resolve(items)
          } catch (err) {
            reject(err)
          }
        }
      })
    })
  }

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
    ]

    await Asset.loadAsync(icons);
  }


  render() {
    let { isAppReady } = this.state

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
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK_LIGHTGREY,
    alignItems: 'center',
    justifyContent: 'center',
  }
});