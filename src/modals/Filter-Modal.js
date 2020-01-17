import React, { Component, useState } from 'react'
import { View, StyleSheet, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';

import { BACKGROUND_GREY, BACKGROUND_LIGHT_GREY, SECONDARY_DARK, SECONDARY } from '../theme/colors';
import { HeaderHeight, DeviceWidth, Fonts, DeviceHeight } from '../theme/styling'
import { ModalContainer, TextButton } from './Modal-Ui-Elements'

class FilterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            brandData: [],
            typeData: [],
        }
    }

    componentDidMount() {
        this.setData()
    }

    async setData() {

        const { data } = this.props

        const typeData = this.filterDataByGroup(data)
        const brandData = this.filterDataByBrand(data)

        const filteredTypeData = await this.filterDuplicates(typeData)
        const filteredBrandData = await this.filterDuplicates(brandData)

        this.setState({ brandData: filteredBrandData, typeData: filteredTypeData })

    }

    filterDataByBrand(data) {
        let initialData = []

        data.forEach((item) => {
            const { brand } = item
            if (isNaN(brand) === true) {
                // Checks to see if brand is a number 
                initialData.push(brand)
            }
        });

        return initialData
    }

    filterDataByGroup(data) {
        let initialData = []

        data.forEach((item) => {
            const { group_description } = item

            initialData.push(group_description)
        });

        return initialData
    }

    filterDuplicates(array) {
        return Promise.resolve(array.filter((x, index) => {
            return array.indexOf(x) >= index
            // returns true or false, if true item will be added to new index and returned
        }))
    }



    getBodyDetail() {
        const { brandData, typeData,  } = this.state

        let contents = (
            <View style={{ flex: 1 }}>
                <FilterHeaderDetail
                    label={'Type'}
                    data={typeData} />
                <FilterHeaderDetail
                    label={'Brand'}
                    data={brandData} />
            </View>
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
    },
    filterButton: {
        width: 160,
        paddingHorizontal: 24,
        paddingVertical: 4,
        margin: 16,
        borderRadius: 16,
        justifyContent: 'center',
    }
})

export default FilterModal;



// COMPONENT SPECIFIC UI-ELEMENTS 

function FilterHeaderDetail(props) {
    const { label, data,  } = props

    return (
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <View style={styles.lineBreak} />
            <Text style={[Fonts.headline, { color: 'black', alignSelf: 'center' }]}>{label}</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: DeviceHeight * .32, }}>
                <FlatList
                    data={data}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => (
                        <FilterButton data={item} />
                    )} />
            </ScrollView>
        </View>
    )
}

function FilterButton(props) {
    const { data, onPress,  } = props
    const [isButtonSelected, toggleButton] = useState(false);

    function toggleActiveButton() {
        toggleButton(!isButtonSelected)
        onPress
    }

    return (
        <TouchableOpacity
            onPress={toggleActiveButton}
            activeOpacity={.7}
            style={[styles.filterButton, { backgroundColor: (isButtonSelected) ? SECONDARY : BACKGROUND_GREY }]}>
            <Text style={[Fonts.subHeadingWhite, { color: (isButtonSelected) ? 'white' : BACKGROUND_LIGHT_GREY, alignSelf: 'center' }]}>{data}</Text>
        </TouchableOpacity>
    )
}