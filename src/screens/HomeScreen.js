import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../theme/colors';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import TextBoxFeature from '../components/text-box-feature';
import NavigationButton from '../ui-elements/nav-button';

class HomeScreen extends Component {

  constructor(props){
      super(props);

  this.state = {
    screens: [
      { title: 'My Stores', screenToSend: 'store', feature: '5', featureLabel: 'Stores'},
      //{ title: 'News', screenToSend: 'news', feature: '9', featureLabel: 'News'},
      //{ title: 'Tasks', screenToSend: 'task', feature: '35', featureLabel: 'Tasks'},
      {title: 'New Items', screenToSend: 'newItem', feature: '17', featureLabel: 'Items'},
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
        <TabBar text="Home" hasBackButton={false} />

        <ScrollView style={styles.scrollView}>
          <View style={{height: 16}} />
          {(this.state.screens.map((model, index) => (

            <TextBoxFeature
              title={model.title}
              subtitle={'Subtitle Text'}
              featureText={model.feature}
              featureLabel={model.featureLabel}
              onPress={() => this.navigate(model.screenToSend)}
            />
            /*<TextBox
              hasFeature={true}
              featureColor={Colors.SECONDARY}
              featureValue={'100'}
              title={model.title}
              text="ABC"
              onPress={() => this.navigate(model.screenToSend)}
              key={index}
             />*/
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
