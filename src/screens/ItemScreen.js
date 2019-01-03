import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, Modal, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

import * as API from '../api/api';

class ItemScreen extends Component {

  constructor() {
    super();

    this.state = {
      itemModalPresented: false
    }
  }

  componentDidMount() {
    this.getItems();
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  getItems() {
    API.getItemsByStore(this.props.store.store_id, (err, items) => {
      if(err) {
        console.log(err);
      } else {
        debugger
        console.log(items)
      }
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <TabBar text="Items" />

        <NavigationButton onPress={() => this.openDrawer()}/>

        <ScrollView style={{flex: 1}} >


        </ScrollView>

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
    store: state.storeDetail.store
  }
}

export default connect(mapStateToProps)(ItemScreen);
