import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text, StatusBar, ScrollView } from 'react-native'
import IconButton from '../ui-elements/icon-button'

import { BACKGROUND_GREY, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY, SECONDARY } from '../theme/colors';
import { isScreenLarge, HeaderHeight, DeviceWidth, Fonts } from '../theme/styling'

const filterIconSize = (isScreenLarge) ? 32 : 28

class FilterModal extends Component {
    constructor() {
        super()
        this.state = {
            catagories: [
                { type: 'Type' },
                { type: 'Brand' },
            ]
        }
    }

    getHeaderDetail() {

        const { onExitModal } = this.props

        let contents = (
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
        )

        return contents
    }

    getBodyDetail() {
        const { } = this.props


        let contents = (
            <ScrollView style={{}}>
                <FilterHeaderDetail label={'Type'}>

                </FilterHeaderDetail>
                <FilterHeaderDetail label={'Brand'}>

                </FilterHeaderDetail>



            </ScrollView>
        )

        return contents

    }

    render() {
        const HeaderDetail = this.getHeaderDetail()
        const BodyDetail = this.getBodyDetail()
        const { onExitModal } = this.props

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />

                {HeaderDetail}

                <View style={{ flex: 1 }}>{BodyDetail}</View>

                <View style={styles.submitButtonPosition}>
                    <SubmitButton
                        onPress={() => console.log('bruh')}
                        text={'Submit'} />
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
    },
    lineBreak: {
        borderBottomWidth: 1,
        borderBottomColor: BACKGROUND_LIGHT_GREY,
        marginBottom: 32,
        // borderBottomEndRadius: 8
    },
    submitButton: {
        height: 54,
        flex: 1,
        backgroundColor: SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden'
    },
    submitButtonPosition: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        left: 32
    }
})

export default FilterModal;



// COMPONENT SPECIFIC UI-ELEMENTS 

function FilterHeaderDetail(props) {

    const { label, children } = props

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }}>
            <View style={styles.lineBreak} />
            <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY, alignSelf: 'center' }]}>{label}</Text>
            {children}

        </View>
    )
}

function SubmitButton(props) {
    const { text, onPress } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.7}
            style={styles.submitButton}>
            <Text style={Fonts.headline}>{text}</Text>
        </TouchableOpacity>
    )
}