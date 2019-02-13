import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';

const CircleButton = props => (
  <View style={styles.buttonView} >
    <TouchableOpacity
       style={[styles.button, { backgroundColor: props.backgroundColor}]}
       onPress={() => {props.onPress()}}>
      <Image
        style={styles.icon}
        source={props.image}
      />
    </TouchableOpacity>

  </View>
)

CircleButton.propTypes = {
  backgroundColor: PropTypes.string,
  image: PropTypes.string
}

CircleButton.defaultProps = {
  backgroundColor: Colors.BACKGROUND_DARK_DARKGREY,
  image: ''
}

const styles = StyleSheet.create({
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
})

export default CircleButton;
