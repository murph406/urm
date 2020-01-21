import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { SECONDARY, RED } from '../theme/colors';
import { Fonts } from '../theme/styling';

const addIcon = require('../../assets/icons/add.png')
const subtractIcon = require('../../assets/icons/minus.png')

function IncrementButton(props) {
  let { icon, onPress } = props
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.incrementButton}
      onPress={onPress}>
      <Image
        style={styles.incrementIcon}
        source={icon} />
    </TouchableOpacity>
  )
}

function InfoLabel(props) {
  let { label, value } = props
  return (
    <View style={styles.labelValue}>
      <Text style={Fonts.subHeading}>{label}</Text>
      <Text style={Fonts.subHeading, { color: 'black', fontWeight: 'bold', paddingVertical: 8 }}>{value}</Text>
    </View>
  )
}

function SpecialItemSelector(props) {
  let [count, setCount] = useState(0)
  const { onIncrement } = props
  const { description, pack_size, case_cost, net_case, net_unit } = props.item

  onSubtractValue = () => {
    setCount((count === 0) ? count : --count)
    onIncrement(count)
  }

  onAddValue = () => {
    setCount(++count)
    onIncrement(count)
  }

  return (
    <View style={styles.container} >
      <View style={styles.descriptionContainer}>
        <Text style={[Fonts.subHeading, { color: 'black' }]}>Description: {description}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoPair}>
          <InfoLabel
            label={"Pack/Size:  "}
            value={pack_size} />
          <InfoLabel
            label={"Case Cost:  "}
            value={case_cost} />
        </View>
        <View style={styles.infoPair}>
          <InfoLabel
            label={"Net Case:  "}
            value={net_case} />
          <InfoLabel
            label={"Net Unit:  "}
            value={net_unit} />
        </View>
      </View>
      <View style={styles.incrementContainer} >
        <IncrementButton
          icon={subtractIcon}
          onPress={onSubtractValue} />
        <Text style={[Fonts.headline, { color: 'white' }]}>{count}</Text>
        <IncrementButton
          icon={addIcon}
          onPress={onAddValue} />
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
  labelValue: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  incrementContainer: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY,
    borderRadius: 8
  },
  incrementButton: {
    height: 64,
    width: 100,
    borderRadius: 4,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center'
  },
  incrementIcon: {
    height: 24,
    width: 24,
    tintColor: 'white'
  },
})

export default SpecialItemSelector;



