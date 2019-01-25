import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';

const TextBoxFeature = (props) => (

    <TouchableOpacity style={styles.container} onPress={props.onPress} >
      <View style={styles.textLeftContainer} >
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>

      <View style={styles.featureContainer} >
        <Text style={styles.featureText}>{props.featureText}</Text>
        <Text style={styles.featureLabel}>{props.featureLabel}</Text>
      </View>
    </TouchableOpacity>

)

TextBoxFeature.PropTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  featureText: PropTypes.string,
  featureLabel: PropTypes.string,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    height: 120, borderRadius: 4,
    marginLeft:12, marginRight: 12, marginBottom: 12, backgroundColor: 'white',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch',
    overflow: 'hidden'
  },
  textLeftContainer: {
    flex: 3, marginLeft: 16,
    justifyContent: 'center'
  },
  featureContainer: {
    flex: 1, backgroundColor: Colors.SECONDARY,
    flexDirection: 'column', alignItems: 'center', justifyContent:'center'
  },
  featureText: {
    fontSize: 24, fontFamily: 'bold', color: Colors.SECONDARY_DARK,
    textAlign: 'center'
  },
  featureLabel: {
    position: 'relative', top: 8, fontSize: 16, color: Colors.SECONDARY_DARK, fontFamily: 'bold'
  },
  title: {
    fontSize: 34, fontFamily: 'bold', marginBottom: 8
  },
  subtitle: {
    fontSize: 18, color: Colors.PRIMARY, fontFamily: 'bold'
  }
});

export default TextBoxFeature;
