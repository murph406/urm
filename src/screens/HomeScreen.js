import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import * as UserActions from '../action-types/user-action-types';

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
      { title: 'Tasks', screenToSend: 'task'}
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
        <TabBar text="Home"/>

        <ScrollView style={styles.scrollView}>

          {(this.state.screens.map((model, index) => (
            <TextBox
              title={model.title}
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
   backgroundColor: '#f5f5f5',
  },
  scrollView: {
    paddingTop: 10,
    paddingHorizontal:5,

  },
  textBox:{
    margin: 5,
    width: 356,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    shadowOffset:{width: 0, height: 5},
    justifyContent:'center',
  },
  font:{
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 34,
    color: 'black',
  }
})

var mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(HomeScreen);
