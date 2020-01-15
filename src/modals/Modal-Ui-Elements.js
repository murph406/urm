import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, StatusBar, Text } from 'react-native';

import IconButton from '../ui-elements/icon-button'
import { DeviceWidth, DeviceHeight, HeaderHeight, isScreenLarge, Fonts } from '../theme/styling';
import { BACKGROUND_GREY, BACKGROUND_DARK_GREY, BACKGROUND_LIGHT_GREY, SECONDARY } from '../theme/colors'


const filterIconSize = (isScreenLarge) ? 32 : 28

export function ModalContainer(props) {

    const { children, isRightIconDisabled, headerText, rightOnPress, leftOnPress, rightIconSource, leftIconSource } = props

    return (
        <View style={styles.modalContainer}>
            <StatusBar hidden={true} />
            <View style={styles.headerContainer}>
                <IconButton
                    iconSource={leftIconSource}
                    iconDimensions={filterIconSize}
                    primaryColor={BACKGROUND_LIGHT_GREY}
                    secondaryColor={BACKGROUND_DARK_GREY}
                    onPress={leftOnPress}
                />
                <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY, paddingTop: 12 }]}>{headerText}</Text>
                {(!isRightIconDisabled)
                    ? <IconButton
                        iconSource={rightIconSource}
                        iconDimensions={filterIconSize}
                        primaryColor={BACKGROUND_LIGHT_GREY}
                        secondaryColor={BACKGROUND_DARK_GREY}
                        onPress={rightOnPress}
                    />
                    : null}

            </View>

            {children}
        </View>
    )
}

export function TextButton(props) {
    const [isIconPressed, toggleButton] = useState(false);
    const { text, onPress, secondaryColor, primaryColor } = props;

    function toggleButtonBackground() {
        toggleButton(!isIconPressed)
    }

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={toggleButtonBackground}
            onPressOut={toggleButtonBackground}>
            <View style={[styles.submitButton, { backgroundColor: (isIconPressed) ? secondaryColor : primaryColor }]}>
                <Text style={Fonts.headline}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_GREY
    },
    headerContainer: {
        width: DeviceWidth,
        height: HeaderHeight * 1.5,
        backgroundColor: BACKGROUND_GREY,
        paddingTop: HeaderHeight * .5,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    submitButton: {
        height: 54,
        flex: 1,
        backgroundColor: SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden'
    },
})