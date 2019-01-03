import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as Colors from '../theme/colors';
import PropTypes from 'prop-types';

const TextBox = (props) => (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => {props.onPress()}} style={{flex: 1}}>
        <View style={styles.mainContainer} >
          <View style={styles.textContainer} >
            <Text style={styles.bigText}>{props.title}</Text>
            <Text style={styles.smallText}>{props.text}{props.id}</Text>
          </View>

          {(props.hasFeature)
            ? <View style={[styles.featureContainer, {backgroundColor:props.featureColor}]} >
                <Text style={styles.featureText}>{props.featureValue}</Text>
              </View>
            : null
          }

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
  featureColor: PropTypes.string
}

TextBox.defaultProps = {
  hasFeature: false,
  featureValue: '',
  featureColor: 'orange'
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    justifyContent:'center',
    margin: 12,
  },
  mainContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'
  },
  featureContainer: {
    width: 84, justifyContent: 'center', alignItems: 'center'
  },
  featureText: {
    fontSize: 24, textAlign: 'center'
  },
  textContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'stretch',
    margin: 16
  },
  smallText: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'bold'
  },
  bigText: {
    fontFamily: 'bold',
    fontSize: 34,
    color: 'black',
    marginBottom: 8
  },
});
