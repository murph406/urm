
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

const Fonts = StyleSheet.create({
    display: {
       
    },
    headline: {
        fontFamily: 'bold',
        fontSize: 32,
        color: 'white',
    },
    body: {
        color: BACKGROUND_DARK_GREY,
        fontSize: 14,
        fontFamily: 'bold'
    },
    subHeading: {
        fontFamily: 'bold',
        fontSize: 18,
        color: 'white',
    },
    label: {
      
    },
})

export { Fonts, HeaderHeight }
