import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import { SECONDARY } from '../theme/colors'

const Field = props => (
  <View style={styles.fieldContainer} >
    <TextInput
      selectionColor={SECONDARY} autoCorrect={false}
      style={styles.field}
      placeholder={props.placeholder}
      onChangeText={(text) => props.updateState(text)}
      value={props.text}
      returnKeyType={'next'}
      keyboardType={props.keyboard}
    />
  </View>
)

Field.propTypes = {
  placeholder: PropTypes.string,
  updateState: PropTypes.func,
  text: PropTypes.string,
  keyboard: PropTypes.string
}

const styles = StyleSheet.create({
  fieldContainer: {
    height: 64, justifyContent: 'center',
    borderBottomColor: SECONDARY, borderBottomWidth: 2
  },
  field: {
    color: SECONDARY, fontSize: 24, fontFamily: 'bold'
  },
})

export default Field
