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

  componentDidMount() {
    let user = {
      stores: [
        { name: 'Albertsons', store_id: '7960' },
        { name: 'Walmart', store_id: '7970' },
        { name: 'Safeway', store_id: '7975' },
        { name: 'Rosaurs', store_id: '970' },
        { name: 'Penis Butt', store_id: '550' }
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
