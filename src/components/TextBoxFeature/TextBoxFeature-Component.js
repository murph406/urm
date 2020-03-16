import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import { Fonts } from '../../theme/styling'
import { SECONDARY, PRIMARY, SECONDARY_DARK } from '../../theme/colors'
import * as Colors from '../../theme/colors';
import styles from './TextBoxFeature-Styles'

export default class TextBoxFeature extends PureComponent {

    getLeftContent = () => {

        const { title, subtitle } = this.props.data

        const content = (
            <View style={styles.textLeftContainer}>
                <Text style={[Fonts.headline, { color: 'black' }]}>{title}</Text>
                <Text style={[Fonts.subHeading, { color: PRIMARY }]}>{subtitle}</Text>
            </View>
        )

        return content
    }

    getRightContent = () => {

        const { featureType } = this.props
        const { featureText, featureLabel } = this.props.data
        //         ^^      Feature Text is undefined and does not live on this.props and not declared on HomeScreen
        console.log(this.props)
        const content = (
            <View style={styles.featureContainer}>
                {(featureType === 'text')
                    ?
                    <>
                        <Text style={[Fonts.headline, { marginBottom: 8, color: SECONDARY_DARK }]}>{featureText}</Text>
                        <Text style={[Fonts.subHeading, { color: SECONDARY_DARK }]}>{featureLabel}</Text>
                    </>
                    :
                    <>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/icons/check-icon.png')} />
                    </>
                }
            </View>
        )

        return content
    }

    render() {

        const LeftContent = this.getLeftContent()
        const RightContent = this.getRightContent()
        const { onPress } = this.props

        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={.7}
                style={styles.container}>
                {LeftContent}
                {RightContent}
            </TouchableOpacity>
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