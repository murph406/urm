import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import * as Colors from '../theme/colors';

const TabBar = (props) => (
  <View style={styles.container}>
    <View style={styles.tabBar}>
      <Text style={styles.font}>{props.text}</Text>
    </View>
  </View>
)

export default TabBar;



const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: Colors.SECONDARY,
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    shadowOffset:{width: 0, height: 5},
  },
  font: {
    fontFamily: 'Arial',
    fontSize: 34,
    color: 'white',
  },
  tabBar: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
});
