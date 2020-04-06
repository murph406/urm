import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { BACKGROUND_GREY, BACKGROUND_LIGHT_GREY, SECONDARY_DARK, SECONDARY } from '../theme/colors';
import { HeaderHeight, DeviceWidth } from '../theme/styling'
import { ModalContainer, TextButton } from './Modal-Ui-Elements'
import { TabBar, TabRoute } from './TabBar'

class FilterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryData: [],
            selectedFilterGroups: [],
            selectedFilterCategories: []
        }
    }

    componentDidMount() {
        this.setData()
    }

    async setData() {
        const { groups, categories } = this.props
        console.log(categories, groups)

        this.setState({ categoryData: categories, selectedFilterGroups: groups })
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
            const { category } = item

            initialData.push(category)
        });

        return initialData
    }

    filterDuplicates(array) {
        return Promise.resolve(array.filter((x, index) => {
            return array.indexOf(x) >= index
            // returns true or false, if true item will be added to new index and returned
        }))
    }

    setFilterCategories = async (item) => {

        const { selectedFilterCategories } = this.state
        console.log("SELECTED OPTION",selectedFilterCategories)
        if (item.isSelected === true) {
            selectedFilterCategories.push(item)

        } else {
            let array = await this.removeFilter(selectedFilterCategories, item)

            this.setState({ selectedFilterCategories: array })
        }
    }
    setFilterGroups = async (item) => {

        const { selectedFilterGroups } = this.state
        console.log("SELECTED Groups",selectedFilterGroups)
        if (item.isSelected === true) {
            selectedFilterGroups.push(item)

        } else {
            let array = await this.removeFilterGroup(selectedFilterGroups, item)

            this.setState({ selectedFilterGroups: array })
        }
    }
    removeFilterGroup(array, item) {
        return Promise.resolve(array.filter((x, index) => {
            return (x.item === item.item) ? false : true
        }))
    }

    removeFilter(array, item) {
        return Promise.resolve(array.filter((x, index) => {
            return (x.item === item.item) ? false : true
        }))
    }

    onApplyFilter = () => {
        const { onExitModal, onFilterChanges } = this.props
        const { selectedFilterCategories, selectedFilterGroups } = this.state

        let filterCategoriesLength = selectedFilterCategories.length
        let filterGroupsLength = selectedFilterGroups.length

        if (filterCategoriesLength != 0 || filterGroupsLength != 0) {
            console.log("HIT", selectedFilterCategories)
            onFilterChanges(selectedFilterCategories, selectedFilterGroups)
        }
        onExitModal()
    }

    resetFilterOptions = () => {
        const { onExitModal, onResetFilterOptions } = this.props

        onResetFilterOptions()
        onExitModal()
    }

    render() {
        const { onExitModal } = this.props
        const { categoryData, selectedFilterGroups } = this.state

        return (
            <ModalContainer
                leftOnPress={onExitModal}
                rightOnPress={this.resetFilterOptions}
                leftIconSource={require('../../assets/icons/X-icon-white.png')}
                rightIconSource={require('../../assets/icons/reset-icon-white.png')}
                headerText={'Filter'}>

                <ScrollableTabView
                    style={{ marginTop: 20, marginHorizontal: 32, }}
                    initialPage={0}
                    renderTabBar={() =>
                        <TabBar />
                    }>
                    <TabRoute
                        tabLabel={'Groups'}
                        data={selectedFilterGroups}
                        filterButtonOnPress={(filter) => this.setFilterGroups({ label: 'group_description', ...filter })}
                    />
                    <TabRoute
                        tabLabel={'Categories'}
                        data={categoryData}
                        filterButtonOnPress={(filter) => this.setFilterCategories({ label: 'category', ...filter })}
                    />
                </ScrollableTabView>

                <View style={styles.submitButtonPosition}>
                    <TextButton
                        text={'Apply'}
                        secondaryColor={SECONDARY_DARK}
                        primaryColor={SECONDARY}
                        onPress={this.onApplyFilter}
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
})

export default FilterModal;