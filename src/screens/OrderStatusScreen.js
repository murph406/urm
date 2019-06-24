import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import TabBar from '../ui-elements/tab-bar'
import * as Colors from '../theme/colors';

class OrderStatusScreen extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Home" hasBackButton={false} />

        <ScrollView style={styles.scroll} >
          
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY
  }
})

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(OrderStatusScreen)
