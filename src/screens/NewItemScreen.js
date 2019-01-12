import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity, Modal} from 'react-native';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';
import TitleCard from '../ui-elements/title-card';
import SubmitButton from '../ui-elements/submit-button';
import NewItemOrderScreen from './NewItemOrderScreen';

class NewItemScreen extends Component {

  state = {
    item: {
      title: 'Green Beans Canned',
      price: '100.00',
      costPerCase: '1000.00',
      weight: '40 lbs',
      upcCode: '#12341234',
      manufacturer: 'Food Distributor',
      msrp: '150.00'
    },
    itemModalPresented: false,
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }

  render() {
    return(
      <View style={styles.container}>
          <TabBar text="New Item Order"/>
          <NavigationButton
            onPress={() => this.openDrawer()}/>
          <View style={styles.scrollView}>

              <TitleCard
                title={this.state.item.title}

                info={[
                  {label:'Cost Per Case:', value: this.state.item.costPerCase},
                  {label:'Weight:', value: this.state.item.weight},
                  {label:'UPC Code:', value: this.state.item.upcCode},
                  {label:'Manufacturer:', value: this.state.item.manufacturer}, {label:'MSRP:', value: this.state.item.msrp}
                ]}
              />
            <SubmitButton
              title='Submit'
              onPress= {() => this.setState({itemModalPresented: true})}
              />
          </View>
          <Modal animationType={'slide'} visible={this.state.itemModalPresented} >
            <NewItemOrderScreen onDismiss={() => this.setState({ itemModalPresented: false })} />
          </Modal>
      </View>
    )
  }
}
export default NewItemScreen;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
   alignItems: 'stretch',
  },
  scrollView: {
    marginTop: 24,
    marginLeft: 16,
    marginRight:16,
    marginBottom: 16,
  },
});
