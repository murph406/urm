import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

class ItemDetailModal extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={styles.yesnoContainer} >
          <TouchableOpacity style={[styles.onYesTouch]} >
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.onNoTouch]} >
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ItemDetailModal;
