import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';

class LoadScreen extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  // TODO look at what the user object looks like in the user reducer
  // and make the dispatch actually dispatch a proper user, complete with namee, etc
  componentDidMount() {
    let user = {
      stores: [
        { name: 'Albertsons', store_id: '7960', itemCount: '252' },
        { name: 'Walmart', store_id: '550', itemCount: '12' },
        { name: 'Safeway', store_id: '7975', itemCount: '81' },
        { name: 'Rosaurs', store_id: '970', itemCount: '82' }
      ]
    }

    this.props.dispatch({
      type: UserActions.SET_USER,
      user: user
    });
    this.props.navigation.navigate('home')
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
