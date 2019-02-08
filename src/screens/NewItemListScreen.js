import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';

import * as Colors from '../theme/colors';
import * as API from '../api/api';
import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';

class NewItemList extends Component {

  constructor(props){
    super(props);
    
    this.state = {
            item: [
         ],
    }    
}

componentDidMount() {
    this.getInfo();
    
}

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  getInfo() {
    API.getNewItems((err, data) => 
    this.setState({item: data})
    )
  }

  goItem() {
      console.log('hello')
     
      this.props.navigation.navigate('newItem');
  }

  render() {
    return(
      <View style={styles.container}>
        <TabBar 
        text="New Items" 
        onGoBack={() => this.props.navigation.navigate('home')}
        />
        <ScrollView>
            <View>
        {(this.state.item.map((data, index) => (
            <View>
                <TextBox
                    title={data.name}
                    id={"ID: " + data._id}
                    onPress={() => this.goItem()}
                    featureColor= {'white'}
                    featureText={'black'}
                />
             </View>
            )))}
         </View>
        </ScrollView>
        
        <NavigationButton
          onPress={() => this.openDrawer()}/>
      </View>
    )
  }
}

export default NewItemList;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
  },
});