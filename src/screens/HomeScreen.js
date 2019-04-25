import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../theme/colors';

import TabBar from '../ui-elements/tab-bar';
import TextBoxFeature from '../components/text-box-feature';
import NavigationButton from '../ui-elements/nav-button';

class HomeScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      screens: [
        { title: 'Master List', screenToSend: 'store', feature: '00', featureLabel: 'Items'},
        { title: 'New Items', screenToSend: 'newList', feature: '00', featureLabel: 'Items'},
        { title: 'Promo Items', screenToSend: 'promoList', feature: '00', featureLabel: 'Items'},
        //{ title: 'News', screenToSend: 'news', feature: '9', featureLabel: 'News'},
        //{ title: 'Tasks', screenToSend: 'task', feature: '35', featureLabel: 'Tasks'},
        // {title: 'New Items', screenToSend: 'newItemList', feature: '17', featureLabel: 'Items'},
      ],
    }
  }

  componentDidMount() {
    this.props.navigation.navigate('promoList')
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
            <View style={{shadowOpacity: 0.2,shadowColor: 'black',shadowRadius: 4,shadowOffset:{ width: 0, height: 4 }}} key={{index}}>
              <TextBoxFeature
                title={model.title}
                subtitle={'Subtitle Text'}
                featureText={model.feature}
                featureLabel={model.featureLabel}
                onPress={() => this.navigate(model.screenToSend)}
              />
            </View>
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
    user: state.user.user
  }
}

export default connect(mapStateToProps)(HomeScreen);
