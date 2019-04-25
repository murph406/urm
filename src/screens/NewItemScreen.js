import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity, Modal} from 'react-native';

import * as Colors from '../theme/colors';
import * as API from '../api/api';
import * as ItemActions from '../action-types/item-action-types';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';



class NewItemScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],

    }
}

componentDidMount() {
  this.getItems();
}

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  getItems() {
    API.getNewItems((err, items) => {
      if(err) {
        console.log(err)
      } else {
        this.setState({items: items})
      }
    })
  }

  onSelectItem(item) {
    this.props.dispatch({ type: ItemActions.SET_ITEM, itemType: ItemActions.TYPE_NEW_ITEM, item: item })
    this.props.navigation.navigate('newDetail');
  }

  render() {
    return(
      <View style={styles.container}>
        <TabBar
          text="New Items"
          onGoBack={() => this.props.navigation.navigate('home')}
        />

        <ScrollView>
            <View>
        {(this.state.items.map((item, index) => (
            <View style={styles.itemContainer} >
                <TextBox
                    title={item.name}
                    id={"Groups " + item.stores.map((store) => store)}
                    onPress={() => this.onSelectItem(item)}
                    featureColor= {'white'}
                    featureText={'black'}
                />
             </View>
            )))}
         </View>

        </ScrollView>

          <View>
            <NavigationButton
              onPress={() => this.openDrawer()}
            />
          </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 }
  },
});

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(NewItemScreen)
