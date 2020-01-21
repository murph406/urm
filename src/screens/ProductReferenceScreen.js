import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, ActivityIndicator, Alert, AsyncStorage, TouchableOpacity } from 'react-native';

import IconButton from '../ui-elements/icon-button';
import FilterModal from '../modals/Filter-Modal-Component'
import SearchField from '../ui-elements/search-field';

import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_LIGHT_GREY } from '../theme/colors';
import { AnimatedTextBox } from '../components/index';
import { isScreenLarge, Fonts, DeviceHeight, DeviceWidth } from '../theme/styling';
import { AnimatedPositionAbsolute } from '../util/Animated-Utility'

const filterIconSize = (isScreenLarge) ? 32 : 28

class ProductReferenceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Reference',
      headerRight: (
        <View style={{ marginRight: 16 }}>
          <IconButton
            iconSource={require('../../assets/icons/filter-icon.png')}
            iconDimensions={filterIconSize}
            primaryColor={SECONDARY}
            secondaryColor={SECONDARY_DARK}
            onPress={() => {
              navigation.getParam('toggleFilterModal')();
            }}
          />
        </View>
      ),
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      masterItemList: [],
      isFilterModalVisible: false,
      isItemSelected: false,
      isActivityIndicatorVisible: true,
      selectedItem: 'null'
    }
  }

  componentDidMount() {
    this.setNavigationParams()
    this.retrieveItems()

  }

  async retrieveItems() {
    try {
      const retrievedItems = await AsyncStorage.getItem('data');
      const items = JSON.parse(retrievedItems);

      this.setState({ items: items, masterItemList: items, isActivityIndicatorVisible: false })

    } catch (err) {
      console.log(err.message);

      Alert.alert('Error', "Problem retrieving data", [{ text: 'Ok' }])
      this.setState({ isActivityIndicatorVisible: false })
    }
  }

  setNavigationParams = () => {
    const { navigation } = this.props

    navigation.setParams({
      toggleFilterModal: this.toggleFilterModal
    })
    // ^^^ Connects the toggleFilterModal function to react-navigation's header functionally. 
  }

  filterBySearch = (text) => {
    const { masterItemList } = this.state
    text = text.toUpperCase()

    let filteredItems = masterItemList.filter((x, index) => {
      const name = (x.item_description == null) ? '' : x.item_description
      const brand = (x.brand == null) ? '' : x.brand
      const code = (x.item_code == null) ? '' : x.item_code
      const group = (x.group_description == null) ? '' : x.group_description

      if (name.includes(text) === true || brand.includes(text) === true || code.includes(text) === true || group.includes(text) === true) {
        return true
        // Refactor this ^^^
      }
      return false
    })
    this.setState({ items: filteredItems })
  }

  filterByOptions = (filterItemsArray) => {
    const { masterItemList } = this.state
    let filteredData = []

    filterItemsArray.forEach((filterOption, index) => {
      const { item } = filterOption

      let filteredItems = masterItemList.filter((x, i) => {
        const group = (x.group_description == null) ? '' : x.group_description
        const brand = (x.brand == null) ? '' : x.brand

        if (brand.includes(item) === true || group.includes(item) === true) {
          return true
        }
        return false
      })
      filteredData = [...filteredData, ...filteredItems]
    })

    this.setState({ items: filteredData })
  }

  resetDefaultData = () => {
    const { masterItemList } = this.state

    this.setState({ items: masterItemList })
  }

  onSelectedItem = (item) => () => {
    this.toggleScreenPosition()

    this.setState({ selectedItem: item })
  }

  onSubmitOrder = () => {
    this.toggleScreenPosition()
  }

  toggleScreenPosition = () => {
    const { isItemSelected } = this.state

    this.setState({ isItemSelected: !isItemSelected })
  }

  toggleFilterModal = () => {
    const { isFilterModalVisible } = this.state
    const modalFlag = !isFilterModalVisible

    this.setState({ isFilterModalVisible: modalFlag })
  }

  getLeftContent = () => {
    const { items } = this.state
    const numberOfResultsDetail = this.getNumberOfResultsDetail()
    const emptyFlatlistVeiw = this.getEmptyFlatlistView()

    const contents = (
      <View style={{ flex: 1, width: DeviceWidth }}>
        <FlatList
          style={{ paddingTop: 16 }}
          ListHeaderComponent={numberOfResultsDetail}
          ListEmptyComponent={emptyFlatlistVeiw}
          ListFooterComponent={() => <View style={{ flex: 1, height: 120 }} />}
          ItemSeparatorComponent={() => <View style={{ flex: 1, height: .5, margin: 8, }} />}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <AnimatedTextBox
              onSelectedItem={this.onSelectedItem(item)}
              data={item} />
          )} />
      </View>

    )

    return contents
  }

  getRightContent = () => {
    const { selectedItem } = this.state

    let text = selectedItem?.item_description?.toLowerCase()

    let contents = (
      <View style={{ flex: 1, width: DeviceWidth, paddingTop: 80 }}>
        <View style={styles.submitOrderContainer}>
          <TouchableOpacity
            style={{ height: 90, width: DeviceWidth }}
            onPress={this.onSubmitOrder}>
            <Text style={Fonts.headline, { color: 'black' }}>{text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    return contents
  }

  getEmptyFlatlistView() {

    let { isActivityIndicatorVisible } = this.state

    let contents = (
      <View style={styles.emptyFlatlistContainer}>
        {(isActivityIndicatorVisible)
          ? <ActivityIndicator size={'large'} color={BACKGROUND_LIGHT_GREY} />
          :
          <>
            <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY }]}>Sorry, No Results</Text>
          </>
        }
      </View>
    )

    return contents
  }

  getNumberOfResultsDetail() {
    const { items } = this.state

    let text = items?.length

    let contents = (
      <View style={{ alignSelf: 'center', paddingBottom: 16 }}>
        <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY }]}>Number of Results: {text}</Text>
      </View>
    )

    return contents
  }

  render() {

    const { isFilterModalVisible, masterItemList, isItemSelected } = this.state;
    const leftContent = this.getLeftContent()
    const rightContent = this.getRightContent()

    return (
      <View style={styles.container} >
        <SearchField
          onChangeText={this.filterBySearch}
          showCancelButton={true}
          placeHolderText={'Search Here...'}
          textColor={BACKGROUND_LIGHT_GREY}
          primaryColor={'white'}
          secondaryColor={BACKGROUND_GREY} />

        <AnimatedPositionAbsolute
          duration={800}
          inputRange={{ bottomInitial: 0, leftInitial: 0, rightInitial: 0, topInitial: 40 }}
          outputRange={{ bottomFinal: 0, leftFinal: -DeviceWidth, rightFinal: -DeviceWidth, topFinal: 40 }}
          isActive={isItemSelected}>
          <View style={{ flex: 1, width: DeviceWidth }}>{leftContent}</View>
        </AnimatedPositionAbsolute>

        <AnimatedPositionAbsolute
          duration={800}
          inputRange={{ bottomInitial: 0, leftInitial: DeviceWidth, rightInitial: DeviceWidth * 2, topInitial: 40 }}
          outputRange={{ bottomFinal: 0, leftFinal: 0, rightFinal: DeviceWidth, topFinal: 40 }}
          isActive={isItemSelected}>
          <View style={{ flex: 1, width: DeviceWidth }}>{rightContent}</View>
        </AnimatedPositionAbsolute>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isFilterModalVisible}>
          <FilterModal
            data={masterItemList}
            onResetFilterOptions={this.resetDefaultData}
            onFilterChanges={this.filterByOptions}
            onExitModal={this.toggleFilterModal}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
  },
  emptyFlatlistContainer: {
    height: DeviceHeight * .6,
    width: DeviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitOrderContainer: {
    borderRadius: 8,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16,
    paddingTop: 16
  }
})

export default ProductReferenceScreen;
