import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Colors from '../theme/colors';

class Menu extends Component {

  goHome = () => {
    this.props.navigation.navigate('home');
    this.props.navigation.closeDrawer();
  }
  goNews = () => {
    this.props.navigation.navigate('news');
    this.props.navigation.closeDrawer();
  }
  goTasks= () => {
    this.props.navigation.navigate('task');
    this.props.navigation.closeDrawer();
  }

  goItem= () => {
    this.props.navigation.navigate('items');
    this.props.navigation.closeDrawer();
  }



  render() {
    return(
      <View style={styles.container} >

        <TouchableOpacity onPress={this.goHome}>
          <Text style={styles.Text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goItem}>
          <Text style={styles.Text}>New Items</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY,
    paddingTop: 60
  },
  Text: {
    fontFamily: 'bold',
    fontSize: 34,
    color: 'black',
    margin: 10,
  },
})

export default Menu;
