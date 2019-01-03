import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Modal, TextInput } from "react-native";

// import Modal from "react-native-modal";

import * as UserActions from '../action-types/user-action-types';
import * as Colors from '../theme/colors';

export default class ItemInput extends Component {
  constructor() {
   super();
  this.state = {
    isModalVisible: false,
    isInuputVisable: false
  }
}
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible }
    )

  toggleInput = () =>
    this.setState({ isInuputVisable: !this.state.isInuputVisable}
    )


  render() {
    const Input = this.state.isInuputVisable;
    let textbox;

    if (Input) {
      textbox = <TextInput
        style={styles.inputBox}
        placeholder=" Type Here"
        placeholderTextColor= '#e53935'
      />;
    } else {
      textbox = null ;
    }

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={this.toggleModal}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Tap This</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.isModalVisible}>
            <View style={styles.modal}>
              <Text style={styles.text}>Input Info </Text>
              <Text>Is the Product on the Shelf</Text>

            <View style={styles.inputButtonView}>
                <TouchableOpacity
                      style={styles.inputButton}
                      onPress={this.toggleInput}
                      >
                      <Text style={styles.buttonText}> No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.inputButton}>
                      <Text style={styles.buttonText}> Yes</Text>
                  </TouchableOpacity>
              </View>
              {textbox}

              <View style={styles.bottomButtonView}>
                <TouchableOpacity
                  style={styles.bottomButtonExit }
                  onPress={this.toggleModal}>
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomButtonSubmit}>
                    <Text style={styles.buttonText}> Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: Colors.BACKGROUND_GREY,
    height: 700,
    borderRadius: 4,
  },
  inputButtonView: {
    flexDirection: 'row',
  },
  inputButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  inputBox:{
    backgroundColor: 'white',
    height: 80,
    width: 300,
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
  bottomButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 10,
  },
  bottomButtonExit: {
    width: 100,
    height: 50,
    borderRadius: 4,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonSubmit: {
    width: 100,
    height: 50,
    borderRadius: 4,
    backgroundColor: Colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 26,
  },
});
