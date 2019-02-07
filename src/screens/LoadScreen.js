import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as API from '../api/api';

class LoadScreen extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  async componentDidMount() {
    let userID = await AsyncStorage.getItem('@USER_ID')
    if(userID) {
      this.getUser(userID)
    } else {
      this.props.navigation.navigate('login')
    }
  }

  getUser = (userID) => {
    API.getUser(userID, async(err, user) => {
      if(err) {
        console.log(err)
        await AsyncStorage.removeItem('@USER_ID')
        this.props.navigation.navigate('login')
      } else {
        await AsyncStorage.setItem('@USER_ID', user._id)
        this.handleUser(user)
      }
    })
  }

  handleUser = (user) => {
    this.getStores(user.stores, (err, stores) => {
      if(err) {
        console.log(err)
      } else {
        user.stores = stores;
        this.props.dispatch({
          type: UserActions.SET_USER,
          user: user
        });
        this.props.navigation.navigate('home')
      }
    })
  }

  getStores = (stores, callback) => {
    let promises = []
    for(let i = 0; i < stores.length; i++) {
      promises.push(this.getStore(stores[i]))
    }

    Promise.all(promises).then((response) => {
      callback(null, response)
    }).catch((e) => {
      console.log(e)
      callback(e)
    })
  }

  getStore(id) {
    return new Promise((resolve, reject) => {
      API.getStoreByCode(id, (err, store) => {
        if(err) {
          console.log(err)
          reject(err)
        } else {
          console.log(store)
          resolve(store)
        }
      })
    })
  }

  render() {
    return(
      <View style={styles.container} >
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(LoadScreen);
