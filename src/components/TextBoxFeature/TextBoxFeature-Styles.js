import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth, isScreenLarge } from '../../theme/styling'
import { SECONDARY } from '../../theme/colors'

const containerHeight = (isScreenLarge)? DeviceHeight * .12 : DeviceHeight * .15

export default StyleSheet.create({
    container: {
        flex: 1,
        height: containerHeight,
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    textLeftContainer: {
        flex: 1,
        padding: 32,
        justifyContent: 'center'
    },
    featureContainer: {
        backgroundColor: SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        width: (isScreenLarge)? DeviceWidth * .2 : DeviceWidth * .25,
        // height: containerHeight,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    icon: {
        justifyContent: 'center',
        height: 48,
        width: 48
    }
});