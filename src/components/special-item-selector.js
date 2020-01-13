import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { SECONDARY, RED, BACKGROUND_DARK_GREY, BACKGROUND_GREY, BACKGROUND_LIGHT_GREY } from '../theme/colors';
import { Fonts } from '../theme/styling';

const addIcon = require('../../assets/icons/add.png')
const subtractIcon = require('../../assets/icons/minus.png')

function IncrementButton(props) {

  let { icon, onPress } = props

  return (
    <TouchableOpacity
      activeOpacity={.7}
      style={styles.button}
      onPress={onPress}>
      <Image
        style={styles.incrementIcon}
        source={icon} />
    </TouchableOpacity>
  )
}

function SpecialItemSelector(props) {
  let [count, setCount] = useState(0)
  const { onIncrement } = props
  const { description, pack_size, case_cost, net_case, net_unit } = props.item.item


  useEffect(() => {
    onIncrement(count)
  })

  return (
    <View style={styles.container} >
      <View style={styles.descriptionContainer}>
        <Text style={[Fonts.subHeading, { color: 'black' }]}>Description: {description}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoPair}>
          <View style={styles.labelValue}>
            <Text style={styles.label}>Pack/Size:  </Text>
            <Text style={styles.value}>{pack_size}</Text>
          </View>

          <View style={styles.labelValue}>
            <Text style={styles.label}>Case Cost:  </Text>
            <Text style={styles.value}>${case_cost}</Text>
          </View>
        </View>

        <View style={styles.infoPair}>
          <View style={styles.labelValue}>
            <Text style={styles.label}>Net Case:  </Text>
            <Text style={styles.value}>${net_case}</Text>
          </View>

          <View style={styles.labelValue}>
            <Text style={styles.label}>Net Unit:  </Text>
            <Text style={styles.value}>{net_unit}</Text>
          </View>
        </View>
      </View>

      <View style={styles.numberIncrementers} >
        <IncrementButton
          icon={subtractIcon}
          onPress={() => setCount((count === 0) ? count : --count)}/>
        <Text style={[Fonts.headline, { color: 'white' }]}>{count}</Text>
        <IncrementButton
          icon={addIcon}
          onPress={() => setCount(++count)}/>
      </View>
    </View>
  )
}

SpecialItemSelector.propTypes = {
  item: PropTypes.shape({
    urm_item_num: PropTypes.string,
    case_upc_num: PropTypes.string,
    pack_size: PropTypes.string,
    description: PropTypes.string,
    case_cost: PropTypes.string,
    net_case: PropTypes.string,
    net_unit: PropTypes.string
  }),
  onIncrement: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 250,
    borderRadius: 8,
    marginBottom: 32,
  },
  descriptionContainer: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    color: BACKGROUND_DARK_GREY,
    margin: 4,
    fontFamily: 'bold',
    textAlign: 'center',
    color: BACKGROUND_LIGHT_GREY,
    opacity: 0.7
  },
  labelValue: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'bold',
    textAlign: 'center'
  },

  infoPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16, marginRight: 16
  },
  incrementIcon: {
    height: 24,
    width: 24,
    tintColor: 'white'
  },
  numberIncrementers: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY,
   borderRadius: 8
  },
  button: {
    height: 64,
    width: 100,
    borderRadius: 4,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SpecialItemSelector;



