import React, { Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import * as UserActions from '../action-types/user-action-types';
import * as API from '../api/api';
import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';


class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      stores: [],
      users: [],
    }
  }

  componentDidMount() {
    AsyncStorage.removeItem('@USER_ID', () => {
      this.getUsers();
    })

  }

  getUsers() {
    API.getUsers((err, users) => {
      if(!err) {
        console.log(users)
        console.log('yup')
        this.setState({users: users})
      }
    })
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
    console.log(this.state.users)
  }

  onUserSelect = (user) => {
    AsyncStorage.setItem('@USER_ID', user._id, (err, success) => {
      if(err) {
        console.log(err.message)
      } else {
        // user.stores = this.state.stores
        // this.handleUser(user)
        user.stores = []
        this.props.dispatch({
          type: UserActions.SET_USER,
          user: user
        })
        this.props.navigation.navigate('home')
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
          user
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
        {/*<TabBar
          hasBackButton= {false}
          text="Login"
        />*/}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Who are you?</Text>
        </View>
        <ScrollView style={{flex: 1, marginTop: 64}}>
          <View style={{height:32}}/>
          {(this.state.users.map((data, index)=> (
            <TextBox
              title={data.name}
              text={"User ID: " + data._id}
              onPress={() => this.onUserSelect(data)}
          />
          )))}

        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
  },
  titleContainer: {
    margin: 16, marginTop: 84,
    justifyContent: 'center', alignItems: 'center'
  },
  titleText: {

    fontFamily: 'bold', textAlign: 'center', color: 'white',
    fontSize: 32
  }
});

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(LoginScreen);
