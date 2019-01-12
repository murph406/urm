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
      <View style={{flex: 1}}>

        <View style={{height: 64}}/>

        <View style={styles.promptContainer} >
          <Text style={styles.promptText}>Were you able to make the sale?</Text>
        </View>

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

        {(!this.state.isYes)
          ? <View style={styles.radioContainer} >
              <RadioButton options={this.state.options} onSelectOption={(index) => this.onSelectRadio(index)} />
              {(this.state.options[this.state.options.length-1].isSelected)
                ? <View style={styles.otherContainer} >
                    <TextInput placeholder={'Reason'} onChangeText={(text) => this.setState({ otherReason: text})} style={styles.otherInput} />
                  </View>
                : null
              }
            </View>
          : null
        }

        <View style={styles.submitContainer} >
          <TouchableOpacity style={styles.submitTouch} 
            onPress={() => this.props.onDismiss()}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.BACKGROUND_GREY, alignItems: 'stretch'
  },
  submitText: {
    fontSize: 28, fontFamily: 'bold', textAlign: 'center', color: 'white'
  },
  submitTouch: {
    flex: 1, borderRadius: 8, backgroundColor: Colors.SECONDARY_DARK, justifyContent: 'center', alignItems: 'center'
  },
  submitContainer: {
    height: 80, margin: 16, justifyContent: 'center', alignItems: 'stretch'
  },
  otherContainer: {
    margin: 8, height: 64, marginLeft: 8, marginRight: 8
  },
  otherInput: {
    marginLeft: 16, marginRight: 16, width: 300,
    fontSize: 16, fontFamily: 'regular', color: 'black',
    borderBottomWidth: 2, borderBottomColor: Colors.PRIMARY
  },
  radioContainer: {
    flex: 2, marginTop: 32, alignItems: 'center',
  },
  promptContainer: {
    margin: 16
  },
  promptText: {
    fontSize: 24, fontFamily: 'bold', color: 'black', textAlign: 'center'
  },
  yesnoContainer: {
    height: 80, marginLeft: 16, marginRight: 16, marginTop: 40, borderRadius: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'
  },
  touchContainer: {
    margin: 8, borderRadius: 8, flex: 1, justifyContent: 'center', alignItems: 'center'
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
