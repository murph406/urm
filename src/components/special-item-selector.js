import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '../theme/colors';

function SpecialItemSelector(props) {
  let [count, setCount] = useState(0)

  return(
    <View style={styles.container} >
      <View style={styles.title}>
        <Text style={styles.text}>Description: {props.item.description}</Text>
      </View>
      <View style={styles.infoContainer} >
        <Text style={styles.text}>URM Item Num: {props.item.urm_item_num}</Text>
        <Text style={styles.text}>Case UPC Num: {props.item.case_upc_num}</Text>
        <Text style={styles.text}>Pack/Size: {props.item.pack_size}</Text>
        <Text style={styles.text}>Case Cost: {props.item.case_cost}</Text>
        <Text style={styles.text}>Net Case: {props.item.net_case}</Text>
        <Text style={styles.text}>Net Unit: {props.item.net_unit}</Text>
      </View>
      <View style={styles.incrementer} >
        <TouchableOpacity style={styles.button} onPress={() => setCount((count === 0) ? count : --count)}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.text, { fontFamily:'bold', fontSize:24}]}>{count}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setCount(++count)}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
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
  })
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREEN,
    height: 300, borderRadius: 4, marginBottom: 32,
    shadowOffset:{  width: 4,  height: 4,  },
    shadowColor: Colors.BACKGROUND_LIGHT_DARKGREY,
    shadowOpacity: 0.3,
  },
  infoContainer: {
    flex: 3, justifyContent: 'center'
  },
  text: {
    fontSize: 18, fontFamily: 'bold', textAlign: 'center', color: 'white', margin: 4
  },
  title: {
    height: 48, justifyContent: 'center', alignItems: 'center',
    borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: 'rgb(200,200,200)'
  },
  incrementer: {
    height: 64, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: 'rgb(200,200,200)', borderBottomLeftRadius: 4, borderBottomRightRadius: 4
  },
  button: {
    height: 48, width: 64, borderRadius: 4,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center', alignItems: 'center'
  }
})

export default SpecialItemSelector;
