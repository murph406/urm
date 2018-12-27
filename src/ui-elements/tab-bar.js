import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const TabBar = (props) => (
  <View style={styles.container}>

  </View>
)

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: '#109ed5',
  
  },
  font: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'white',
  },
  icon: {
    paddingTop: 45,
  },
  tabBar: {
     paddingTop: 15,
  },
});
