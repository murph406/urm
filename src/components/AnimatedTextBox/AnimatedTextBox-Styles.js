import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth } from '../../theme/styling'
import { SECONDARY, SECONDARY_DARK } from '../../theme/colors'
import * as Colors from '../../theme/colors';

const containerHeight = DeviceHeight * .1
const buttonDimensions = 50

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: 'rgb(120,120,120)',
        flexDirection: 'row',
        // padding: 16,
        // paddingTop: 16
    },
    titleContainer: {
        flex: 1
    },
    textContainer: { 
        flex: 8,
        borderRadius: 8,
        // paddingRight: 16,
        // paddingLeft: 16,
        // paddingTop: 8,
        alignItems: 'stretch'
    },
    buttonContainer: {
        flex: 1, 
        zIndex: 0
    },
    buttonStyle: {
        height: buttonDimensions,
        width: buttonDimensions,
        borderRadius: buttonDimensions * .5,
        backgroundColor: SECONDARY,
        overflow: 'hidden',
        zIndex: 1
    },
    topButtonPosition: {
        position: 'absolute', 
        top: 0,
        // bottom: 0, 
        right: 0, 
        left: 0, 
        zIndex: 100,
    },
});

export { containerHeight, styles }