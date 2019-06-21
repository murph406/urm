import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as OrderActions from '../action-types/order-action-types';
import * as Colors from '../theme/colors';
import * as MailComposer from 'expo-mail-composer';

import { composeEmail } from '../util/util';

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

  _onSubmit(items) {
    this.state.selectedItemGroup.items = items
    this.props.dispatch({ type: OrderActions.SET_ITEMGROUP_ITEMS, items: items })
    this.setState({ isOrderModalPresented: false }, () => {
      this.props.navigation.navigate('orderPreview')
    })
      //, async() => {
      // await MailComposer.composeAsync({
      //   recipients: ['abc@yahoo.com'],
      //   subject: 'APP ORDER',
      //   body: composeEmail(this.state.selectedItemGroup)
      // }).then((status) => {
      //   console.log(status)
      // }).catch(e => console.log(e))
    // })
  }

  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Promos" onGoBack={() => this.props.navigation.goBack()} />

        <View style={styles.carouselContainer} >
          <ItemCarousel items={this.props.promoItems} onSelect={(item) => this._onSelectItemGroup(item)} />
        </View>

        <Modal animationType={'slide'} visible={this.state.isOrderModalPresented} >
          <SpecialItemOrder
            items={this.state.selectedItemGroup.items}
            onSubmit={(items) => this._onSubmit(items)}
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
