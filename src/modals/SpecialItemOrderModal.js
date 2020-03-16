import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, FlatList, Text } from 'react-native';

import { BACKGROUND_GREY, SECONDARY, SECONDARY_DARK } from '../theme/colors';
import { isScreenLarge } from '../theme/styling'
import { ModalContainer, TextButton } from './Modal-Ui-Elements'

import SpecialItemSelector from '../components/special-item-selector';
import Field from '../ui-elements/field.js';
import OrderCard from '../components/order-card';

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
    onDismiss()
  }

  return (
    <ModalContainer
      isRightIconDisabled={true}
      leftOnPress={onDismiss}
      leftIconSource={require('../../assets/icons/X-icon-white.png')}
      headerText={'Order Item'}>

      <ScrollView style={styles.scrollViewContainer}>
        <Field
          label={'Store Number :'}
          placeholder={'Ex. 1234'}
          keyboard={'numeric'}
          updateState={setStore}
          text={store} />

        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <SpecialItemSelector
              item={item}
              onIncrement={(quantity) => { item.quantity = quantity; calculateTotal() }} />
          )} />

        <OrderCard cost={ quantity.toFixed(2)} />

        <View style={{ marginBottom: 160 }} />
      </ScrollView>
      <View style={styles.submitButtonPosition}>
        <TextButton
          text={'Submit'}
          secondaryColor={SECONDARY_DARK}
          primaryColor={SECONDARY}
          onPress={onSubmitOrder}
        />
      </View>
    </ModalContainer>

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
    backgroundColor: BACKGROUND_GREY,
    paddingVertical: 16,
    paddingHorizontal: (isScreenLarge) ? 16 * 8 : 16
  },
  submitButtonPosition: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    left: 32
  }
})

export default SpecialItemOrder;
