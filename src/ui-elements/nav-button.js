import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Colors from '../theme/colors';

const NavigationButton = (props) => (
  <View>
    <View style={styles.button}>
      <Image
         source={require('../../assets/nav-icon.png')}
         style={styles.icon}
         contentMode={'center'}
        />
    </View>
  </View>
)

export default NavigationButton;

const styles = StyleSheet.create({
  button: {
    height: 64,
    width: 64,
    borderRadius: 100,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    justifyContent: 'center',
    height: 40,
    width: 40
  }
});
