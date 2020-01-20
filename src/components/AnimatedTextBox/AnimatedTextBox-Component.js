import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight, } from './AnimatedTextBox-Styles'
import { AnimatedContainer, AnimatedColor, AnimatedRotation, AnimatedOpacity, AnimatedText, AnimatedPositionAbsolute } from '../../util/Animated-Utility'
import { Fonts, isScreenLarge, DeviceHeight } from '../../theme/styling'
import { SECONDARY, BACKGROUND_DARK_GREY, RED, GREEN } from '../../theme/colors'

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

        const { item_description } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        let contents = (
            <View>
                <AnimatedText
                    fontStyle={Fonts.headline}
                    textColor={'black'}
                    isActive={isAnimatedTextBoxActive} >
                    {item_description}
                </AnimatedText>

            </View>
        )

        return contents
    }

    getRightContent = () => {

        const { isAnimatedTextBoxActive } = this.state
        const { onSelectedItem } = this.props
        const iconSize = 24

        let contents = (
            <>
                <View style={styles.topButtonPosition}>
                    <AnimatedButton
                        onPress={this.goAnimatedTextBox}
                        initialColor={SECONDARY}
                        finalColor={RED}
                        initialDeg={'45deg'}
                        finalDeg={'0deg'}
                        iconSize={iconSize}
                        isActive={isAnimatedTextBoxActive}
                        iconSource={require('../../../assets/icons/X-icon-white.png')}
                    />
                </View>

                <AnimatedPositionAbsolute
                    duration={300}
                    inputRange={{ bottomInitial: 0, rightInitial: 0, leftInitial: 0, topInitial: 0 }}
                    outputRange={{ bottomFinal: 0, rightFinal: 0, leftFinal: 0, topFinal: containerHeight * 2.4 }}
                    isActive={isAnimatedTextBoxActive}>
                    <AnimatedButton
                        onPress={onSelectedItem}
                        initialColor={SECONDARY}
                        finalColor={GREEN}
                        initialDeg={'90deg'}
                        finalDeg={'0deg'}
                        iconSize={iconSize}
                        isActive={isAnimatedTextBoxActive}
                        iconSource={require('../../../assets/icons/arrow-icon-white.png')}
                    />
                </AnimatedPositionAbsolute>
            </>

        )

        return contents
    }

    getBottomContent = () => {

        const { size, pack, group_description, unit_price, brand, item_code } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        contents = (
            <AnimatedOpacity
                inputRange={[.3, .7]}
                outputRange={[0, 1]}
                isActive={isAnimatedTextBoxActive} >
                <TextDetail label={"Brand: "} value={brand} marginTop={32} />
                <TextDetail label={"Code #: "} value={item_code} marginTop={8} />
                <TextDetail value={size} marginTop={8} label={"Size: "} />
                <TextDetail value={pack} marginTop={8} label={"Pack: "} />
                <TextDetail value={unit_price} marginTop={8} label={"Unit Price: $"} />
                <TextDetail value={group_description} marginTop={8} label={"Group Description: "} />
            </AnimatedOpacity>
        )

        return contents
    }

    render() {
        const { isAnimatedTextBoxActive } = this.state
        const LeftContent = this.getLeftContent()
        const RightContent = this.getRightContent()
        const BottomContent = this.getBottomContent()
        const maxHeight = (isScreenLarge === true)? containerHeight * 3.2 : containerHeight * 4

        return (
            <AnimatedContainer
                minHeight={containerHeight}
                maxHeight={maxHeight}
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

    const { label, value, marginTop } = props

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: marginTop, }}>
            <Text style={[Fonts.subHeading, { color: 'black', fontWeight: 'bold' }]}>{label}</Text>
            <Text style={[Fonts.subHeading, { color: BACKGROUND_DARK_GREY, flex: 1 }]} numberOfLines={2}> {value}</Text>
        </View>

    )
}

function AnimatedButton(props) {

    const { onPress, initialColor, finalColor, initialDeg, finalDeg, isActive, iconSource, iconSize } = props

    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={1}
            onPress={onPress}>
            <AnimatedColor
                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                initialColor={initialColor}
                finalColor={finalColor}
                isActive={isActive}>
                <AnimatedRotation
                    initialDeg={initialDeg}
                    finalDeg={finalDeg}
                    isActive={isActive}>
                    <Image
                        source={iconSource}
                        style={{ height: iconSize, width: iconSize }} />
                </AnimatedRotation>
            </AnimatedColor>
        </TouchableOpacity>
    )
}