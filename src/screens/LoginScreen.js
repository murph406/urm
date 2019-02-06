import React, { Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import * as UserActions from '../action-types/user-action-types';
import * as API from '../api/api';
import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';


class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      user: [ 
        {name:'Ryan', id: '1234' },
        {name:'Cooper', id: '8741'},
        {name:'Bryan', id: '1979'},
      ],
      stores: [
        { name: 'Albertsons', store_id: '7960', itemCount: '252' },
        { name: 'Walmart', store_id: '550', itemCount: '12' },
        { name: 'Safeway', store_id: '7975', itemCount: '81' },
        { name: 'Rosaurs', store_id: '970', itemCount: '82' }
      ],
      users: [],
    }
  }
  
  componentDidMount() {
    this.getUsers();
    
  }

  getUsers() {
   
    API.getUsers((err, users) => {
      this.setState({users: users})
    })
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
    console.log(this.state.users)
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
              text= {"User ID: " + data._id}
              onPress= {() => this.onUserSelect(data)}
          />
          )))}
          
        </ScrollView>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
  }
});

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(LoginScreen);
