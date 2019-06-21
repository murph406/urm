import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as OrderActions from '../action-types/order-action-types'
import * as Colors from '../theme/colors'

class StoreInfoOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storeNum: '',
      address: '',
      city: '',

    }
  }

  componentDidMount() {

  }

  onSubmit = () => {
    console.log(this.props)
    this.props.dispatch({
      type: OrderActions.SET_STORE_INFO,
      store: { storeNum: this.state.storeNum }
    })
    // this.props.navigation.navigate('orderPreview')
  }

  fieldFactory(placeholder, text, updateState, keyboard='default') {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={Colors.SECONDARY} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          onChangeText={(text) => updateState(text)}
          value={text}
          returnKeyType={'next'}
          keyboardType={keyboard}
        />
      </View>
    )
  }


  render() {
    return(
      <View style={styles.container} >
        {this.fieldFactory('Store #', this.state.storeNum, (text) => this.setState({ storeNum: text }), 'numeric')}
        <TouchableOpacity style={styles.submit} onPress={this.onSubmit}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.BACKGROUND_GREY,
    justifyContent: 'center'
  },
  fieldContainer: {
    marginLeft: 32, marginRight: 32, marginBottom: 32,
    height: 64, justifyContent: 'center',
    borderBottomColor: Colors.SECONDARY, borderBottomWidth: 2
  },
  field: {
    color: Colors.SECONDARY, fontSize: 24, fontFamily: 'bold'
  },
  submit: {
    height: 54, width: 300, backgroundColor: Colors.SECONDARY,
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
    borderRadius: 4, overflow: 'hidden'
  },
  text: {
    textAlign: 'center', fontSize: 24, color: 'white',
    fontFamily: 'bold'
  }
})

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(StoreInfoOrder)
