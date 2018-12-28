import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

class NewsScreen extends Component {

  render() {
    return(
      <View style={styles.container}>
        <TabBar text="Corporate News"/>
        <NavigationButton/>
      </View>
    )
  }
}
export default NewsScreen;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
  },
});
