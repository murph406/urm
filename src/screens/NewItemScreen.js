import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView, Linking, Modal, Picker, TextInput} from 'react-native';

import * as Colors from '../theme/colors';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import TitleCard from '../ui-elements/title-card';
import SubmitButton from '../ui-elements/submit-button';
import NewItemOrderModal from './NewItemOrderModal'; 

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
    selectedStore: null,
    itemModalPresented: false,
  }

  openDrawer = (text) => {
    this.props.navigation.openDrawer();
  }
  
  goCompleteOrder = () => {
    Linking.openURL('mailto:somethingemail@gmail.com?subject=Hello All&body=Description')
  }

  _onSelectStore(store) {
    this.setState({ selectedStore: store, itemModalPresented: false }, () => {
      console.log(this.state.selectedStore)
      
    })
  }

  render() {
    return(
      <View style={styles.container}>
          <TabBar text="New Item Order" onGoBack={() => this.props.navigation.navigate('newItemList')} />

          <ScrollView>
        <View style={styles.scrollView}>

              <TitleCard
                 title={this.state.item.title}
              /> 

              <TitleCard
                info={[
                  {label:'Cost Per Case:', value: this.state.item.costPerCase},
                  {label:'Weight:', value: this.state.item.weight},
                  {label:'UPC Code:', value: this.state.item.upcCode},
                  {label:'Manufacturer:', value: this.state.item.manufacturer}, {label:'MSRP:', value: this.state.item.msrp}
                ]}
              />

              {(this.state.selectedStore)
                ? <View>
                    <TextBox
                      title= {this.state.selectedStore.name}
                      text={'Store ID: '+ this.state.selectedStore.store_id}
                      onPress= {() => this.setState({itemModalPresented: true})}
                    />
                  <View style={styles.cardContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>How Many Cases?</Text>
                      <View style={styles.textInputContatiner}>
                        <TextInput
                            style={styles.textInput}
                          />
                      </View>
                    </View>
                  </View>
                    <SubmitButton
                      title='Complete Order'
                      onPress= {() => this.goCompleteOrder()}
                      />
                  </View>
                : <SubmitButton
                  title='Choose Store'
                  onPress= {() => this.setState({itemModalPresented: true})}
                  />
              }

          </View>
        </ScrollView>

          <Modal animationType={'slide'} visible={this.state.itemModalPresented} >
            <NewItemOrderModal
              onDismiss={() => this.setState({ itemModalPresented: false })}
              onSelectStore={(store) => this._onSelectStore(store)}
            />
          </Modal>
      </View>
    )
  }
}
export default NewItemScreen;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
   alignItems: 'stretch',
  },
  scrollView: {
    marginTop: 24,
    marginBottom: 12,
  },
  textContainer: {
     flexDirection: 'row', marginBottom: 12, marginTop: 12, 
     marginLeft: 12, marginRight: 12,
  },
  textStyle: {
    fontSize: 18, fontFamily: 'bold', color: 'white', textAlign: 'center',
  },
  textInputContatiner: {
    fontSize: 24, fontFamily: 'regular', color: 'white',
    borderBottomWidth: 2, borderBottomColor: 'white', 
    marginLeft: 10, width: 100,
  },
  textInput: {
    fontSize: 24, fontFamily: 'regular', color: 'white',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.BACKGROUND_DARK_DARKGREY,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 12,
    paddingRight: 12,
    padding: 8,

  },
});
