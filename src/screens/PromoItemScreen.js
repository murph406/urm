import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as OrderActions from '../action-types/order-action-types';
import * as Colors from '../theme/colors';
import * as MailComposer from 'expo-mail-composer';
import * as API from '../api/api';

import { composeEmail, formatItemsForOrder } from '../util/util';
import { saveOrderAsync } from '../api/offline-order-manager';

import TabBar from '../ui-elements/tab-bar';
import TextBoxFeature from '../components/text-box-feature';
import NavigationButton from '../ui-elements/nav-button';
import ItemCarousel from '../components/item-carousel';
import SpecialItemOrder from './SpecialItemOrder';

class PromoItemsScreen extends Component {

  constructor(props){
    super(props);

    this.formatItemsForOrder = formatItemsForOrder.bind(this)
    this.saveOrderAsync = saveOrderAsync.bind(this)

    this.state = {
      isOrderModalPresented: false,
      selectedItemGroup: { items: [] },
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
    this.setState({ selectedItemGroup: item, isOrderModalPresented: true })
  }

  _onSubmit(items, store) {
    this.state.selectedItemGroup.items = items
    this.props.dispatch({ type: OrderActions.SET_ITEMGROUP_ITEMS, items: items })
    this.setState({ isOrderModalPresented: false }, () => {
      let order = {
        user_id: this.props.user._id,
        buyer: 'Test',
        store: store,
        items: this.formatItemsForOrder(this.state.selectedItemGroup)
      }

      this.createOrder(order)
    })
  }

  createOrder(order) {
    API.createOrder(order, (err, result) => {
      if(err) {
        console.log(err)
        this.saveOrderAsync(order)
      } else {
        console.log(result)
      }
    })
  }

  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Promos" onGoBack={() => this.props.navigation.navigate('home')} />

        <View style={styles.carouselContainer} >
          <ItemCarousel items={this.props.promoItems} onSelect={(item) => this._onSelectItemGroup(item)} />
        </View>

        <Modal animationType={'slide'} visible={this.state.isOrderModalPresented} >
          <SpecialItemOrder
            items={this.state.selectedItemGroup.items}
            onSubmit={(items, store) => this._onSubmit(items, store)}
            onDismiss={() => this.setState({ isOrderModalPresented: false })}
          />
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
  return {
    user: state.user.user,
    promoItems: state.specialItems.dealItems
  }
}

export default connect(mapStateToProps)(PromoItemsScreen);
