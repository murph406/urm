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
        { name: "Bananas", brand: "Fruit Company", type: "Fruit", description: "Lamest fruit out there.", code: '0001', price: '10.00', index: 0 },
        { name: "Apple", brand: "Fruit Company", type: "Fruit", description: "Best fruit out there", code: '0002', price: '5.00', index: 1 },
        { name: "Captain Crunch", brand: "Quaker Oats", type: "Cereal", description: "Best cereal hands down, will cut your mouth tho", code: '0003', price: '20.00', index: 2 },
        { name: "Cheerios", brand: "General Mills", type: "Cereal", description: "Too basic, but tasty. 6.7 out of 10", code: '0004', price: '7.00', index: 3 },
        { name: "Flamin Hot Cheetos", brand: "PepsiCo", type: "Chips", description: "What's this shit on my hands?", code: '0005', price: '1.00', index: 4 },
        { name: "Funyuns", brand: "PepsiCo", type: "Chips", description: "Have some fun with your yuns", code: '0006', price: '69.00', index: 5 }
      ]
    }
  }


  render() {

    const { tabs } = this.state;

    return (
      <View style={styles.container} >

        <FlatList
          style={{ paddingTop: 16,  }}
          data={tabs}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
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
