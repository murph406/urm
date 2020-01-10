import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight } from './AnimatedTextBox-Styles'
import { AnimatedContainer, AnimatedColor, AnimatedRotation, AnimatedOpacity } from './Animated-Utility'
import { Fonts } from '../../theme/styling'
import { SECONDARY, BACKGROUND_DARK_GREY, RED } from '../../theme/colors'

export default class AnimatedTextBox extends PureComponent {
    constructor() {
        super();
        this.state = {
            isAnimatedTextBoxActive: false
        }
    }

    goAnimatedTextBox = () => {

        const { isAnimatedTextBoxActive } = this.state
        const toggleAnimation = !isAnimatedTextBoxActive

        this.setState({ isAnimatedTextBoxActive: toggleAnimation })
    }

    getLeftContent = () => {

        const { name, brand, code } = this.props.data

        let contents = (
            <View>
                <Text style={[Fonts.headline, { color: 'black', paddingBottom: 8}]} numberOfLines={1}>{name}</Text>
                <Text style={[Fonts.subHeading, { color: BACKGROUND_DARK_GREY }]}>{brand}</Text>
                <Text style={[Fonts.subHeading, { color: BACKGROUND_DARK_GREY }]}>Code #: {code}</Text>
            </View>
        )

        return contents
    }

    getRightContent = () => {

        const { isAnimatedTextBoxActive } = this.state
        const iconSize = 24

        let contents = (
            <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={.7}
                onPress={this.goAnimatedTextBox}>
                <AnimatedColor
                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                    initialColor={SECONDARY}
                    finalColor={RED}
                    isActive={isAnimatedTextBoxActive}>
                    <AnimatedRotation
                        initialDeg={'45deg'}
                        finalDeg={'0deg'}
                        isActive={isAnimatedTextBoxActive}>
                        <Image
                            source={require('../../../assets/X-icon-white.png')}
                            style={{ height: iconSize, width: iconSize }} />
                    </AnimatedRotation>
                </AnimatedColor>
            </TouchableOpacity>
        )

        return contents
    }

    getBottomContent = () => {

        const { description } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        contents = (
            <View style={styles.descriptionTextPosition}>
                <AnimatedOpacity isActive={isAnimatedTextBoxActive}>
                    <Text style={[Fonts.subHeading, { color: BACKGROUND_DARK_GREY }]}>Description: {description}</Text>
                </AnimatedOpacity>
            </View>
        )

        return contents
    }

    render() {
        const { isAnimatedTextBoxActive } = this.state
        const LeftContent = this.getLeftContent()
        const RightContent = this.getRightContent()
        const BottomContent = this.getBottomContent()

        return (
            <AnimatedContainer
                minHeight={containerHeight}
                maxHeight={containerHeight * 1.8}
                isActive={isAnimatedTextBoxActive}>

                <View style={styles.textPosition}>{LeftContent}</View>
                <View style={styles.buttonPosition}>{RightContent}</View>
                {BottomContent}

            </AnimatedContainer>
        )
    }
}


AnimatedTextBox.propTypes = {

}

AnimatedTextBox.defaultProps = {

}