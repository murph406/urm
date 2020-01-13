import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { BACKGROUND_GREY, SECONDARY } from '../theme/colors';
import { Fonts } from '../theme/styling'

import SpecialItemSelector from '../components/special-item-selector';
import Field from '../ui-elements/field.js';
import OrderCard from '../components/order-card';
import CircleButton from '../ui-elements/circle-button'

function SpecialItemOrder(props) {

  let [store, setStore] = useState('')
  let [quantity, setQuantity] = useState(0)
  const { items, onDismiss, onSubmit } = props

  calculateTotal = () => {
    let total = 0

    items.forEach((item) => {
      if (item.quantity > 0) {
        total += (item.quantity * Number(item.case_cost))
      }
    })
    setQuantity(total)
  }

  onSubmitOrder = () => {
    onSubmit(items, store)
  }

  return (
    <View style={styles.scrollViewContainer} >
      <View style={{ position: 'absolute', left: 16, top: 40, zIndex: 10004 }}>
        <CircleButton
          image={require('../../assets/go-back-icon.png')}
          onPress={onDismiss}
        />
      </View>
      <ScrollView style={styles.container}>
        <Field
          placeholder={'Store #'}
          keyboard={'numeric'}
          updateState={setStore}
          text={store} />

        <View style={{ height: 32 }} />

        <FlatList
          data={items}
          renderItem={(item, index) => (
            <SpecialItemSelector
              item={item}
              onIncrement={(quantity) => { item.quantity = quantity; calculateTotal() }}
            />
          )}/>

        <OrderCard cost={quantity.toFixed(2)} />

        <View style={styles.submitButtonContainer} >
          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSubmitOrder}>
            <Text style={Fonts.headline}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  scrollViewContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
    padding: 16,
    paddingTop: 140
  },
  submitButtonContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200
  },
  submitButton: {
    height: 54,
    width: 300,
    backgroundColor: SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden'
  },
})

export default SpecialItemOrder;
