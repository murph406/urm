import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth } from '../../theme/styling'
import { SECONDARY, SECONDARY_DARK } from '../../theme/colors'

const containerHeight = DeviceHeight * .15
const buttonDimensions = 50

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,
    },
    buttonContainer: {
        height: buttonDimensions,
        width: buttonDimensions,
        borderRadius: buttonDimensions * .5,
        backgroundColor: SECONDARY,
        overflow: 'hidden',
        zIndex: 1

    },
    buttonPosition: {
        position: 'absolute',
        top: (containerHeight * .5) - (buttonDimensions * .5),
        right: 16
    },
    textPosition: {
        width: DeviceWidth * .7,
    },
    descriptionTextPosition:{
        position: 'absolute', 
        bottom: 32, 
        right: 64, 
        left: 16, 
        zIndex: 0
    }
});

export { containerHeight, styles }