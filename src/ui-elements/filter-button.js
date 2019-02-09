import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';

const FilterButton = (props) => (

    <View style={styles.button}>
       
     {(props.options.map(
       (data) => (
        <TouchableOpacity
          onPress={() => props.onPress(data.index)}
          style={ ((data.isSelected) ? styles.submitContainer2 : styles.submitContainer ) }
        >
        <Text style={((data.isSelected) ? styles.submitText2 : styles.submitText )}>{data.name}</Text>
        </TouchableOpacity>
      )))}

    </View>

)

FilterButton.PropTypes = {
  data: PropTypes.arr,
  onPress: PropTypes.func
}

FilterButton.onSelectItem = function(arr, index, callback) {
  for(let i = 0; i < arr.length; i++) {
    if ( arr[index].isSelected === false ) {
      arr[index].isSelected = true;
      callback(arr);
      break;
   } 
    else { 
      arr[index].isSelected = false; 
      callback(arr);
      break;
    }
  } 
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
    backgroundColor: Colors.SECONDARY,
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  submitText2: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
});
