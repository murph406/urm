import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TabBar from '../ui-elements/tab-bar';

import * as Colors from '../theme/colors';

class Announcements extends Component {
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
        <TabBar text="Announcements" onGoBack={() => this.props.navigation.navigate('home')} />
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

export default Announcements
