import React, { Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../action-types/user-action-types';
import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      users: [ 
        {name:'Ryan', id: '1234' },
        {name:'Cooper', id: '8741'},
        {name:'Bryan', id: '1979'},
      ],
      stores: [
        { name: 'Albertsons', store_id: '7960', itemCount: '252' },
        { name: 'Walmart', store_id: '550', itemCount: '12' },
        { name: 'Safeway', store_id: '7975', itemCount: '81' },
        { name: 'Rosaurs', store_id: '970', itemCount: '82' }
      ]
    }
  }
  
  componentDidMount() {

  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }
  onUserSelect = (user) => {
    user.stores = this.state.stores
    this.props.dispatch({
      type: UserActions.SET_USER,
      user
    });
    this.props.navigation.navigate('home')
  }


  render() {
    return(
      <View style={styles.container} >
        <TabBar 
          hasBackButton= {false}
          text="Login"
        />
        <ScrollView>
          {(this.state.users.map((data, index)=> (
            <TextBox
              title={data.name}
              text= {"User ID: " + data.id}
              onPress= {() => this.onUserSelect(data)}
          />
          )))}
          
        </ScrollView>
        
        <NavigationButton
          onPress={() => this.openDrawer()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 
      '#f5f5f5',
  }
});

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(LoginScreen);
