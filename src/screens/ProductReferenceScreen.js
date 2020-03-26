import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, ActivityIndicator, Alert, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native';

import FilterModal from '../modals/Filter-Modal-Component'
import IconButton from '../ui-elements/icon-button';
import SearchField from '../ui-elements/search-field';

import { order } from '../api/api';
import { AnimatedPositionAbsolute } from '../util/Animated-Utility'
import { AnimatedTextBox } from '../components/index';
import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY, BLUE_LIGHT } from '../theme/colors';
import { isScreenLarge, Fonts, DeviceHeight, DeviceWidth, HeaderHeight } from '../theme/styling';
import { categories } from '../api/api';


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
      isActivityIndicatorVisible: false,
      selectedItems: []
    }

    this.order = order.bind(this)
  }

  componentDidMount() {
    this.setNavigationParams()
    // this.filterBySearch('');
    // this.retrieveItems()
  }

/*
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
  */

  setNavigationParams = () => {
    const { navigation } = this.props

    navigation.setParams({
      toggleFilterModal: this.toggleFilterModal
    })
    // ^^^ Connects the toggleFilterModal function to react-navigation's header functionally. 
  }

  filterBySearch = (text) => {
    if (text.length < 3) return;
    console.log('we in hereee')
    this.setState({ isActivityIndicatorVisible: true });
    let promiseArray = [];
    let itemsMatchingSearch = [];
    categories.forEach(category => {
      AsyncStorage.getItem(category, (err, value) => {
        if (!err) {
          const items = this.search(text, JSON.parse(value));
          itemsMatchingSearch = itemsMatchingSearch.concat(items);

          itemsMatchingSearch.sort(this.alphabetize);
          // Only put the top 100 on the list
          // if(itemsMatchingSearch.length <= 100) {
          this.setState({ items: itemsMatchingSearch, isActivityIndicatorVisible: false })
          // }
        }
      })
    });
    console.log('ITEM', this.state.items[0]);
  }

  search = (text, items) => {
    text = text.toUpperCase()
    let filteredItems = items.filter((x, index) => {
      const name = (x.item_description == null) ? '' : x.item_description
      const brand = (x.brand == null) ? '' : x.brand
      const code = (x.item_code == null) ? '' : x.item_code
      const group = (x.group_description == null) ? '' : x.group_description

      if (name.includes(text) === true || brand.includes(text) === true || group.includes(text) === true || code.toString().includes(text) === true) {
        return true;
        // Refactor this ^^^
      }
      return false;
    })

    return filteredItems;
  }

  alphabetize(a, b) {
    if (a.item_description < b.item_description)
      return -1;
    if (a.item_description > b.item_description)
      return 1;
    return 0;
  }


  /*filterBySearch = (text) => {
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
  }*/

  filterByOptions = (filterItemsArray) => {
    const { items } = this.state
    let filteredData = []

    filterItemsArray.forEach((filterOption, index) => {
      const { item } = filterOption

      let filteredItems = items.filter((x, i) => {
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
    this.filterBySearch('');
  }

  onSelectItem = (item) => () => {
    const { selectedItems } = this.state
    this.toggleScreenPosition()

    // If the selected item has already been selected, do NOT add to array
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i]._id == item._id) {
        return;
      }
    }

    // add a count variable onto the item
    let array = [
      ...selectedItems,
      {
        ...item,
        count: 0
      }
    ]
    this.setState({ selectedItems: array })
  }

  onSubmitOrder = () => {
    this.toggleScreenPosition()

    this.order(this.state.selectedItems)
      .then((status) => {
        console.log(status)
        this.props.navigation.goBack()
      })
      .catch((e) => {
        Alert.alert('Could not save your order, please try again')
      })
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
    const { selectedItems } = this.state
    const array = selectedItems

    array.splice(itemIndex, 1)
    this.setState({ selectedItems: array })
  }

  getLeftContent = () => {
    const { items } = this.state
    const FlatlistItemHeight = DeviceHeight * .1
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
          getItemLayout={(data, index) => (
            { length: FlatlistItemHeight, offset: FlatlistItemHeight * index, index }
          )}
          maxToRenderPerBatch={5}
          data={items.slice(0, 20)}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <AnimatedTextBox
              onSelectedItem={this.onSelectItem(item)}
              data={item} />
          )} />
      </View>
    )

    return contents
  }

  getRightContent = () => {
    const { selectedItems } = this.state

    return (
      <View style={{ flex: 1, width: DeviceWidth }}>

        <FlatList
          ItemSeparatorComponent={() => <View style={{ flex: 1, height: .5, margin: 8, }} />}
          ListHeaderComponent={() => <View style={{ flex: 1, height: 96, justifyContent: 'center' }}><Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, alignSelf: 'center', paddingTop: 16 }]}>Your Cart</Text></View>}
          ListFooterComponent={() => <View style={{ flex: 1, height: 160 }} />}
          data={selectedItems}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <ItemSelector
              item={item}
              onIncrement={(count) => this.onIncrementItem(count, item)}
              removeItem={() => this.removeItem(index)}
            />
          )} />

        <View style={styles.orderItemsButtonContainer}>
          <TouchableOpacity
            activeOpacity={.7}
            style={[styles.orderItemsButton, { backgroundColor: BLUE_LIGHT }]}
            onPress={this.toggleScreenPosition}>
            <Text style={[Fonts.subHeading, { color: 'white' }]}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.7}
            style={[styles.orderItemsButton, { backgroundColor: SECONDARY }]}
            onPress={this.onSubmitOrder}>
            <Text style={[Fonts.subHeading, { color: 'white' }]}>Submit Order</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }

  onIncrementItem(count, item) {
    let { selectedItems } = this.state;

    // find index of selected
    let index = selectedItems.findIndex((_i) => {
      return _i._id == item._id
    })

    selectedItems[index].count = count;

    this.setState({ selectedItems: selectedItems })
  }

  getEmptyFlatlistView() {
    let { isActivityIndicatorVisible } = this.state

    let contents = (
      <View style={styles.emptyFlatlistContainer}>
        {(isActivityIndicatorVisible)
          ? <ActivityIndicator size={'large'} color={BACKGROUND_LIGHT_GREY} />
          :
          <>
            <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY }]}>Start by Searching for Products</Text>
          </>
        }
      </View>
    )

    return contents
  }

  getNumberOfResultsDetail() {
    const { items } = this.state

    let text = ''
    if (items != null) {
      if (!items.length) {
        text
      } else {
        text = items.length.toString();
      }
    }

    return (
      <View style={{ alignSelf: 'flex-end', paddingVertical: 16, paddingRight: 16 }}>
        <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY }]}>{text} Results</Text>
      </View>
    )
  }


  renderSearch() {
    return (
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
    const { isFilterModalVisible, items, isItemSelected } = this.state;
    const leftContent = this.getLeftContent()
    // const rightContent = this.getRightContent()
    const filterIconSize = (isScreenLarge) ? 32 : 28

    return (
      <View style={styles.container} >
        <StatusBar hidden={true} />

        <View style={{ height: HeaderHeight + 46, backgroundColor: SECONDARY, justifyContent: 'center' }}>
          <Text style={{ ...Fonts.headline, color: 'white', textAlign: 'center', height: 32 }}>Products</Text>
          <View style={{ position: 'absolute', left: 16, top: (HeaderHeight / 4) }}>
            <IconButton
              iconSource={require('../../assets/icons/X-icon-white.png')}
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
                this.toggleFilterModal();
              }}
            />
          </View>

        </View>

        {!isItemSelected && this.renderSearch()}


        {/* <AnimatedPositionAbsolute
          duration={500}
          inputRange={{ bottomInitial: 0, leftInitial: 0, rightInitial: 0, topInitial: HeaderHeight + 64 }}
          outputRange={{ bottomFinal: 0, leftFinal: -DeviceWidth, rightFinal: -DeviceWidth, topFinal: HeaderHeight + 64 }}
          isActive={false}>
          <View style={{ flex: 1, width: DeviceWidth }}>{leftContent}</View>
        </AnimatedPositionAbsolute> */}

        {leftContent}

        {/* <AnimatedPositionAbsolute
          duration={500}
          inputRange={{ bottomInitial: 0, leftInitial: DeviceWidth, rightInitial: DeviceWidth * 2, topInitial: HeaderHeight + 32 }}
          outputRange={{ bottomFinal: 0, leftFinal: 0, rightFinal: DeviceWidth, topFinal: HeaderHeight + 32 }}
          isActive={isItemSelected}>
          <View style={{ flex: 1, width: DeviceWidth }}>{rightContent}</View>
        </AnimatedPositionAbsolute> */}

        <Modal
          animationType="slide"
          transparent={false}
          visible={isFilterModalVisible}>
          <FilterModal
            data={items}
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
    top: HeaderHeight - 12, 
    left: 16, 
    right: 16,
    zIndex: 10008,
    backgroundColor: 'transparent'
  },
  emptyFlatlistContainer: {
    height: DeviceHeight * .6,
    width: DeviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderItemsButton: {
    height: 60,
    width: (DeviceWidth - 200) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16
  },
  orderItemsButtonContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
    top: DeviceHeight * .78
  }
})

export default ProductReferenceScreen;