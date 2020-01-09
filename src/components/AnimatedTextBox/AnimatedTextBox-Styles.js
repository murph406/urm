import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth } from '../../theme/styling'
import { SECONDARY, SECONDARY_DARK } from '../../theme/colors'

const containerHeight = DeviceHeight * .15

export default StyleSheet.create({
    container: {
        flex: 1,
        height: containerHeight,
        borderRadius: 4,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: SECONDARY_DARK,
        flexDirection: 'row',
    }
});