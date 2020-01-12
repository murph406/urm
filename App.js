import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import FontAwesome from './node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf';
import MaterialIcons from './node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf';
//     ^^^ Needed to be required so to not throw an error with react-native-elements 

import MainReducer from './src/reducers/main-reducer';
import AppNavigator from './src/navigation/app-navigator';

import { BACKGROUND_DARK_LIGHTGREY } from './src/theme/colors';
import * as Font from 'expo-font';


export default class App extends Component {

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
      'Material Icons': MaterialIcons,
      FontAwesome,

    });

    this.setState({ fontsLoaded: true });
  }

  render() {
    if (this.state.fontsLoaded) {
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