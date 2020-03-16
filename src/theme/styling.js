
import { StyleSheet, Dimensions } from 'react-native'
import {
    PRIMARY,
    PRIMARY_LIGHT,
    SECONDARY,
    SECONDARY_DARK,
    BACKGROUND_LIGHT_GREY,
    BACKGROUND_DARK_GREY,
    GREEN
} from './colors';

const { width, height } = Dimensions.get("window");

const HeaderHeight = height * .1;
const MarginLength = 16;
const DeviceWidth = width;
const DeviceHeight = height;
const isScreenLarge = (DeviceHeight > 1000) ? true : false 
    // ^^^ if screen is larger than a Iphone X (height = 896) than it is considered a large device.

const Fonts = StyleSheet.create({
    headline: {
        fontFamily: 'bold',
        fontSize: (isScreenLarge)? 32 : 28,
    },
    display: {
        fontFamily: 'bold',
        fontSize: (isScreenLarge)? 24 : 20,
    },
    subHeading: {
        fontFamily: 'bold',
        fontSize: (isScreenLarge)? 18 : 14,
        color: BACKGROUND_LIGHT_GREY,
    },
    subHeadingWhite: {
        fontFamily: 'bold',
        fontSize: (isScreenLarge)? 18 : 14,
        color: 'white',
    },
    body: {
        color: BACKGROUND_DARK_GREY,
        fontSize: (isScreenLarge)? 14 : 10,
        fontFamily: 'bold'
    },
})

export { Fonts, HeaderHeight, MarginLength, DeviceHeight, DeviceWidth, isScreenLarge }
