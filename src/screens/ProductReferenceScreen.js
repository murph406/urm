import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, ActivityIndicator, Alert, AsyncStorage, TouchableOpacity } from 'react-native';

import IconButton from '../ui-elements/icon-button';
import FilterModal from '../modals/Filter-Modal-Component'
import SearchField from '../ui-elements/search-field';
import SpecialItemSelector from '../components/special-item-selector';
import OrderCard from '../components/order-card';

import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY, BLUE_DARK, GREEN } from '../theme/colors';
import { AnimatedTextBox } from '../components/index';
import { isScreenLarge, Fonts, DeviceHeight, DeviceWidth, HeaderHeight } from '../theme/styling';
import { AnimatedPositionAbsolute } from '../util/Animated-Utility'

const filterIconSize = (isScreenLarge) ? 32 : 28

class ProductReferenceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation)
    return {
      header: null
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
      selectedItem: []
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
    const { selectedItem } = this.state
    this.toggleScreenPosition()

    let array = [...selectedItem, item]

    this.setState({ selectedItem: array })
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

  removeItem = (itemIndex) => () => {
    const { selectedItem } = this.state
    console.log(itemIndex, "INDEX")
    const array = selectedItem

    array.splice(itemIndex, 1)

    this.setState({ selectedItem: array })

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

    let contents = (
      <View style={{ flex: 1, width: DeviceWidth, }}>

        <FlatList
          style={{ paddingTop: 16 }}
          ItemSeparatorComponent={() => <View style={{ flex: 1, height: .5, margin: 8, }} />}
          ListHeaderComponent={() => <View style={{ flex: 1, height: 64 }}><Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, alignSelf: 'center', paddingTop: 16 }]}>Your Cart</Text></View>}
          ListFooterComponent={() => <View style={{ flex: 1, height: 160 }} />}
          data={selectedItem}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.orderItemContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[Fonts.display, { color: 'black' }]}>{item.item_description}</Text>
                  <TouchableOpacity
                    onPress={this.removeItem(index)}
                  >
                    <Text style={[Fonts.display, { color: SECONDARY }]}>Delete</Text>
                  </TouchableOpacity>
                </View>

                <SpecialItemSelector
                  item={item}
                // onIncrement={(quantity) => { item.quantity = quantity; calculateTotal() }} 
                />
              </View>
            )
          }} />

        <View style={styles.orderItemsButtonContainer}>

          <TouchableOpacity
            style={[styles.orderItemsButton, { backgroundColor: BLUE_DARK }]}
            onPress={this.onSubmitOrder}>
            <Text style={[Fonts.display, { color: 'white' }]}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.orderItemsButton, { backgroundColor: GREEN }]}
            onPress={this.onSubmitOrder}>
            <Text style={[Fonts.display, { color: 'white' }]}>Submit Order</Text>
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


  renderSearch() {
      return(
        <View style={styles.searchBarContainer}>
          <SearchField
            onChangeText={this.filterBySearch}
            showCancelButton={true}
            placeHolderText={'Search Here...'}
            textColor={BACKGROUND_LIGHT_GREY}
            primaryColor={'white'}
            secondaryColor={'transparent'} />
        </View>
      )
  }

  render() {

    const { isFilterModalVisible, masterItemList, isItemSelected } = this.state;
    const leftContent = this.getLeftContent()
    const rightContent = this.getRightContent()

    return (
      <View style={styles.container} >

        <View style={{ height: HeaderHeight + 32, backgroundColor: SECONDARY, justifyContent:'center' }}>
            <Text style={{
              ...Fonts.headline, color: 'white', textAlign: 'center', height: 32
            }}>Products</Text>
            <View style={{ position: 'absolute', left: 16, top: (HeaderHeight / 4) }}>
            <IconButton
              iconSource={require('../../assets/icons/arrow-icon-white.png')}
              iconDimensions={filterIconSize}
              primaryColor={SECONDARY}
              secondaryColor={SECONDARY_DARK}
              onPress={() => {
                this.props.navigation.goBack()
              }}
            />
          </View>
          <View style={{ position: 'absolute', right: 16, top: (HeaderHeight / 4) }}>
            <IconButton
              iconSource={require('../../assets/icons/filter-icon.png')}
              iconDimensions={filterIconSize}
              primaryColor={SECONDARY}
              secondaryColor={SECONDARY_DARK}
              onPress={() => {
                this.setState({ isFilterModalVisible: true })
              }}
            />
          </View>

        </View>

        {this.renderSearch()}


        <AnimatedPositionAbsolute
          duration={500}
          inputRange={{ bottomInitial: 0, leftInitial: 0, rightInitial: 0, topInitial: HeaderHeight + 64 }}
          outputRange={{ bottomFinal: 0, leftFinal: -DeviceWidth, rightFinal: -DeviceWidth, topFinal: HeaderHeight + 32 }}
          isActive={isItemSelected}>
          <View style={{ flex: 1, width: DeviceWidth }}>{leftContent}</View>
        </AnimatedPositionAbsolute>

        <AnimatedPositionAbsolute
          duration={500}
          inputRange={{ bottomInitial: 0, leftInitial: DeviceWidth, rightInitial: DeviceWidth * 2, topInitial: HeaderHeight + 32 }}
          outputRange={{ bottomFinal: 0, leftFinal: 0, rightFinal: DeviceWidth, topFinal: HeaderHeight + 32 }}
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
  searchBarContainer: {
    position: 'absolute',
    top: HeaderHeight - 12, left: 16, right: 16,
    zIndex: 10008,
    backgroundColor: 'transparent'
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
  },
  orderItemContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 32,
    shadowOpacity: .5,
    shadowColor: BACKGROUND_DARK_GREY,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    borderRadius: 8,
    marginHorizontal: 16
  },
  orderItemsButton: {
    height: 90,
    width: (DeviceWidth - 200) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16
  },
  orderItemsButtonContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: DeviceHeight * .74
  }
})

export default ProductReferenceScreen;
