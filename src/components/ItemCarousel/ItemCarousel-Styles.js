import { StyleSheet } from 'react-native';
import { DeviceHeight, DeviceWidth } from '../../theme/styling'
import { SECONDARY, SECONDARY_DARK, GREEN, RED } from '../../theme/colors'

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 8 },
        shadowRadius: 12,
        shadowOpacity: 0.5,
        marginBottom: 32,
        marginHorizontal: 16,
        marginTop: 16,
    },
    imageContainer: {
        flex: 1,
        paddingHorizontal: 16
    },
    bottomView: {
        backgroundColor: RED,
        padding: 16,
        justifyContent: 'space-around',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
      emptyFlatlistContainer: {
        height: DeviceHeight * .6,
        width: DeviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }
});

export { styles, DeviceHeight, DeviceWidth }