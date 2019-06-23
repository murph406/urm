import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Colors from '../theme/colors';

function SpecialItemSelector(props) {
  let [count, setCount] = useState(0)

  useEffect(() => {
    props.onIncrement(count)
  })

  return(
    <View style={styles.container} >
      <View style={styles.title}>
        <Text style={[styles.text, { color: 'black'}]}>{props.item.description}</Text>
      </View>
      <View style={styles.infoContainer} >
        {/*<Text style={styles.text}>URM Item Num: {props.item.urm_item_num}</Text>
        <Text style={styles.text}>Case UPC Num: {props.item.case_upc_num}</Text>*/}
        <View style={styles.infoPair}>
          <Text style={styles.text}>Pack/Size: {props.item.pack_size}</Text>
          <Text style={styles.text}>Case Cost: {props.item.case_cost}</Text>
        </View>
        <View style={styles.infoPair}>
          <Text style={styles.text}>Net Case: {props.item.net_case}</Text>
          <Text style={styles.text}>Net Unit: {props.item.net_unit}</Text>
        </View>
      </View>
      <View style={styles.incrementer} >
        <TouchableOpacity style={styles.button} onPress={() => setCount((count === 0) ? count : --count)}>
          <Image style={styles.image} source={require('../../assets/icons/minus.png')} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontFamily:'bold', fontSize:24, color: 'white'}]}>{count}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setCount(++count)}>
          <Image style={styles.image} source={require('../../assets/icons/add.png')} />
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
  }),
  onIncrement: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND_GREY,//'rgb(180, 180, 180)',
    height: 200, borderRadius: 4, marginBottom: 32,
    shadowOffset:{  width: 0,  height: 0,  }, shadowRadius: 12,
    shadowColor: Colors.BACKGROUND_LIGHT_DARKGREY,
    shadowOpacity: 0.4,
  },
  infoContainer: {
    flex: 3, justifyContent: 'center'
  },
  text: {
    fontSize: 18, fontFamily: 'bold', textAlign: 'center', color: Colors.BACKGROUND_DARK_DARKGREY, margin: 4
  },
  title: {
    height: 48, justifyContent: 'center', alignItems: 'center',
    borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: Colors.BACKGROUND_GREY
  },
  infoPair: {
    flexDirection: 'row', justifyContent: 'space-around'
  },
  image: {
    height: 32, width: 32, tintColor: 'white'
  },
  incrementer: {
    height: 64, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: Colors.SECONDARY_DARK, borderBottomLeftRadius: 4, borderBottomRightRadius: 4
  },
  button: {
    height: 48, width: 64, borderRadius: 4,
    backgroundColor: Colors.SECONDARY,
    justifyContent: 'center', alignItems: 'center'
  }
})

export default SpecialItemSelector;
