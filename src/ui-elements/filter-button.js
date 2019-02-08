import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';

const FilterButton = (props) => (

    <View style={styles.button}>
       
     {(props.options.map(
       (data) => (
        <TouchableOpacity
          onPress={() => props.onPress()}
          style={ ((data.isSelected) ? styles.submitContainer2 : styles.submitContainer ) }
        >
        <Text style={styles.submitText}>{data.name}</Text>
        </TouchableOpacity>
      )))}

    </View>

)

FilterButton.PropTypes = {
  onPress: PropTypes.func
}

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  submitContainer:{
    flex: 1,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    alignSelf: 'stretch',
    marginTop: 6,
    marginLeft:12,
    marginRight:12,
  },
  submitContainer2:{
    flex: 1,
    borderRadius: 28,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    alignSelf: 'stretch',
    marginTop: 6,
    marginLeft:12,
    marginRight:12,
  },
  submitText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
});
