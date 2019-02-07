import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,} from 'react-native';
import { connect } from 'react-redux';

import * as STORE_ACTIONS from '../action-types/store-detail-action-types';

import TabBar from '../ui-elements/tab-bar';
import TextBoxFeature from '../components/text-box-feature';
import NavigationButton from '../ui-elements/nav-button';

class StoreScreen extends Component {

  constructor() {
    super();

    this.state = {
      screens: [
        { title: 'Store', screenToSend: 'store'},
        { title: 'Corporate News', screenToSend: 'news'},
        { title: 'Tasks', screenToSend: 'task'}
      ],
    }
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  navigateStoreDetail = (store) => {
    this.props.dispatch({
      type: STORE_ACTIONS.SET_STORE,
      store: store
    });

    this.props.navigation.navigate('items')
  }


  render() {
    return(
      <View style={styles.container}>
        <TabBar text={'Store'} onGoBack={() => this.props.navigation.navigate('home')} />

        <ScrollView style={styles.scrollView}>
          <View style={{height: 32}} />

            {(this.props.stores.map((model, index) => (
              <TextBoxFeature
                title={model.name}
                subtitle={'Store ID: ' + model.code.toString()}
                featureText={model.item_count} featureLabel={'Items'}
                onPress={() => this.navigateStoreDetail(model)}
                key={index}
              />
            )))}

          </ScrollView>

        <NavigationButton
          onPress={() => this.openDrawer()}/>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
  },
});

var mapStateToProps = state => {
  console.log('STORE', state.user.user.stores)
  return {
    stores: state.user.user.stores
  }
}

export default connect(mapStateToProps)(StoreScreen);
