import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, ActivityIndicator, Alert, AsyncStorage } from 'react-native';

import IconButton from '../ui-elements/icon-button';
import FilterModal from '../modals/Filter-Modal'
import SearchField from '../ui-elements/search-field';

import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_DARK_GREY, BACKGROUND_LIGHT_GREY } from '../theme/colors';
import { AnimatedTextBox } from '../components/index';
import { isScreenLarge, Fonts, DeviceHeight, DeviceWidth } from '../theme/styling';

import { getItemsAll } from '../api/api';

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
      items: [
        // { name: "Bananas", brand: "Fruit Company", type: "Fruit", description: "Lamest fruit out there.", code: '0001', price: '10.00', index: 0 },
        // { name: "Apple", brand: "Fruit Company", type: "Fruit", description: "Best fruit out there", code: '0002', price: '5.00', index: 1 },
        // { name: "Captain Crunch", brand: "Quaker Oats", type: "Cereal", description: "Be\st cereal hands down, will cut your mouth tho", code: '0003', price: '20.00', index: 2 },
        // { name: "Cheerios", brand: "General Mills", type: "Cereal", description: "Pretty basic, but tasty. 6.7 out of 10", code: '0004', price: '7.00', index: 3 },
        // { name: "Flamin Hot Cheetos", brand: "PepsiCo", type: "Chips", description: "What's this shit on my hands?", code: '0005', price: '1.00', index: 4 },
        // { name: "Funyuns", brand: "PepsiCo", type: "Chips", description: "Have some fun with your yuns", code: '0006', price: '69.00', index: 5 }
      ],
      isFilterModalVisible: false,
      isActivityIndicatorVisible: true
    }
  }

  componentDidMount() {
    this.setNavigationParams()
    this.retrieveItems()

  }

  setItems = () => {
    getItemsAll((err, items) => {
      if (err) {
        console.log("API_ERR", err)
        Alert.alert('Error', "Failed with status code " + err.request.status, [{ text: 'Cancel' }])
        this.setState({ isActivityIndicatorVisible: false })
      } else {
        console.log("RETURNED_ITEMS", items)
        this.setState({ items: items, isActivityIndicatorVisible: false })
      }
    })
  }

  async retrieveItems() {
    try {
      const retrievedItems = await AsyncStorage.getItem('data');
      const items = JSON.parse(retrievedItems);

      console.log("RETURNED_ITEMS", items)
      this.setState({ items: items, isActivityIndicatorVisible: false })

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


  render() {

    const { items, isFilterModalVisible } = this.state;
    const emptyFlatlistVeiw = this.getEmptyFlatlistView()

    return (
      <View style={styles.container} >
        <SearchField
          showCancelButton={true}
          placeHolderText={'Search Here...'}
          textColor={BACKGROUND_LIGHT_GREY}
          primaryColor={'white'}
          secondaryColor={BACKGROUND_GREY} />

        <FlatList
          style={{ paddingTop: 16, }}
          ListEmptyComponent={emptyFlatlistVeiw}
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
