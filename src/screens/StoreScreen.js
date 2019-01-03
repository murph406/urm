import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import * as STORE_ACTIONS from '../action-types/store-detail-action-types';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

class StoreScreen extends Component {

  constructor() {
    super();

    this.state = {
      stores: [
        { name: 'Albertsons', store_id: '1234' },
        { name: 'Safeway', store_id: '4565' },
        { name: 'Rosauers', store_id: '4321' }
      ],
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
        <TabBar text={'Store'} />

        <ScrollView style={styles.scrollView}>

            {(this.props.stores.map((model, index) => (
            <TextBox
                title={model.name}
                onPress= {() => this.navigateStoreDetail(model)}
                text={'Store ID: '}
                id={model.store_id}
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
  return {
    stores: state.user.user.stores
  }
}

export default connect(mapStateToProps)(StoreScreen);
