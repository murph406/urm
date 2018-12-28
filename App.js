import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import MainReducer from './src/reducers/main-reducer';
import thunk from 'redux-thunk';

import AppNavigator from './src/navigation/app-navigator';


export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      fontsLoaded: false
    }
  }

  store = createStore(applyMiddleware(thunk), MainReducer);

  async componentDidMount() {
    await Font.loadAsync({
      'regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'bold': require('./assets/fonts/Roboto-Bold.ttf')
    });

    this.setState({ fontsLoaded: true });
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
        <View style={{flex:1}}><ActivityIndicator size='large'></ActivityIndicator></View>
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
