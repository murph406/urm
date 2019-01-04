import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import * as Colors from '../theme/colors';

const RadioButton = props => (
  <View style={styles.container} >
    {props.options.map(
      (option) =>
      <TouchableOpacity
        onPress={() => props.onSelectOption(option.index)}
        style={ ((option.isSelected) ? styles.buttonOn : styles.buttonOff) }
        key={option.value} >
        <Text style={(option.isSelected) ? styles.textOn : styles.textOff} >
          {option.value}
        </Text>
      </TouchableOpacity>
    )}
  </View>
)

RadioButton.propTypes = {
  options: PropTypes.array,
  onSelectOption: PropTypes.func,
  isCongruent: PropTypes.bool
}

RadioButton.onSelect = function(arr, index, callback) {
  if(arr[index].isSelected) {
    arr[index].isSelected = false;
  } else {
    for(let i = 0; i < arr.length; i++) {
      arr[i].isSelected = false;
    }
    arr[index].isSelected = true;
  }
  callback(arr);
}

RadioButton.onSelectExclusive = function(arr, index, callback) {
  for(let i = 0; i < arr.length; i++) {
    arr[i].isSelected = false;
  }
  arr[index].isSelected = true;
  callback(arr);
}

const FRAME = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // flexWrap: 'wrap',
    justifyContent: 'center',

  },
  buttonOn: {
    // flexGrow: 1,
    height: 48,
    borderRadius: 8, marginBottom: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    width: FRAME.width - 32
  },
  buttonOff: {
    // flexGrow: 1,
    height: 54,
    borderRadius: 8, marginBottom: 8,
    backgroundColor: 'rgb(240,240,240)',
    justifyContent: 'center',
    width: FRAME.width - 32
  },
  textOn: {
    fontSize: 18,
    marginLeft: 12, marginRight: 12,
    color: 'white', textAlign: 'center',
    fontFamily: 'bold'
  },
  textOff: {
    fontSize: 18,
    marginLeft: 12, marginRight: 12,
    color: 'black', textAlign: 'center',
    fontFamily: 'bold'
  }
});

var mapStateToProps = state => {
  return {
    fontLoaded: state.setup.fontLoaded
  }
}

export default RadioButton;
