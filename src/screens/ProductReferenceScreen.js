import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, FlatList, Modal } from 'react-native';

import IconButton from '../ui-elements/icon-button';
import FilterModal from '../modals/Filter-Modal'
import SearchField from '../ui-elements/search-field';

import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK, BACKGROUND_DARK_GREY, BACKGROUND_LIGHT_GREY } from '../theme/colors';
import { AnimatedTextBox } from '../components/index';
import { isScreenLarge } from '../theme/styling';

import * as API from '../api/api';

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
      tabs: [
        { name: "Bananas", brand: "Fruit Company", type: "Fruit", description: "Lamest fruit out there.", code: '0001', price: '10.00', index: 0 },
        { name: "Apple", brand: "Fruit Company", type: "Fruit", description: "Best fruit out there", code: '0002', price: '5.00', index: 1 },
        { name: "Captain Crunch", brand: "Quaker Oats", type: "Cereal", description: "Be\st cereal hands down, will cut your mouth tho", code: '0003', price: '20.00', index: 2 },
        { name: "Cheerios", brand: "General Mills", type: "Cereal", description: "Pretty basic, but tasty. 6.7 out of 10", code: '0004', price: '7.00', index: 3 },
        { name: "Flamin Hot Cheetos", brand: "PepsiCo", type: "Chips", description: "What's this shit on my hands?", code: '0005', price: '1.00', index: 4 },
        { name: "Funyuns", brand: "PepsiCo", type: "Chips", description: "Have some fun with your yuns", code: '0006', price: '69.00', index: 5 }
      ],
      isFilterModalVisible: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    navigation.setParams({
      toggleFilterModal: this.toggleFilterModal
    })
  }

  toggleFilterModal = () => {
    const { isFilterModalVisible } = this.state
    const modalFlag = !isFilterModalVisible

    this.setState({ isFilterModalVisible: modalFlag })
  }


  render() {

    const { tabs, isFilterModalVisible } = this.state;

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
          data={tabs}
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
  }
})

export default ProductReferenceScreen;
