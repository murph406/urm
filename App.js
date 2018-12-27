import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import MainReducer from './src/reducers/main-reducer';
import thunk from 'redux-thunk';

import AppNavigator from './src/navigation/app-navigator';


export default class App extends React.Component {

  store = createStore(applyMiddleware(thunk), MainReducer);

  render() {
    return (
      <Provider store={this.store} >
        <AppNavigator />
      </Provider>
    );
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
