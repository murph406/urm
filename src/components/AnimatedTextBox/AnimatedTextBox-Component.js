import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight, } from './AnimatedTextBox-Styles'
import { AnimatedContainer, AnimatedColor, AnimatedRotation, AnimatedOpacity, AnimatedText, AnimatedPositionAbsolute } from './Animated-Utility'
import { Fonts, isScreenLarge } from '../../theme/styling'
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

        const { brand, item_code, item_description } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        let contents = (
            <View>
                <AnimatedText
                    fontStyle={Fonts.headline}
                    textColor={'black'}
                    isActive={isAnimatedTextBoxActive} >
                    {item_description}
                </AnimatedText>
                <TextDetail label={"Brand: "} value={brand} marginTop={32} />
                <TextDetail label={"Code #: "} value={item_code} marginTop={8} />
            </View>
        )

        return contents
    }

    getRightContent = () => {

        const { isAnimatedTextBoxActive } = this.state
        const iconSize = 24

        let contents = (
            <>
                <View style={styles.topButtonPosition}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={1}
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
                </View>
                <AnimatedPositionAbsolute
                    inputRange={{ bottomInitial: 0, rightInitial: 0, leftInitial: 0, topInitial: 0 }}
                    outputRange={{ bottomFinal: 0, rightFinal: 0, leftFinal: 0, topFinal: containerHeight * 1.5 }}
                    isActive={isAnimatedTextBoxActive}>
                    <TouchableOpacity
                        style={[styles.buttonStyle, { backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', zIndex: 50 }]}
                        activeOpacity={.7}
                        onPress={() => console.log('hello')}>
                        <Image
                            source={require('../../../assets/icons/arrow-icon-white.png')}
                            style={{ height: iconSize, width: iconSize }} />
                    </TouchableOpacity>
                </AnimatedPositionAbsolute>
            </>

        )

        return contents
    }

    getBottomContent = () => {

        const { size, pack, group_description, unit_price } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        contents = (
            <AnimatedOpacity
                inputRange={[.3, .7]}
                outputRange={[0, 1]}
                isActive={isAnimatedTextBoxActive} >
                <TextDetail label={"Size: "} value={size} marginTop={8} />
                <TextDetail label={"Pack: "} value={pack} marginTop={8} />
                <TextDetail label={"Unit Price: $"} value={unit_price} marginTop={8} />
                <TextDetail label={"Group Description: "} value={group_description} marginTop={8} />
            </AnimatedOpacity>
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
                maxHeight={(!isScreenLarge) ? (containerHeight * 1.6) : (containerHeight * 2.25)}
                isActive={isAnimatedTextBoxActive}>

                <View style={styles.textContainer}>{LeftContent}{BottomContent}</View>
                <View style={styles.buttonContainer}>{RightContent}</View>

            </AnimatedContainer>
        )
    }
}


AnimatedTextBox.propTypes = {

}

AnimatedTextBox.defaultProps = {

}

// COMPONENT SPECIFIC UI-ELEMENTS 

function TextDetail(props) {

    const { label, value, marginTop, multiLine } = props

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: marginTop, }}>
            <Text style={[Fonts.subHeading, { color: 'black', fontWeight: 'bold' }]}>{label}</Text>
            <Text style={[Fonts.subHeading, { color: BACKGROUND_DARK_GREY, flex: 1 }]} numberOfLines={2}> {value}</Text>
        </View>

    )
}