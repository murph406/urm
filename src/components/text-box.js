import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as Colors from '../theme/colors';
import PropTypes from 'prop-types';

const TextBox = (props) => (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => {props.onPress()}} >
          <Text
            style={styles.font}>{props.title}
          </Text>
          <Text style={styles.smallText}>abc 123 Street</Text>

      </TouchableOpacity>
    </View>
)
export default TextBox;

TextBox.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
}

TextBox.defaultProps = {
  title: 'blank',
  onPress: () => console.log('bruh')
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    shadowOffset:{width: 0, height: 4},
    justifyContent:'center',
    margin:12,
  },
  smallText: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Arial',
    marginLeft: 16,
  },
  font: {
    marginLeft: 16, marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 34,
    color: 'black',
  },
});
