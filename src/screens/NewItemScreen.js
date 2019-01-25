import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity, Modal, Picker, TextInput} from 'react-native';

import * as Colors from '../theme/colors';

import TabBar from '../ui-elements/tab-bar';
import TextBox from '../components/text-box';
import NavigationButton from '../ui-elements/nav-button';
import TitleCard from '../ui-elements/title-card';
import SubmitButton from '../ui-elements/submit-button';
import NewItemOrderModal from './NewItemOrderModal'; //NewItemOrderScreen

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

  _onSelectStore(store) {
    this.setState({ selectedStore: store, itemModalPresented: false }, () => {
      console.log(this.state.selectedStore)
    })
  }

  render() {
    return(
      <View style={styles.container}>
          <TabBar text="New Item Order" onGoBack={() => this.props.navigation.goBack()} />

          <ScrollView>
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
                      onPress= {() => this.setState({itemModalPresented: true})}
                      />
                  </View>
                : <SubmitButton
                  title='Choose Store'
                  onPress= {() => this.setState({itemModalPresented: true})}
                  />
              }

          </View>
        </ScrollView>
        <NavigationButton
          onPress={() => this.openDrawer()}
        />

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
   backgroundColor: '#f5f5f5',
   alignItems: 'stretch',
  },
  scrollView: {
    marginTop: 24,
    marginLeft: 16,
    marginRight:16,
    marginBottom: 16,
  },
  textContainer: {
     flexDirection: 'row', marginBottom: 12,
  },
  textStyle: {
    fontSize: 24, fontFamily: 'bold', color: 'black', textAlign: 'center',
  },
  textInputContatiner: {
    fontSize: 24, fontFamily: 'regular', color: 'black',
    borderBottomWidth: 2, borderBottomColor: Colors.PRIMARY, marginLeft: 10, width: 100,
  },
  textInput: {
    fontSize: 24, fontFamily: 'regular', color: 'black',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    padding: 8,

  },
});
