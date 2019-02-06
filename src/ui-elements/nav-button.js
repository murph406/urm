import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';



const NavigationButton = (props) => (
    <View style={styles.buttonView} >
      <TouchableOpacity
         style={styles.button}
         onPress={() => {props.onPress()}}>
        <Image
          style={styles.icon}
          source={require('../../assets/nav-icon.png')}
        />
      </TouchableOpacity>

    </View>
)

NavigationButton.propTypes = {
  onPress: PropTypes.func
}


const styles = StyleSheet.create({
  buttonView: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  button: {
    height: 64,
    width: 64,
    borderRadius: 100,
    backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    shadowOffset:{width: 0, height: 5}
  },
  icon: {
    justifyContent: 'center',
    height: 40,
    width: 40
  }
});

export default NavigationButton;
