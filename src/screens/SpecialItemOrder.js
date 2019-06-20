import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors';

import SpecialItemSelector from '../components/special-item-selector';

const SpecialItemOrder = props => (
  <ScrollView style={styles.container} >
    {(props.items.map((item, index) => (
      <SpecialItemSelector item={item} />
    )))}
  </ScrollView>
)

SpecialItemOrder.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    urm_item_num: PropTypes.string,
    case_upc_num: PropTypes.string,
    pack_size: PropTypes.string,
    description: PropTypes.string,
    case_cost: PropTypes.string,
    net_case: PropTypes.string,
    net_unit: PropTypes.string
  }))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY,
    padding: 32, paddingTop: 120
  }
})

export default SpecialItemOrder;
