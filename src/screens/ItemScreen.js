import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';

import { connect } from 'react-redux';

import TabBar from '../ui-elements/tab-bar';
import ItemBox from '../components/item-box';
import NavigationButton from '../ui-elements/nav-button';
import ItemDetailModal from './ItemDetailModal';

import * as Colors from '../theme/colors';
import * as API from '../api/api';
import TextBoxFeature from '../components/text-box-feature';


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
        let arr = [];
        for(let i = 0; i < 20; i++) {
          arr.push(items.items[i]);
        }
        
        console.log(arr);
        console.log(arr[0].item_description);

        this.setState({ items: items.items });
          
      }
    })
  }


  render() {
    if(this.state.items.length === 0) {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <TabBar text="Items" onGoBack={() => this.props.navigation.navigate('store')} />
          <View style={{height: 32}} />
          <ScrollView style={{flex: 1}} >
            {(this.state.items.map((item, index) => (
              <TextBoxFeature
                title={item.item_description}
                text={item.department}
                subtitle={"Item Code: " + item.item_code}
                onPress={() => this.setState({ itemModalPresented: true, item: item, })}
                hasFeature={true}
                featureColor={(item.sale_complete) ? '#43a047' : Colors.SECONDARY}
                featureType ={(item.sale_complete) ? null : 'text'} 
                />

            )))}

          </ScrollView>

          <Modal
            animationType={'slide'}
            visible={this.state.itemModalPresented} >
            <ItemDetailModal 
              onDismiss={() => this.setState({ itemModalPresented: false})}
              item={this.state.item}
            />
          </Modal>

          <NavigationButton onPress={() => this.openDrawer()}/>

        </View>
      )
    }
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
