import React, { Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {

    }
  }


  componentDidMount() {

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
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(LoginScreen);
