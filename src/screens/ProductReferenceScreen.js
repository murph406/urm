import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, ActivityIndicator, Alert, AsyncStorage } from 'react-native';

import IconButton from '../ui-elements/icon-button';
import FilterModal from '../modals/Filter-Modal-Component'
import SearchField from '../ui-elements/search-field';

import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY } from '../theme/colors';
import { AnimatedTextBox } from '../components/index';
import { isScreenLarge, Fonts, DeviceHeight, DeviceWidth } from '../theme/styling';

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
      isActivityIndicatorVisible: true
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

      // console.log(items)
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

  toggleFilterModal = () => {
    const { isFilterModalVisible } = this.state
    const modalFlag = !isFilterModalVisible

    this.setState({ isFilterModalVisible: modalFlag })
  }

  getEmptyFlatlistView() {

    let { isActivityIndicatorVisible } = this.state

    let contents = (
      <View style={styles.emptyFlatlistContainer}>
        {(isActivityIndicatorVisible)
          ? <ActivityIndicator size={'large'} color={BACKGROUND_LIGHT_GREY} />
          :
          <>
            <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY }]}>Sorry</Text>
            <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY, paddingTop: 8 }]}> Currently, there are no items</Text>
          </>
        }
      </View>
    )

    return contents
  }

  getNumberOfResultsDetail() {

    const { items } = this.state

    let contents = (
      <View style={{ alignSelf: 'center', paddingBottom: 16 }}>
        <Text style={[Fonts.subHeading, { color: BACKGROUND_LIGHT_GREY }]}>Number of Results: {items.length}</Text>
      </View>
    )

    return contents
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

      const { item, label } = filterOption

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


  render() {

    const { items, isFilterModalVisible, masterItemList } = this.state;
    const emptyFlatlistVeiw = this.getEmptyFlatlistView()
    const numberOfResultsDetail = this.getNumberOfResultsDetail()

    return (
      <View style={styles.container} >
        <SearchField
          onChangeText={this.filterBySearch}
          showCancelButton={true}
          placeHolderText={'Search Here...'}
          textColor={BACKGROUND_LIGHT_GREY}
          primaryColor={'white'}
          secondaryColor={BACKGROUND_GREY} />

        <FlatList
          style={{ paddingTop: 16 }}
          ListHeaderComponent={numberOfResultsDetail}
          ListEmptyComponent={emptyFlatlistVeiw}
          ListFooterComponent={() => <View style={{flex: 1, height: 120}}/>}
          ItemSeparatorComponent={() => <View style={{flex: 1, height: .5, margin: 8, }}/>}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <AnimatedTextBox
              data={item} />
          )} />

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
    justifyContent: 'center',
  },
  emptyFlatlistContainer: {
    height: DeviceHeight * .7,
    width: DeviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ProductReferenceScreen;
