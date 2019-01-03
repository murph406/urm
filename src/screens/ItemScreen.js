import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, Modal, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';

import TabBar from '../ui-elements/tab-bar';
import ItemBox from '../components/item-box';
import NavigationButton from '../ui-elements/nav-button';
import ItemDetailModal from './ItemDetailModal';

import * as API from '../api/api';

class ItemScreen extends Component {

  constructor() {
    super();

    this.state = {
      itemModalPresented: false,
      items: []
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
        // console.log(items)
        // this.setState({ items: items });
        let arr = [];
        for(let i = 0; i < 20; i++) {
          arr.push(items.items[i]);
        }
        console.log(arr);
        console.log(arr[0].item_description);

        this.setState({ items: arr });
      }
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <TabBar text="Items" />

        <NavigationButton onPress={() => this.openDrawer()}/>

        <ScrollView style={{flex: 1}} >
          {(this.state.items.map((item, index) => (
            <ItemBox
              title={item.item_description}
              text={item.department}
              onPress={() => this.setState({ itemModalPresented: true })}
              />

          )))}

        </ScrollView>

        <Modal visible={this.state.itemModalPresented} >
          <ItemDetailModal />
        </Modal>

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