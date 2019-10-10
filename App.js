import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
// import { Font } from 'expo';
import * as Font from 'expo-font';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ORDERS_KEY } from './src/api/offline-order-manager';

import MainReducer from './src/reducers/main-reducer';
import thunk from 'redux-thunk';

import AppNavigator from './src/navigation/app-navigator';

import * as Colors from './src/theme/colors';


export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      fontsLoaded: false
    }
  }

  store = createStore(MainReducer, applyMiddleware(thunk));

  componentWillMount() {
    console.disableYellowBox = true;
  }

  async componentDidMount() {
    await Font.loadAsync({
      'regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'bold': require('./assets/fonts/Roboto-Bold.ttf'),
      // 'mont': require('')
    });

    // await this.initOfflineOrderManagerAsync()

    this.setState({ fontsLoaded: true });
  }

  async initOfflineOrderManagerAsync() {
    await AsyncStorage.getItem(ORDERS_KEY, async(err, result) => {
      if(err) {
        await AsyncStorage.setItem(ORDERS_KEY, '[]')
      }
    })
  }

  render() {
    if(this.state.fontsLoaded) {
      return (
        <Provider store={this.store} >
          <AppNavigator />
        </Provider>
      );
    } else {
      return(
        <View style={{flex:1, backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY}}><ActivityIndicator size='large'></ActivityIndicator></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
