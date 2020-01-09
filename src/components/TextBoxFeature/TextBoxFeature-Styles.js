import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth } from '../../theme/styling'
import { SECONDARY } from '../../theme/colors'

const containerHeight = DeviceHeight * .15

export default StyleSheet.create({
    container: {
        flex: 1,
        height: containerHeight,
        borderRadius: 4,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    textLeftContainer: {
        flex: 1,
        padding: 16
    },
    featureContainer: {
        backgroundColor: SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        width: DeviceWidth * .25,
        height: containerHeight,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    icon: {
        justifyContent: 'center',
        height: 48,
        width: 48
    }
});