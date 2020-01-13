import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { SECONDARY, BACKGROUND_LIGHT_GREY } from '../theme/colors'
import { Fonts, DeviceWidth } from '../theme/styling';

function Field(props) {

  const { placeholder, keyboard, text, label, updateState } = props

  onChangeText = (text) => {
    updateState(text)
  }

  return (
    <View style={styles.fieldContainer} >
      <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY }]}>{label}</Text>
      <TextInput
        selectionColor={SECONDARY}
        autoCorrect={false}
        style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY, paddingLeft: 8 }]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={text}
        returnKeyType={'next'}
        keyboardType={keyboard}
      />
    </View>
  )
}

Field.propTypes = {
  placeholder: PropTypes.string,
  updateState: PropTypes.func,
  text: PropTypes.string,
  keyboard: PropTypes.string
}

const styles = StyleSheet.create({
  fieldContainer: {
    height: 64,
    flexDirection: 'row',
    borderBottomColor: SECONDARY,
    borderBottomWidth: 2,
    marginBottom: 32,
    alignItems: 'center'
  },
  field: {
    color: SECONDARY,
    fontSize: 24,
    fontFamily: 'bold'
  },
})

export default Field
