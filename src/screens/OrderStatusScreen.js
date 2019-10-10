import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import TabBar from '../ui-elements/tab-bar'
import CircleButton from '../ui-elements/circle-button';

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
        <TabBar text="Orders" hasBackButton={false} />

        <ScrollView style={styles.scroll} >
          <Text>Coming soon, will display user orders</Text>
        </ScrollView>

        <View style={{position: 'absolute', left: 16, bottom: 16}}>
          <CircleButton onPress={this.props.onDismiss} />
        </View>

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
