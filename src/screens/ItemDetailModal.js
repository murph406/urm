import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


import * as Colors from '../theme/colors';
import * as API from '../api/api';

import RadioButton from '../ui-elements/radio-button';

class ItemDetailModal extends Component {

  static propTypes = {
    onDismiss: PropTypes.func,
    item: PropTypes.object
  }

  constructor() {
    super();

    this.state = {
      isYes: false,
      options: [
        { value: 'Not enough space', index: 0, isSelected: false },
        { value: 'Too expensive', index: 1, isSelected: false },
        { value: 'Undesired Product', index: 2, isSelected: false },
        { value: 'Other', index: 3, isSelected: false }
      ],
      otherReason: '',
    }
  }

  componentDidMount() {

  }

  onSelectRadio = (index) => {
    RadioButton.onSelectExclusive(this.state.options, index, (arr) => {
      this.setState({ options: arr });
    });
  }

  onSumbit = () => {
    let data = {}
    for (let i = 0; i < this.state.options.length; i++) {
      if(this.state.options[i].isSelected) {

        if (i === this.state.options.length - 1 ) {
          data.otherReason = this.state.otherReason;
        }
        data.reason = this.state.options[i].value
      }
    };

    data.isSale = this.state.isYes
    this.updateItem(data)
  };

  updateItem(data) {
    let outcome = {
      is_success: data.isSale,
      reason: data.reason,
      updated_by: 'user'
    }

    const sender = {
      item_id: this.props.item._id,
      status: outcome
    }

    API.updateItemStatus(sender, (err, result) => {
      if(err) {
        console.log('here m8', err)
      } else {
        console.log(result);
        this.props.onDismiss()
      }
    })
  }

  render() {
    return(
     
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding" 
        enabled
      >
     <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.promptText}>Were You Able To Make This Sale?</Text>


          <View style={styles.yesnoContainer} >
            <TouchableOpacity
              style={[styles.touchContainer, (this.state.isYes) ? styles.onNoTouch : styles.onYesTouch]}
              onPress={() => this.setState({ isYes: false})}
            >
              <Text style={(this.state.isYes) ? styles.onNoText : styles.onYesText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchContainer, (this.state.isYes) ? styles.onYesTouch : styles.onNoTouch]}
              onPress={() => this.setState({ isYes: true })}
            >
              <Text style={(this.state.isYes) ? styles.onYesText : styles.onNoText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>


        {(!this.state.isYes)
          ? <View style={styles.cardContainer}>
                <RadioButton
                  options={this.state.options}
                  onSelectOption={(index) => this.onSelectRadio(index)}
                />
                {(this.state.options[this.state.options.length-1].isSelected)
                  ? <View style={styles.otherContainer} >
                      <TextInput
                        placeholder={'Reason'}
                        placeholderTextColor= {'white'}
                        onChangeText={(otherReason) => this.setState({ otherReason })} 
                        style={styles.otherInput} 
                      />
                    </View>
                  : null
                }

              </View>

          : null
        }
        </ScrollView>
       <View style={styles.submitTouch} >
        <TouchableOpacity style={styles.submitContainer}
            onPress={() => this.onSumbit()}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
       </View>
       
     </KeyboardAvoidingView>  
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'stretch', padding: 16, paddingTop: 54,
    backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY
  },
  cardContainer: {
    borderRadius: 4,
    backgroundColor: Colors.BACKGROUND_DARK_DARKGREY,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    justifyContent: 'center',
    marginTop: 12,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  submitText: {
    fontSize: 18, fontFamily: 'bold', textAlign: 'center', color: 'white'
  },
  submitTouch: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
  },
  submitContainer: {
    height: 54,  borderRadius: 8, justifyContent: 'center', alignItems: 'stretch', backgroundColor: Colors.SECONDARY,
  },
  otherContainer: {
    height: 90, justifyContent: 'center',
  },
  otherInput: {
    fontSize: 18, fontFamily: 'regular', color: 'white',
      borderBottomWidth: 2, borderBottomColor: 'white',
      
  },

  promptText: {
    fontSize: 24, fontFamily: 'bold', color: 'white', textAlign: 'center', marginTop: 12, marginBottom: 12
  },
  yesnoContainer: {
    marginBottom: 12, marginLeft: 12,
    marginRight: 12,
    flexDirection: 'row', justifyContent: 'space-around',
  },
  touchContainer: {
   height: 54, width: 120,  borderRadius: 8, justifyContent: 'center', alignItems: 'center'
  },

  onNoTouch: {
    backgroundColor: Colors.BACKGROUND_GREY
  },
  onNoText: {
    fontSize: 18, fontFamily: 'bold', textAlign: 'center', color: Colors.PRIMARY
  },
  onYesTouch: {
    backgroundColor: Colors.SECONDARY
  },
  onYesText: {
    fontSize: 18, fontFamily: 'bold', textAlign: 'center', color: 'white'
  }
})

export default ItemDetailModal;

