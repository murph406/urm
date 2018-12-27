import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as UserActions from '../action-types/user-action-types';

class HomeScreen extends Component {

  doSomethin() {
    let theUser = { };

    this.props.dispatch({
      type: UserActions.SET_USER,
      user: theUser
    });
  }

  render() {
    return(
      <View style={styles.container} >
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

var mapStateToProps = (state) => {
  return {
    stores: state.user.stores,
    screenIndex: state.nav.screenIndex
  }
}

export default connect(mapStateToProps)(HomeScreen);
