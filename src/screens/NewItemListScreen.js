import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity, Modal} from 'react-native';



import * as Colors from '../theme/colors';
import * as API from '../api/api';
import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';



class NewItemList extends Component {

  constructor(props){
    super(props);

    this.state = {
      items: [],
      
    }
}

componentDidMount() {
  this.getItems();
}

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  getItems() {
    API.getNewItems((err, items) => {
      if(err) {
        console.log(err)
      } else {
        this.setState({items: items})
      }
    })
  }

  onItem() {
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
        {(this.state.items.map((data, index) => (
            <View style={styles.itemContainer} >
                <TextBox
                    title={data.name}
                    id={"Stores: " + data.stores.map((store) => store)}
                    onPress={() => this.onItem()}
                    featureColor= {'white'}
                    featureText={'black'}
                />
             </View>
            )))}
         </View>
        
        </ScrollView>

          <View>
            <NavigationButton
              onPress={() => this.openDrawer()}
            />
          </View>
     
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
  itemContainer: {
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 }
  },
  
});
