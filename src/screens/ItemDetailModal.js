import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';

import RadioButton from '../ui-elements/radio-button';

class ItemDetailModal extends Component {

  static propTypes = {
    onDismiss: PropTypes.func
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
      ]
    }
  }

  componentDidMount() {

  }

  onSelectRadio = (index) => {
    RadioButton.onSelectExclusive(this.state.options, index, (arr) => {
      this.setState({ options: arr });
    });
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'stretch', margin: 16, marginTop: 50,}}>

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
                      <TextInput placeholder={'Reason'} onChangeText={(text) => this.setState({ otherReason: text})} style={styles.otherInput} />
                    </View>
                  : null
                }

              </View>

          : null
        }

        <View style={styles.submitTouch} >
          <TouchableOpacity style={styles.submitContainer}
            onPress={() => this.props.onDismiss()}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    //alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    padding: 8,

  },
  submitText: {
    fontSize: 28, fontFamily: 'bold', textAlign: 'center', color: 'white'
  },
  submitTouch: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  submitContainer: {
    height: 80,  borderRadius: 8, justifyContent: 'center', alignItems: 'stretch', backgroundColor: Colors.SECONDARY,
  },
  otherContainer: {
    height: 150, justifyContent: 'center',
  },
  otherInput: {
    fontSize: 24, fontFamily: 'regular', color: 'black',
      borderBottomWidth: 2, borderBottomColor: Colors.PRIMARY
  },

  promptText: {
    fontSize: 24, fontFamily: 'bold', color: 'black', textAlign: 'center', marginTop: 30, marginBottom: 30
  },
  yesnoContainer: {
    marginBottom: 38, marginTop: 8, marginLeft: 8,
    marginRight: 8,
    flexDirection: 'row', justifyContent: 'space-around',
  },
  touchContainer: {
   height: 80, width: 120,  borderRadius: 8, justifyContent: 'center', alignItems: 'center'
  },

  onNoTouch: {
    backgroundColor: Colors.BACKGROUND_GREY
  },
  onNoText: {
    fontSize: 28, fontFamily: 'bold', textAlign: 'center', color: Colors.PRIMARY
  },
  onYesTouch: {
    backgroundColor: Colors.SECONDARY
  },
  onYesText: {
    fontSize: 28, fontFamily: 'bold', textAlign: 'center', color: 'white'
  }
})

export default ItemDetailModal;
