import React, { Component } from 'react';
import { View, StyleSheet, Modal, StatusBar } from 'react-native';

import { formatItemsForOrder } from '../util/util';
import { saveOrderAsync } from '../api/offline-order-manager';
import { BACKGROUND_GREY } from '../theme/colors';

import * as API from '../api/api';

import SpecialItemOrderModal from '../modals/SpecialItemOrderModal';
import { ItemCarousel } from '../components/index'

class PromoItemsScreen extends Component {
  static navigationOptions = {
    title: 'Promos',
  };

  constructor(props) {
    super(props);

    this.formatItemsForOrder = formatItemsForOrder.bind(this)
    this.saveOrderAsync = saveOrderAsync.bind(this)

    this.state = {
      isOrderModalPresented: false,
      selectedItemGroup: { items: [] },
      promotedItems: []
    }
  }

  componentDidMount() {
    this.getPromoItems()
  }

  getPromoItems() {
    API.getAllItemGroups((err, promoItems) => {
      if (err) {
        console.log("PROMOTED_ITEMS_ERROR", err)
      } else {
        console.log("PROMOTED_ITEMS", promoItems)
        this.setState({ promotedItems: promoItems })
      }
    })
  }

  _onSelectItemGroup = (item)  => {
    console.log("SELECTED", item)
    this.setState({
      selectedItemGroup: item,
      isOrderModalPresented: true
    })
  }

  // _onSubmit(items, store) {
  //   this.state.selectedItemGroup.items = items
  //   this.props.dispatch({ type: OrderActions.SET_ITEMGROUP_ITEMS, items: items })
  //   this.setState({ isOrderModalPresented: false }, () => {
  //     let order = {
  //       user_id: this.props.user._id,
  // Old redux functionality removed ^ ^ ^
  //       buyer: 'Test',
  //       store: store,
  //       items: this.formatItemsForOrder(this.state.selectedItemGroup)
  //     }

  //     this.createOrder(order)
  //   })
  // }

  createOrder(order) {
    API.createOrder(order, (err, result) => {
      if (err) {
        console.log(err)
        this.saveOrderAsync(order)
      } else {
        console.log(result)
      }
    })
  }

  closeOrderModal = () => {
    this.setState({ isOrderModalPresented: false })
  }


  render() {

    let { isOrderModalPresented, selectedItemGroup, promotedItems } = this.state

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={styles.carouselContainer} >
          <ItemCarousel
            items={promotedItems}
            onSelect={this._onSelectItemGroup}
          />
        </View>

        <Modal
          animationType={'slide'}
          visible={isOrderModalPresented}>
          <SpecialItemOrderModal
            items={selectedItemGroup.items}
            // onSubmit={(items, store) => this._onSubmit(items, store)}
            onSubmit={(item, store) => console.log(item, store)}
            onDismiss={this.closeOrderModal} />
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
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default PromoItemsScreen;
