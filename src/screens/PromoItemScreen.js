import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../theme/colors';

import TabBar from '../ui-elements/tab-bar';
import TextBoxFeature from '../components/text-box-feature';
import NavigationButton from '../ui-elements/nav-button';
import ItemCarousel from '../components/item-carousel';
import SpecialItemOrder from './SpecialItemOrder';

class PromoItemsScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isOrderModalPresented: false,
      selectedItemGroup: { items: [] },
      items: [
        {
          title: 'Merchant Craft',
          cost: '2.63',
          unit: 'case',
          image: require('../../assets/orders/order2.png'),
          exclusiveGroups: [],
          variations: [
            // TODO COMBAK ITEM MODEL
            { title: 'Root Beer', cost: '2.63' },
            { title: 'Lemon Lime', cost: '2.63' },
            { title: 'Grape', cost: '2.63' }
          ]
        },
        {
          title: 'Merchant Craft',
          cost: '2.63',
          unit: 'case',
          image: require('../../assets/orders/order2.png'),
          exclusiveGroups: [],
          variations: [
            // TODO COMBAK ITEM MODEL
            { title: 'Root Beer', cost: '2.63' },
            { title: 'Lemon Lime', cost: '2.63' },
            { title: 'Grape', cost: '2.63' }
          ]
        },
        {
          title: 'Merchant Craft',
          cost: '2.63',
          unit: 'case',
          image: require('../../assets/orders/order2.png'),
          exclusiveGroups: [],
          variations: [
            // TODO COMBAK ITEM MODEL
            { title: 'Root Beer', cost: '2.63' },
            { title: 'Lemon Lime', cost: '2.63' },
            { title: 'Grape', cost: '2.63' }
          ]
        }
      ]
    }
  }

  componentDidMount() {

  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  navigate = (screen) => {
    this.props.navigation.navigate(screen);
  }

  _onSelectItemGroup(item) {
    console.log(item)
    this.setState({ selectedItemGroup: item, isOrderModalPresented: true })
  }

  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Promos" onGoBack={() => this.props.navigation.goBack()} />

        <View style={styles.carouselContainer} >
          <ItemCarousel items={this.props.promoItems} onSelect={(item) => this._onSelectItemGroup(item)} />
        </View>

        <Modal animationType={'slide'} visible={this.state.isOrderModalPresented} >
          <SpecialItemOrder items={this.state.selectedItemGroup.items} />
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: Colors.BACKGROUND_GREY,
   justifyContent: 'center',

  },
  carouselContainer: {
    flex: 5,
    justifyContent: 'center',
    marginTop: 32, marginBottom: 64,
  }
})

var mapStateToProps = (state) => {
  console.log(state.specialItems.dealItems)
  return {
    user: state.user.user,
    promoItems: state.specialItems.dealItems
  }
}

export default connect(mapStateToProps)(PromoItemsScreen);
