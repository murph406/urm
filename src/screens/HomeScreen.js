import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../api/api';
import * as UserActions from '../action-types/user-action-types';
import * as SpecialItemActions from '../action-types/special-item-actions';
import * as Colors from '../theme/colors';

import OrderStatusScreen from './OrderStatusScreen';
import TabBar from '../ui-elements/tab-bar';
import TextBoxFeature from '../components/text-box-feature';
import NavigationButton from '../ui-elements/nav-button';

class HomeScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isOrderModalPresented: false,
      screens: [
        { title: 'Announcements', screenToSend: 'announcements', feature: '0', featureLabel: 'Alerts', subtitle: 'On the go news'},
        { title: 'New Items', screenToSend: 'newList', feature: '0', featureLabel: 'Items', subtitle: 'New to catologue'},
        { title: 'Promo Items', screenToSend: 'promoList', feature: '0', featureLabel: 'Items', subtitle: 'Items with deals'},
      ],
    }
  }

  componentDidMount() {
    this.getPromoItems()
  }

  doSomethin() {
    let theUser = { };

    this.props.dispatch({
      type: UserActions.SET_USER,
      user: theUser
    });
  }

  openDrawer = (text) => {
    this.onPresentOrders()
    return
    // for testing ^
    this.props.navigation.openDrawer();
  }

  onPresentOrders() {
    this.setState({ isOrderModalPresented: true })
  }

  navigate = (screen) => {
    this.props.navigation.navigate(screen);
  }

  getPromoItems() {
    console.log('bruhhh')
    API.getAllItemGroups((err, promoItems) => {
      if(err) {
        console.log(err)
      } else {
        console.log(promoItems)
        this.props.dispatch({ type: SpecialItemActions.SET_DEAL_ITEMS, items: promoItems })
      }
    })
  }

  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Home" hasBackButton={false} />

        <ScrollView style={styles.scrollView}>
          <View style={{height: 16}} />

          {(this.state.screens.map((model, index) => (
            <View style={{shadowOpacity: 0.2,shadowColor: 'black',shadowRadius: 4,shadowOffset:{ width: 0, height: 4 }}} key={{index}}>
              <TextBoxFeature
                title={model.title}
                subtitle={model.subtitle}
                featureText={model.feature}
                featureLabel={model.featureLabel}
                onPress={() => this.navigate(model.screenToSend)}
              />
            </View>
          )))}

        </ScrollView>


        <NavigationButton
          onPress={() => this.openDrawer()}
        />

      <Modal animationType={'slide'} visible={this.state.isOrderModalPresented} >
        <OrderStatusScreen onDismiss={() => this.setState({ isOrderModalPresented: false })} />
      </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: Colors.BACKGROUND_GREY,
  },
  scrollView: {
    flex: 1, marginTop: 8
  }
})

var mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(HomeScreen);
