import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Colors from '../theme/colors';

class Menu extends Component {

  goHome = () => {
    this.props.navigation.navigate('home');
    this.props.navigation.closeDrawer();
  }



  render() {
    return(
      <View style={styles.container} >
        <TouchableOpacity
          onPress={this.goHome}
          >
          <Text style={styles.Text}>Home</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY,
    paddingHorizontal:20,
    paddingTop: 60
  },
  Text: {
    fontFamily: 'bold',
    fontSize: 34,
    color: 'black',
  }
})

export default Menu;
