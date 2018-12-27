import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { connect } from 'react-redux';
import * as UserActions from '../action-types/user-action-types';

import TabBar from '../ui-elements/tab-bar';
import NavigationButton from '../ui-elements/nav-button';

class HomeScreen extends Component {




  componentDidMount() {
    this.props.navigation.openDrawer();
  }

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
        <TabBar/>
        <View style={styles.navIcon}>
          <NavigationButton/>
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navIcon: {
    position: 'absolute',
    right: 20,
    paddingTop: 400,
  }
})

var mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(HomeScreen);
