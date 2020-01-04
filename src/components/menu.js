import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { BACKGROUND_DARK_LIGHTGREY } from '../theme/colors';

class Menu extends Component {

  goHome = () => {
    this.props.navigation.navigate('home');
    this.props.navigation.closeDrawer();
  }

  goItem= () => {
    this.props.navigation.navigate('newItemList');
    this.props.navigation.closeDrawer();
  }



  render() {
    return(
      <View style={styles.container} >

        <TouchableOpacity onPress={this.goHome}>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goItem}>
          <Text style={styles.text}>New Items</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK_LIGHTGREY,
    paddingTop: 60, 
    paddingHorizontal: 16
  },
  text: {
    fontFamily: 'bold',
    fontSize: 34,
    color: 'white',
    margin: 10,
  },
})

export default Menu;
