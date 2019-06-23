import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors';

import SpecialItemSelector from '../components/special-item-selector';
import Field from '../ui-elements/field.js';
import OrderCard from '../components/order-card';
import CircleButton from '../ui-elements/circle-button'

function SpecialItemOrder(props) {
  let [store, setStore] = useState('')
  let [quantity, setQuantity] = useState(0)

  calculate = () => {
    let total = 0
    props.items.forEach((item) => {
      if(item.quantity > 0) {
        total += (item.quantity * Number(item.case_cost))
      }
    })
    setQuantity(total)
  }

  return(
    <ScrollView style={{flex: 1, backgroundColor: Colors.BACKGROUND_GREY}} >
      <View style={{position: 'absolute', left: 16, top: 40, zIndex: 10004}}>
        <CircleButton image={require('../../assets/go-back-icon.png')} onPress={props.onDismiss} />
      </View>
      <View style={styles.container}>
        <Field placeholder={'Store #'} keyboard={'numeric'} updateState={setStore} text={store} />
        <View style={{height: 32}}/>
        {(props.items.map((item, index) => (
          <SpecialItemSelector
            item={item}
            onIncrement={(quantity) => {item.quantity = quantity; this.calculate()}}
            />
        )))}

        <OrderCard cost={quantity.toFixed(2)} />

        <View style={{height: 140, justifyContent: 'center', alignItems: 'center', marginBottom: 100}} >
          <TouchableOpacity style={styles.submit} onPress={() => props.onSubmit(props.items, store)}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>


    </ScrollView>
  )
}

SpecialItemOrder.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    urm_item_num: PropTypes.string,
    case_upc_num: PropTypes.string,
    pack_size: PropTypes.string,
    description: PropTypes.string,
    case_cost: PropTypes.string,
    net_case: PropTypes.string,
    net_unit: PropTypes.string
  })),
  onSubmit: PropTypes.func,
  onDismiss: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY,
    padding: 32, paddingTop: 120
  },
  submit: {
    height: 54, width: 300, backgroundColor: Colors.SECONDARY,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 4, overflow: 'hidden'
  },
  text: {
    textAlign: 'center', fontSize: 24, color: 'white',
    fontFamily: 'bold'
  }
})

export default SpecialItemOrder;
