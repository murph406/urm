import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar } from 'react-native';

import { TextBoxFeature } from '../components/index'

import { BACKGROUND_GREY } from '../theme/colors';

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);

    this.state = {
      screens: [
        { title: 'Promo Items', screenToSend: 'promoList', feature: '0', featureLabel: 'Items', featureText: '1', subtitle: 'Items with deals' },
        { title: 'Product Reference', screenToSend: 'productReference', feature: '0', featureLabel: 'Items', featureText: '481', subtitle: 'Search products by Reference' }
      ],
    }
  }


  navigate = (screen) => {
    this.props.navigation.navigate(screen);
  }

  render() {

    let { screens } = this.state

    return (
      <View style={styles.container} >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <FlatList
          style={{ paddingTop: 16 }}
          data={screens}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TextBoxFeature
              data={item}
              onPress={() => this.navigate(item.screenToSend)}
            />
          )} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
  },
})

export default HomeScreen;