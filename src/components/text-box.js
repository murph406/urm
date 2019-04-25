import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as Colors from '../theme/colors';
import PropTypes from 'prop-types';

const TextBox = (props) => (

    <View style={[styles.container, {backgroundColor: props.featureColor}]}>
      <TouchableOpacity onPress={props.onPress} style={{flex: 1}}>
          <View style={styles.textContainer} >
            <Text style={[styles.bigText, {color: props.featureText}]}>{props.title}</Text>
            <Text style={[styles.smallText, {color: props.featureText}]}>{props.text}{props.id}</Text>
          </View>
      </TouchableOpacity>
    </View>
)
export default TextBox;

TextBox.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  onPress: PropTypes.func,
  hasFeature: PropTypes.bool,
  featureValue: PropTypes.string,
  featureColor: PropTypes.string,
  featureText: PropTypes.string
}

TextBox.defaultProps = {
  hasFeature: false,
  featureValue: '',
  featureColor: Colors.BACKGROUND_DARK_DARKGREY,
  featureText: 'white'
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    justifyContent:'center',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
    padding: 8,
  },
  mainContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', overflow: 'hidden',

  },
  featureContainer: {
    width: 84, justifyContent: 'center', alignItems: 'center'
  },
  featureText: {
    fontSize: 28, textAlign: 'center', fontFamily: 'bold', color: 'white'
  },
  textContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'stretch',
    margin: 16,
  },
  smallText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'bold'
  },
  bigText: {
    fontFamily: 'bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 8
  },
});
