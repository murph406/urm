import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../theme/colors';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

class HomeScreen extends Component {

  constructor(props){
      super(props);

  this.state = {
    screens: [
      { title: 'Store', screenToSend: 'store'},
      { title: 'Corporate News', screenToSend: 'news'},
      { title: 'Tasks', screenToSend: 'task'},
      {title: 'New Items', screenToSend: 'newItem'},
    ],
  }
}

  componentDidMount() {

  }

  doSomethin() {
    let theUser = { };

    this.props.dispatch({
      type: UserActions.SET_USER,
      user: theUser
    });
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  navigate = (screen) => {

    this.props.navigation.navigate(screen);
  }

  render() {
    return(
      <View style={styles.container} >
        <TabBar text="Home" />

        <ScrollView style={styles.scrollView}>

          {(this.state.screens.map((model, index) => (
            <TextBox
              hasFeature={true}
              featureColor={'rgb(200,50,100)'}
              featureValue={'100'}
              title={model.title}
              text="ABC"
              onPress={() => this.navigate(model.screenToSend)}
              key={index}
             />
          )))}

        </ScrollView>

        <View >
          <NavigationButton
            onPress={() => this.openDrawer()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: Colors.BACKGROUND_GREY,
  },
  scrollView: {
    flex: 1, marginTop: 8
  }
})

var mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(HomeScreen);
