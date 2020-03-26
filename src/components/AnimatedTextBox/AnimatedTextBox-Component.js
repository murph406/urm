import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet, ColorPropType } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight, } from './AnimatedTextBox-Styles'
import { AnimatedContainer, AnimatedColor, AnimatedRotation, AnimatedOpacity } from '../../util/Animated-Utility'
import { Fonts, isScreenLarge, DeviceWidth } from '../../theme/styling'
import { SECONDARY_DARK, BACKGROUND_LIGHT_GREY, BLUE_LIGHT } from '../../theme/colors'
import IconButton from '../../ui-elements/icon-button'

let maxHeight = (isScreenLarge === true) ? containerHeight * 3 : containerHeight * 3.8

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

    getTopContent = () => {
        const { item_description, brand, unit_price, billing_price, pack} = this.props.data
        const { isAnimatedTextBoxActive } = this.state
        const iconDimension = 28
        return (
            <View style={{ paddingVertical: 32, paddingHorizontal: 32, borderBottomWidth: 4, borderBottomColor: '#f5f5f5' }}>
                <View style={{ flexDirection: 'row', }}>
                    <AnimatedRotation
                        isActive={isAnimatedTextBoxActive}
                        initialDeg={'45deg'}
                        finalDeg={'0deg'}>
                        <Image
                            style={{ height: iconDimension, width: iconDimension, tintColor: 'black' }}
                            source={require('../../../assets/icons/X-icon-white.png')}
                        />
                    </AnimatedRotation>

                    <View style={{ marginLeft: 32 }}>
                        <Text style={[Fonts.display, { color: 'black', width: DeviceWidth * .6 }]} numberOfLines={(isScreenLarge) ? 1 : 2}>{item_description}</Text>
                        <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, marginTop: 4 }]}>{brand}</Text>
                    </View>
                </View>

                <View style={{ position: 'absolute', right: 32, top: 32, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Fonts.display, { color: 'black' }]}> ${billing_price}</Text>
                    <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, marginTop: 4 }]}>{pack} @ ${unit_price.toFixed(2)}</Text>
                </View>
            </View>
        )
    }

    getBottomContent = () => {
        const { size, pack,brand, item_code, check_digit } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        return (
            <AnimatedOpacity
                inputRange={[.3, .7]}
                outputRange={[0, 1]}
                isActive={isAnimatedTextBoxActive}
            >
                <View style={{ flexDirection: 'row', height: maxHeight - containerHeight }}>
                    <View style={{ flex: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'space-between', padding: 16 }}>
                            <TextDetail label={"Brand "} value={brand.trim()} marginTop={32} />
                            <TextDetail label={"Item Code "} value={'#' + item_code} marginTop={8} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'space-between', padding: 16 }}>
                            <TextDetail value={size} marginTop={8} label={"Size "} />
                            <TextDetail value={pack} marginTop={8} label={"Pack "} />
                            <TextDetail value={check_digit} marginTop={8} label={"Check Digit "} />
                        </View>
                    </View>

                    {/* This is the right view where u can choose to go to order */}
                    {/*<TouchableOpacity
                        activeOpacity={.7}
                        style={{ flex: 1, backgroundColor: BLUE_LIGHT, justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
                        onPress={this.props.onSelectedItem}>
                        <Image style={{ tintColor: 'white', height: 64, width: 64, }} source={require('../../../assets/icons/order.png')} />
                        <Text style={{ textAlign: 'center', fontFamily: 'bold', fontSize: 24, marginTop: 16, color: 'white' }}>Order</Text>
                    </TouchableOpacity> */}


                </View>

            </AnimatedOpacity>
        )
    }

    render() {
        const { isAnimatedTextBoxActive } = this.state
        const TopContent = this.getTopContent()
        const BottomContent = this.getBottomContent()

        return (
            <AnimatedContainer
                minHeight={containerHeight}
                maxHeight={maxHeight}
                isActive={isAnimatedTextBoxActive}>

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.textContainer}
                    onPress={this.goAnimatedTextBox}>
                    {TopContent}
                    {BottomContent}
                </TouchableOpacity>

            </AnimatedContainer>
        )
    }
}

// COMPONENT SPECIFIC UI-ELEMENTS 

function TextDetail(props) {

    const { label, value } = props

    return (
        <View style={{ padding: 8,  alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20, color: 'rgba(50,50,50,0.7)', fontFamily: 'regular' }}>{label}</Text>
            <Text style={{ fontSize: 28, fontFamily: 'bold', color: 'black', }}>{value}</Text>
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