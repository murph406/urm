import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Colors from '../theme/colors';

class Menu extends Component {


  render() {
    return(
      <View style={styles.container} >
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  }
})

export default Menu;
