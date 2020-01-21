import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight, } from './AnimatedTextBox-Styles'
import { AnimatedContainer, AnimatedColor, AnimatedRotation, AnimatedOpacity, AnimatedText, AnimatedPositionAbsolute } from '../../util/Animated-Utility'
import { Fonts, isScreenLarge } from '../../theme/styling'
import { SECONDARY, BACKGROUND_DARK_GREY, RED, GREEN, SECONDARY_LIGHT } from '../../theme/colors'

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
        const ORANGE = '#f57c00'
        return(
            <View style={{ backgroundColor: RED, borderRadius: 8, paddingTop: 8, paddingLeft: 8, paddingBottom: 16, borderBottomColor: 'rgba(100,100,100,0.5)', borderBottomWidth: 4 }}>
                <Text
                    style={[Fonts.headline, { color: 'white', fontSize: 24 }]} 
                    numberOfLines={(isScreenLarge)? 1 : 2}>{item_description}
                </Text>
                {/* This is just to take up space... idk why i cant figure out the padding otherwise */}
                <Text style={{color:'transparent'}}>asdfasdfasdf</Text>

                <Text style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'bold', fontSize: 20}}>
                    {brand}
                </Text>
                <View style={{position: 'absolute', right: 16, top: 12, flex: 1, justifyContent:'center', alignItems: 'center'}}>    
                    <Text style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'bold', fontSize: 24}}>
                        ${unit_price}
                    </Text>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'regular', fontSize: 16, marginTop: 4}}>
                        {pack} @ {size}
                    </Text>
                </View>
            </View>
        )
    }

    getRightContent = () => {
        const { isAnimatedTextBoxActive } = this.state
        const { onSelectedItem } = this.props
        const iconSize = 24

        let contents = (
            <>
                {/* <View style={styles.topButtonPosition}>
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
                </View> */}

                {/* <AnimatedPositionAbsolute
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
                </AnimatedPositionAbsolute> */}
            </>

        )

        return contents
    }

    getBottomContent = () => {
        const { size, pack, group_description, unit_price, brand, item_code } = this.props.data
        const { isAnimatedTextBoxActive } = this.state

        return(
            <AnimatedOpacity
                inputRange={[.3, .7]}
                outputRange={[0, 1]}
                isActive={isAnimatedTextBoxActive} 
            >
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
                    <TouchableOpacity style={{flex:1, backgroundColor: SECONDARY, justifyContent: 'center', alignItems: 'center', zIndex: 1000}} onPress={this.props.onSelectedItem}>  
                        <Image style={{tintColor: 'white'}} source={require('../../../assets/icons/order.png')} />
                    </TouchableOpacity>
                </View>

            </AnimatedOpacity>
        )
    }

    render() {
        const { isAnimatedTextBoxActive } = this.state
        const TopContent = this.getTopContent()
        const RightContent = this.getRightContent()
        const BottomContent = this.getBottomContent()
        const maxHeight = (isScreenLarge === true) ? containerHeight * 3.2 : containerHeight * 4.2

        return (
            <AnimatedContainer
                minHeight={containerHeight}
                maxHeight={maxHeight}
                isActive={isAnimatedTextBoxActive}>

                <TouchableOpacity style={styles.textContainer} onPress={this.goAnimatedTextBox}>
                    {TopContent}
                    {BottomContent}
                </TouchableOpacity>
                {/* <View style={styles.buttonContainer}>{RightContent}</View> */}

            </AnimatedContainer>
        )
    }
}

// COMPONENT SPECIFIC UI-ELEMENTS 

function TextDetail(props) {

    const { label, value, marginTop } = props

    return(
        <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', fontFamily: 'regular'}}>{label}</Text>
            <Text style={{ fontSize: 32, fontFamily:'bold', color:'white', }}>{value}</Text>
        </View>
    )
    // return (
        // <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: marginTop, }}>
        //     <Text style={[Fonts.subHeading, { color: 'black', fontWeight: 'bold' }]}>{label}</Text>
        //     <Text style={[Fonts.subHeading, { color: BACKGROUND_DARK_GREY, flex: 1 }]} numberOfLines={2}> {value}</Text>
        // </View>

    // )
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