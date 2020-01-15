import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';

import { BACKGROUND_GREY, SECONDARY, BACKGROUND_LIGHT_GREY, BACKGROUND_DARK_GREY } from '../theme/colors';
import { Fonts, isScreenLarge, DeviceWidth, HeaderHeight } from '../theme/styling'

import SpecialItemSelector from '../components/special-item-selector';
import Field from '../ui-elements/field.js';
import OrderCard from '../components/order-card';
import IconButton from '../ui-elements/icon-button'

const filterIconSize = (isScreenLarge) ? 32 : 28

function SubmitButton(props) {
  let { text, onPress } = props
  return (
    <View style={styles.submitButtonContainer} >
      <TouchableOpacity
        style={styles.submitButton}
        onPress={onPress}>
        <Text style={Fonts.headline}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}


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
    <View style={styles.container} >
      <StatusBar hidden={true} />
      <View style={styles.headerContainer}>
        <View style={styles.headerIcon}>
          <IconButton
            iconSource={require('../../assets/X-icon-white.png')}
            iconDimensions={filterIconSize}
            primaryColor={BACKGROUND_LIGHT_GREY}
            secondaryColor={BACKGROUND_DARK_GREY}
            onPress={onDismiss}
          />
        </View>
        <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY, paddingTop: 12, textAlign: 'center' }]}>Order Item</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <Field
          label={'Store Number :'}
          placeholder={'Ex. 1234'}
          keyboard={'numeric'}
          updateState={setStore}
          text={store} />

        <FlatList
          data={items}
          renderItem={(item, index) => (
            <SpecialItemSelector
              item={item}
              onIncrement={(quantity) => { item.quantity = quantity; calculateTotal() }}
            />
          )} />

        <OrderCard
          cost={quantity.toFixed(2)} />

        <SubmitButton
          onPress={onSubmitOrder}
          text={"Submit"} />
      </ScrollView>
    </View >
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
    backgroundColor: BACKGROUND_GREY
  },
  headerContainer: {
    width: DeviceWidth,
    height: HeaderHeight * 1.5,
    backgroundColor: BACKGROUND_GREY,
    paddingTop: HeaderHeight * .5,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: 'center'
  },
  headerIcon: {
    position: 'absolute',
    left: 16,
    top: HeaderHeight * .5
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
    padding: 16,
  },
  submitButtonContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    height: 54,
    width: 300,
    backgroundColor: SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden'
  },
})

export default SpecialItemOrder;
