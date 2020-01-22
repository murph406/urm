import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight, } from './AnimatedTextBox-Styles'
import { AnimatedContainer, AnimatedColor, AnimatedRotation, AnimatedOpacity } from '../../util/Animated-Utility'
import { Fonts, isScreenLarge, DeviceWidth } from '../../theme/styling'
import { SECONDARY_DARK, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY, BLUE_LIGHT } from '../../theme/colors'
import IconButton from '../../ui-elements/icon-button'


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
        const { item_description, brand, unit_price, size, pack } = this.props.data

        return (
            <View style={{ backgroundColor: 'white', borderRadius: 8, paddingLeft: 16, paddingVertical: 16 }}>
                <Text style={[Fonts.display, { color: 'black', width: DeviceWidth * .6 }]} numberOfLines={(isScreenLarge) ? 1 : 2}>{item_description}</Text>

                <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY }]}>{brand}</Text>

                <View style={{ position: 'absolute', right: 16, top: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Fonts.display, { color: 'black' }]}> ${unit_price}</Text>
                    <Text style={{ color: BACKGROUND_LIGHT_GREY, fontFamily: 'regular', fontSize: 16, marginTop: 4 }}>{pack} @ {size}</Text>
                </View>
            </View>
        )
    }

    getBottomContent = () => {
        const { size, pack, group_description, unit_price, brand, item_code } = this.props.data
        const { onSelectedItem } = this.props
        const { isAnimatedTextBoxActive } = this.state

        const iconDimension = (isScreenLarge) ? 42 : 32

        return (
            <AnimatedOpacity
                inputRange={[.3, .7]}
                outputRange={[0, 1]}
                isActive={isAnimatedTextBoxActive}
            >
                {/* <View style={{ height: 236, paddingTop: 32 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-evenly' }}>
                        <TextDetail label={"Brand "} value={brand} marginTop={8} />
                        <TextDetail value={pack} marginTop={8} label={"Pack "} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-evenly' }}>
                        <TextDetail value={size} marginTop={8} label={"Size "} />
                        <TextDetail label={"Code "} value={'#' + item_code} marginTop={8} />
                    </View>

                    <TouchableOpacity
                        activeOpacity={.7}
                        style={{ backgroundColor: SECONDARY, height: 60, width: DeviceWidth * .65, borderRadius: 20, marginTop: 64, alignSelf: 'center', justifyContent: 'center' }}
                        onPress={onSelectedItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/icons/cart-icon.png')} style={{ height: iconDimension, width: iconDimension }} />
                            <View style={{ height: 1, width: 32 }} />
                            <Text style={[Fonts.display, { textAlign: 'center', color: 'white' }]}>ADD TO CART</Text>
                        </View>
                    </TouchableOpacity> */}

                    <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <View style={{ flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', padding: 16}}>
                            <TextDetail label={"Brand "} value={brand} marginTop={32} />
                            <TextDetail label={"Item Code "} value={'#' + item_code} marginTop={8} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', padding: 16}}>
                            <TextDetail value={size} marginTop={8} label={"Size "} />
                            <TextDetail value={pack} marginTop={8} label={"Pack "} />
                        </View>
                    </View>

                    {/* This is the right view where u can choose to go to order */}
                    <TouchableOpacity style={{flex:1, backgroundColor: BLUE_LIGHT, justifyContent: 'center', alignItems: 'center', zIndex: 1000}} onPress={this.props.onSelectedItem}>  
                        <Image style={{tintColor: 'white'}} source={require('../../../assets/icons/order.png')} />
                        <Text style={{textAlign:'center',fontFamily:'bold',fontSize:24, marginTop: 16,color:'white' }}>Order</Text>
                    </TouchableOpacity>

                </View>

            </AnimatedOpacity>
        )
    }

    render() {
        const { isAnimatedTextBoxActive } = this.state
        const TopContent = this.getTopContent()
        const BottomContent = this.getBottomContent()
        const maxHeight = (isScreenLarge === true) ? containerHeight * 2.6 : containerHeight * 3.8

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

    const { label, value, marginTop } = props

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: marginTop }}>
            <Text style={[Fonts.display, { color: 'black', fontWeight: 'bold' }]}>{label} </Text>
            <Text style={[Fonts.display, { color: BACKGROUND_DARK_GREY, }]} numberOfLines={2}>{value}</Text>
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