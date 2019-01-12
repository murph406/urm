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
    height: 80,
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'stretch',
  },
  submitContainer:{
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 28,
    fontFamily: 'bold',
    textAlign: 'center',
    color: 'white'
  },
});
