import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as Colors from '../theme/colors';

const TextBoxFeature = (props) => (

    <TouchableOpacity style={styles.container} onPress={props.onPress} >
      <View style={styles.textLeftContainer} >
        <Text
          adjustsFontSizeToFit={true}
          style={styles.title}
          numberOfLines={2}
          minimumFontScale={.8}
        >{props.title} </Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>

      <View style={[styles.featureContainer, {backgroundColor: props.featureColor}] } >
        {(props.featureType === 'text')
          ? <View>
              <Text style={styles.featureText}>{props.featureText}</Text>
              <Text style={styles.featureLabel}>{props.featureLabel}</Text>
            </View>

          : <View >
              <Image
                style={styles.icon}
                source={require('../../assets/check-icon.png')}
              />
            </View>
        }

      </View>
    </TouchableOpacity>

)

TextBoxFeature.PropTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  featureText: PropTypes.string,
  featureLabel: PropTypes.string,
  featureColor: PropTypes.string,
  featureType: PropTypes.string,
  onPress: PropTypes.func
}

TextBoxFeature.defaultProps = {
  featureColor: Colors.SECONDARY,
  featureType: 'text',
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
    fontSize: 28, fontFamily: 'bold', color: Colors.SECONDARY_DARK,
    textAlign: 'center',
  },
  featureLabel: {
    position: 'relative', top: 8, fontSize: 18, color: Colors.SECONDARY_DARK, fontFamily: 'bold'
  },
  title: {
    fontSize: 28,fontFamily: 'bold', marginBottom: 8, marginRight: 32, marginTop: 16
  },
  subtitle: {
    fontSize: 18, color: Colors.PRIMARY, fontFamily: 'bold'
  },
  iconContainer: {

  },
  icon: {
    justifyContent: 'center',
    height: 48,
    width: 48
  }
});

export default TextBoxFeature;
