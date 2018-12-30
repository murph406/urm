import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";

import Modal from "react-native-modal";

import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../theme/colors';

export default class ItemInput extends Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible }
    );



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity

            onPress={this._toggleModal}
            >
            <Text style={styles.buttonText}>Tap This</Text>
          </TouchableOpacity>
        </View>


        <Modal
          isVisible={this.state.isModalVisible}>

          <View style={styles.modal}>

          <Text style={styles.text}>Hello! </Text>
          <TextInput
            style={styles.input}
            placeholder=" Type Here"
            placeholderTextColor= '#e53935'
          />
          <TextInput
            style={styles.input}
            placeholder=" Type Here"
            placeholderTextColor= '#e53935'
          />


            <TouchableOpacity
              style={styles.buttonModal}
              onPress={this._toggleModal}>
                <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>

          </View>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: Colors.BACKGROUND_GREY,
    height: 300,
    borderRadius: 4,
  },
  text: {
    color: 'black',
    fontSize: 26,
  },
  input:{
    backgroundColor: 'white',
    height: 40,
    width: 200,
    borderWidth: 1.6,
    borderColor: Colors.SECONDARY,
    borderRadius: 4,
    margin: 6,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',


  },
  buttonModal: {
    width: 100,
    height: 50,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
