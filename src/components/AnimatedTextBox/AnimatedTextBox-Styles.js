import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth } from '../../theme/styling'
import { SECONDARY, SECONDARY_DARK } from '../../theme/colors'

const containerHeight = DeviceHeight * .12
const buttonDimensions = 50

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,
        paddingTop: 16
    },
    textContainer: { 
        flex: 6,
        paddingRight: 16,
        paddingTop: 14
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