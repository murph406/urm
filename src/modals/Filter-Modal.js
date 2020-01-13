import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native'
import IconButton from '../ui-elements/icon-button'

import { BACKGROUND_GREY, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY } from '../theme/colors';
import { isScreenLarge, HeaderHeight, DeviceWidth, Fonts } from '../theme/styling'

const filterIconSize = (isScreenLarge) ? 32 : 28

class FilterModal extends Component {
    constructor() {
        super()
        this.state = {
            catagories : [
                {type: ''},
                {type: ''},
                {type: ''}
            ]
        }
    }

    render() {

        const { onExitModal } = this.props

        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={styles.headerContainer}>
                    <IconButton
                        iconSource={require('../../assets/X-icon-white.png')}
                        iconDimensions={filterIconSize}
                        primaryColor={BACKGROUND_LIGHT_GREY}
                        secondaryColor={BACKGROUND_DARK_GREY}
                        onPress={onExitModal}
                    />
                    <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY, paddingTop: 12 }]}>Filter</Text>
                    <IconButton
                        iconSource={require('../../assets/icons/reset-icon-white.png')}
                        iconDimensions={filterIconSize}
                        primaryColor={BACKGROUND_LIGHT_GREY}
                        secondaryColor={BACKGROUND_DARK_GREY}
                        onPress={onExitModal}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
    }
})

export default FilterModal;