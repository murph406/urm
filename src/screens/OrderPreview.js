import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors'

import TabBar from '../ui-elements/tab-bar';

class OrderPreview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storeNum: '',
      address: '',
      city: '',

    }
  }

  componentDidMount() {

  }

  onSubmit() {
  }


  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Order Preview" onGoBack={() => this.props.navigation.goBack()} />

        <View style={styles.overviewContainer}>
          <View style={styles.overviewCard} >
            
          </View>
        </View>

        <TouchableOpacity style={styles.submit} onPress={() => this.onSubmit()}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.BACKGROUND_GREY,
  },
  submit: {
    height: 54, width: 300, backgroundColor: Colors.SECONDARY,
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
    borderRadius: 4, overflow: 'hidden'
  },
  text: {
    textAlign: 'center', fontSize: 24, color: 'black',
    fontFamily: 'bold'
  },
  overviewContainer: {

  }
})

var mapStateToProps = state => {
  return {
    items: state.order.items
  }
}

export default connect(mapStateToProps)(OrderPreview)
