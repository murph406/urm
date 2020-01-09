import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { BACKGROUND_GREY } from '../theme/colors';
import { AnimatedTextBox } from '../components/index';

import * as API from '../api/api';

class ProductReferenceScreen extends Component {
  static navigationOptions = {
    title: 'Reference',
  };

  constructor(props) {
    super(props);

    this.state = {
      tabs: [
        { name: "Bananas", brand: "Fruit Company", type: "Fruit", index: 0 },
        { name: "Apple", brand: "Fruit Company", type: "Fruit", index: 1 },
        { name: "Captain Crunch", brand: "Quaker Oats", type: "Cereal", index: 2 },
        { name: "Cheerios", brand: "General Mills", type: "Cereal", index: 3 },
        { name: "Flamin Hot Cheetos", brand: "PepsiCo", type: "Chips", index: 4 },
        { name: "Funyuns", brand: "PepsiCo", type: "Chips", index: 5 }
      ]
    }
  }


  render() {

    const { tabs } = this.state;

    return (
      <View style={styles.container} >

        <FlatList
          style={{ paddingTop: 16 }}
          data={tabs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AnimatedTextBox
              data={item} />
          )} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
    justifyContent: 'center',
  }
})

export default ProductReferenceScreen;
