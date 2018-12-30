import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

class NewItem extends Component {

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  render() {
    return(
      <View style={styles.container}>
          <TabBar text="New Item"/>
          <NavigationButton
            onPress={() => this.openDrawer()}/>
      </View>
    )
  }
}
export default NewItem;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
  },
});
