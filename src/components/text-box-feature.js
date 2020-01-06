import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { SECONDARY, SECONDARY_DARK, PRIMARY } from '../theme/colors';
import { Fonts } from '../theme/styling'

class TextBoxFeature extends PureComponent {
  render() {
    let { title, subtitle, featureLabel, featureText } = this.props.data
    let { featureColor, featureType } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.textLeftContainer}
          onPress={this.props.onPress}>
          <Text
            adjustsFontSizeToFit={true}
            style={[Fonts.headline, { color: 'black' }]}
            numberOfLines={2}
            minimumFontScale={.8}>
            {title}
          </Text>
          <Text style={[Fonts.subHeading, { color: PRIMARY }]}>
            {subtitle}
          </Text>
        </TouchableOpacity>

        <View style={[styles.featureContainer, { backgroundColor: featureColor }]} >
          {(featureType === 'text')
            ?
            <View>
              <Text style={[ Fonts.subHeading, { color: SECONDARY_DARK}]}>{featureText}</Text>
              <Text style={[Fonts.subHeading, { color: SECONDARY_DARK }]}>{featureLabel}</Text>
            </View>
            :
            <View>
              <Image
                style={styles.icon}
                source={require('../../assets/check-icon.png')} />
            </View>
          }
        </View>
      </View>
    )
  }
}

TextBoxFeature.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  featureText: PropTypes.string,
  featureLabel: PropTypes.string,
  featureColor: PropTypes.string,
  featureType: PropTypes.string,
  onPress: PropTypes.func
}

TextBoxFeature.defaultProps = {
  featureColor: SECONDARY,
  featureType: 'text',
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden'
  },
  textLeftContainer: {
    flex: 3,
    marginLeft: 16,
    justifyContent: 'center'
  },
  featureContainer: {
    flex: 1,
    backgroundColor: SECONDARY,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureText: {
    fontSize: 28,
    fontFamily: 'bold',
    color: SECONDARY_DARK,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'center',
    height: 48,
    width: 48
  }
});

export default TextBoxFeature;
