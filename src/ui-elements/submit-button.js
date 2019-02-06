import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';

const SubmitButton = (props) => (

    <View style={styles.button}>
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={props.onPress}
        >
        <Text style={styles.submitText}>{props.title}</Text>
      </TouchableOpacity>


    </View>

)

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    height: 54,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 6,
    marginLeft:12,
    marginRight:12,
  },
  submitContainer:{
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    fontFamily: 'bold',
    textAlign: 'center',
    color: 'white'
  },
});
