import React, { PureComponent } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import * as Colors from '../theme/colors';

class LoadScreen extends PureComponent {
  constructor() {
    super();

    this.state = {

    }
  }

  componentDidMount() {
    this.navigateHome()
  }


  navigateHome = () => {
    setTimeout(() => {
      this.props.navigation.navigate('home')
    }, 500)
  }

  render() {
    return (
      <View style={styles.container} >
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoadScreen;
