import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Colors from '../theme/colors';
import PropTypes from 'prop-types';

const TextBox = (props) => (
  <View>
    <View style={styles.container}>
      <Text
        style={styles.font}> {props.title}
      </Text>
    </View>
  </View>
)
export default TextBox;

TextBox.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    shadowOffset:{width: 0, height: 5},
    justifyContent:'center',
  },
  font:{
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 34,
    color: 'black',
  },
});
