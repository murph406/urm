import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native'

import { BACKGROUND_GREY, BACKGROUND_LIGHT_GREY, SECONDARY_DARK, SECONDARY } from '../theme/colors';
import {  HeaderHeight, DeviceWidth, Fonts } from '../theme/styling'
import { ModalContainer, TextButton } from './Modal-Ui-Elements'

class FilterModal extends Component {
    constructor() {
        super()
        this.state = {
        }
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
        const BodyDetail = this.getBodyDetail()
        const { onExitModal } = this.props

        return (
            <ModalContainer
                rightOnPress={onExitModal}
                leftOnPress={onExitModal}
                rightIconSource={require('../../assets/icons/reset-icon-white.png')}
                leftIconSource={require('../../assets/icons/X-icon-white.png')}
                headerText={'Filter'}>

                <View style={{ flex: 1 }}>{BodyDetail}</View>

                <View style={styles.submitButtonPosition}>
                    <TextButton
                        text={'Apply'}
                        secondaryColor={SECONDARY_DARK}
                        primaryColor={SECONDARY}
                        onPress={() => console.log('bruh')}
                    />
                </View>
            </ModalContainer>
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
