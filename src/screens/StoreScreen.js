import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';

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

  render() {
    return(
      <View style={styles.container}>
        <TabBar text= "Store"/>
        <NavigationButton
          onPress={() => this.openDrawer()}/>
      </View>

    )
  }
}
export default StoreScreen;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
  },
});
