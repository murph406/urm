import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';

import { connect } from 'react-redux';

import TabBar from '../ui-elements/tab-bar';
import NavigationButton from '../ui-elements/nav-button';
import ItemDetailModal from './ItemDetailModal';
import FilterItemModal from './FilterItemModal';

import TextBoxFeature from '../components/text-box-feature';
import CircleButton from '../ui-elements/circle-button';

import * as Colors from '../theme/colors';
import * as API from '../api/api';


class ItemScreen extends Component {

  constructor() {
    super();

    this.state = {
      filterModalPresented: false,
      itemModalPresented: false,
      items: [],
      onCompletedItems: false
    }
  }

  componentDidMount() {
    this.getItems();
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  getItems() {
    API.getItemsByStore(this.props.store.code, (err, items) => {
      if(err) {
        console.log(err);
      } else {
        console.log('ITEMS')
        // for(let i = 0; i < items.items.length; i++) {
        //   items.items[i].isVisible = true;
        // }
        this.setState({ items: items.items });
      }
    })
  }

  onToggle() {
    this.setState({ onCompletedItems: !this.state.onCompletedItems }, () => {

      let items = [];
      return;
      if(this.state.onCompletedItems) {
        for(let i = 0; i < this.state.items.length; i++) {
          this.state.items[i].isVisible = false;
          if(this.state.items[i].is_complete == true) {
            this.state.items[i].isVisible = true;
          }
        }
      } else {
        for(let i = 0; i < this.state.items.length; i++) {
          this.state.items[i].isVisible = false;
          if(!this.state.items[i].is_complete) {
            this.state.items[i].isVisible = true;
          }
        }
      }

      this.setState({ items: this.state.items })
    })
  }

  render() {
    if(this.state.items.length === 0) {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BACKGROUND_DARK_DARKGREY}}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <TabBar
            text="Items"
            onGoBack={() => this.props.navigation.navigate('store')}
            hasFilterButton={true}
            onGoFilter={() => this.setState({filterModalPresented: true})}
            />
          <View style={{height: 32}} />
          <ScrollView style={{flex: 1}} >
            {(this.state.onCompletedItems)
              ? (this.state.items.filter((item) => item.is_complete).map((item, index) => (
                  <TextBoxFeature
                      title={item.item_description}
                      text={item.department}
                      subtitle={"Item Code: " + item.item_code}
                      onPress={() => this.setState({ itemModalPresented: true, item: item, })}
                      hasFeature={true}
                      featureColor={(item.is_complete) ? Colors.GREEN : Colors.SECONDARY}
                      featureType ={(item.is_complete) ? null : 'text'}
                    />

                )))
              : (this.state.items.filter((item) => !item.is_complete).map((item, index) => (
                  <TextBoxFeature
                      title={item.item_description}
                      text={item.department}
                      subtitle={"Item Code: " + item.item_code}
                      onPress={() => this.setState({ itemModalPresented: true, item: item, })}
                      hasFeature={true}
                      featureColor={(item.is_complete) ? Colors.GREEN : Colors.SECONDARY}
                      featureType ={(item.is_complete) ? null : 'text'}
                    />
                )))
            }
            {/*(this.state.items.map((item, index) => (
                ? <TextBoxFeature
                    title={item.item_description}
                    text={item.department}
                    subtitle={"Item Code: " + item.item_code}
                    onPress={() => this.setState({ itemModalPresented: true, item: item, })}
                    hasFeature={true}
                    featureColor={(item.is_complete) ? Colors.GREEN : Colors.SECONDARY}
                    featureType ={(item.is_complete) ? null : 'text'}
                  />
                : null

            )))*/}

          </ScrollView>
          <Modal
            animationType={'slide'}
            visible={this.state.filterModalPresented}
          >
            <FilterItemModal
              onDismissFilter={() => this.setState({ filterModalPresented: false })}
            />
          </Modal>

          <Modal
            animationType={'slide'}
            visible={this.state.itemModalPresented} >
            <ItemDetailModal
              onDismiss={() => this.setState({ itemModalPresented: false})}
              item={this.state.item}
            />
          </Modal>

          <View style={styles.toggle} >
            <CircleButton
              backgroundColor={(this.state.onCompletedItems) ? Colors.SECONDARY : Colors.GREEN }
              onPress={() => this.onToggle()}
            />
          </View>


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
  toggle: {
    position: 'absolute',
    left: 16, bottom: 16
  }
});

var mapStateToProps = state => {
  return {
    store: state.storeDetail.store
  }
}

export default connect(mapStateToProps)(ItemScreen);
