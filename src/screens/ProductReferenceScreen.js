import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, ActivityIndicator, Alert, AsyncStorage, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';

import FilterModal from '../modals/Filter-Modal-Component'
import IconButton from '../ui-elements/icon-button';
import SearchField from '../ui-elements/search-field';

import { order } from '../api/api';
import { AnimatedTextBox } from '../components/index';
import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_LIGHT_GREY } from '../theme/colors';
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
      selectedItems: [],
      groupList: [],
      searchBarText: '',
      isFilterModalVisible: false,
      isItemSelected: false,
      isActivityIndicatorVisible: false,
      isSearchBarPopulated: false,
      numberOfResults: 0
    }

    this.order = order.bind(this)
  }

  componentDidMount() {
    this.setNavigationParams()
    this.setGroups()
  }

  setNavigationParams = () => {
    const { navigation } = this.props

    navigation.setParams({
      toggleFilterModal: this.toggleFilterModal
    })
    // ^^^ Connects the toggleFilterModal function to react-navigation's header functionally. 
  }

  setGroups() {
    let promiseArray = []

    categories.forEach(async (category, index) => {
      let groups = await this.getGroup(category)
      promiseArray.push(groups)
    })

    Promise.all(promiseArray)
      .then((data) => {
        console.log("FINAL GROUPS", data.length, data)
      }).catch(e => console.log(e))
  }

  getGroup(category) {
    return new Promise(async (resolve, reject) => {
      let { groupList } = this.state
      let yes = groupList

      AsyncStorage.getItem('groups_' + category)
        .then(group => {
          group = JSON.parse(group)

          yes.push(...group)
          this.setState({ groupList: yes })
          resolve(group)

        }).catch(e => reject(e))
    }).catch(e => reject(e))
  }

  getDataAsync = (category, text) => {
    return new Promise(async (resolve, reject) => {
      await AsyncStorage.getItem(category, (err, value) => {
        if (!err) {
          const items = this.removeDuplicates(text, JSON.parse(value));

          resolve(items)
        }
      })
    })
  }

  filterBySearch = () => {
    let promiseArray = []
    let itemsMatchingSearch = []
    let { searchBarText } = this.state

    this.setState({ isActivityIndicatorVisible: true })

    categories.forEach(category => {
      promiseArray.push(this.getDataAsync(category, searchBarText));
    });

    Promise.all(promiseArray)
      .then((value) => {
        value.forEach((data, e) => {
          itemsMatchingSearch = itemsMatchingSearch.concat(data);
        })

        itemsMatchingSearch.sort(this.alphabetize);
        this.setState({ isActivityIndicatorVisible: false, items: itemsMatchingSearch })
      })
      .catch(err => console.log('Error: ', err))
  }

  removeDuplicates = (text, items) => {
    text = text.toUpperCase()

    let filteredItems = items.filter((x, index) => {
      const name = (x.item_description == null) ? '' : x.item_description
      const brand = (x.brand == null) ? '' : x.brand
      const code = (x.item_code == null) ? '' : x.item_code
      const group = (x.group_description == null) ? '' : x.group_description

      if (name.includes(text) === true || brand.includes(text) === true || group.includes(text) === true || code.toString().includes(text) === true) {
        return true;
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


  filterByCategories = (filterItemsArray) => {
    let itemsMatchingSearch = []
    let promiseArray = []

    this.setState({ isActivityIndicatorVisible: true })
    filterItemsArray.forEach((category, index) => {
      promiseArray.push(this.getDataAsync(category.item, ''));
    })

    Promise.all(promiseArray)
      .then((value) => {
        value.forEach((data, e) => {
          itemsMatchingSearch = itemsMatchingSearch.concat(data);
        })
        itemsMatchingSearch.sort(this.alphabetize);
        this.setState({ isActivityIndicatorVisible: false, items: itemsMatchingSearch })
      })
      .catch(err => console.log('Error: ', err))
  }

  resetDefaultData = () => {
    this.setState({ items: [] })
    // this.filterBySearch();
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
            <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY, textAlign: 'center' }]}>Start by Searching for Products</Text>
          </>
        }
      </View>
    )

    return contents
  }

  setNextResults = (value) => () => {
    let { numberOfResults } = this.state
    if (numberOfResults === 0 && value === -25) {
      return
    }
    this.setState({ numberOfResults: numberOfResults + value })
  }

  getNumberOfResultsDetail() {
    const { items, numberOfResults } = this.state
    let counter = numberOfResults + 25
    let text = ''

    if (items != null) {
      if (!items.length) {
        text
      } else {
        text = items.length.toString();
      }
    }

    return (
      <View style={styles.numberOfResultsContainer}>
        {(items.length != 0)
          ? <>
            <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, alignSelf: 'flex-end' }]}>{text} Results</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text onPress={this.setNextResults(-25)} style={[Fonts.subHeading, { color: SECONDARY, paddingRight: 12 }]}>Back</Text>
              <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, paddingRight: 12 }]}>{numberOfResults.toString()} of {counter.toString()}</Text>
              <Text onPress={this.setNextResults(25)} style={[Fonts.subHeading, { color: SECONDARY, }]}>Next</Text>
            </View>
          </>
          : null}

      </View>
    )
  }

  renderSearch() {
    return (
      <View style={styles.searchBarContainer}>
        <SearchField
          isTextFieldPopulated={(flag) => this.setState({ isSearchBarPopulated: flag })}
          onChangeText={(text) => this.setState({ searchBarText: text })}
          showCancelButton={true}
          placeHolderText={'Search Here...'}
          textColor={BACKGROUND_LIGHT_GREY}
          primaryColor={'white'}
          secondaryColor={'transparent'} />
      </View>
    )
  }

  getBodyContents = () => {
    const { items, isActivityIndicatorVisible, numberOfResults } = this.state
    const FlatlistItemHeight = DeviceHeight * .1
    const numberOfResultsDetail = this.getNumberOfResultsDetail()
    const emptyFlatlistVeiw = this.getEmptyFlatlistView()

    const contents = (
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <FlatList
          style={{ paddingTop: 16 }}
          ListHeaderComponent={numberOfResultsDetail}
          ListFooterComponent={numberOfResultsDetail}
          ListEmptyComponent={emptyFlatlistVeiw}
          ItemSeparatorComponent={() => <View style={{ flex: 1, height: .5, margin: 8, }} />}
          getItemLayout={(data, index) => (
            { length: FlatlistItemHeight, offset: FlatlistItemHeight * index, index }
          )}
          maxToRenderPerBatch={5}
          data={(!isActivityIndicatorVisible) ? items.slice(numberOfResults, numberOfResults + 25) : null}
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

  getHeader = () => {
    const filterIconSize = (isScreenLarge) ? 32 : 28

    const contents = (
      <View style={{ height: HeaderHeight + 46, backgroundColor: SECONDARY, justifyContent: 'center' }}>
        <Text style={{ ...Fonts.headline, color: 'white', textAlign: 'center', height: 32 }}>Products</Text>
        <View style={{ position: 'absolute', left: 16, top: (HeaderHeight / 4) }}>
          <IconButton
            iconSource={require('../../assets/icons/X-icon-white.png')}
            iconDimensions={filterIconSize}
            primaryColor={SECONDARY}
            secondaryColor={SECONDARY_DARK}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={{ position: 'absolute', right: 16, top: (HeaderHeight / 4) }}>
          <IconButton
            iconSource={require('../../assets/icons/filter-icon.png')}
            iconDimensions={filterIconSize}
            primaryColor={SECONDARY}
            secondaryColor={SECONDARY_DARK}
            onPress={() => this.toggleFilterModal()} />
        </View>
      </View>
    )

    return contents
  }

  render() {
    const { isFilterModalVisible, groupList, isSearchBarPopulated } = this.state;
    const bodyContents = this.getBodyContents()
    const header = this.getHeader()
    const searchBar = this.renderSearch()

    return (
      <View style={styles.container} >
        <StatusBar hidden={true} />

        {header}
        {searchBar}
        {bodyContents}

        <KeyboardAvoidingView style={styles.onSearchButtonContainer} behavior={'padding'}>
          {(isSearchBarPopulated)
            ? <TouchableOpacity
              onPress={this.filterBySearch}
              activeOpacity={.7}
              style={styles.onSearchButton}>
              <Text style={Fonts.subHeadingWhite}>Search</Text>
            </TouchableOpacity>
            : null
          }
        </KeyboardAvoidingView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isFilterModalVisible}>
          <FilterModal
            groups={groupList}
            categories={categories}
            onResetFilterOptions={this.resetDefaultData}
            onFilterChanges={this.filterByCategories}
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
    top: HeaderHeight,
    left: 16,
    right: 16,
    zIndex: 10008,
    backgroundColor: 'transparent'
  },
  emptyFlatlistContainer: {
    height: DeviceHeight * .4,
    // width: DeviceWidth,
    flex: 1,
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
  },
  onSearchButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  onSearchButton: {
    backgroundColor: SECONDARY,
    width: 120,
    borderRadius: 30,
    paddingVertical: 8,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberOfResultsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 32,
    paddingHorizontal: 16,
  }
})

export default ProductReferenceScreen;

/*

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

*/