import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors';

const OrderCard = props => (
  <View style={styles.card}>
    <Text style={styles.total}>Total</Text>
    <Text style={styles.cost}>${props.cost}</Text>
  </View>
)

OrderCard.propTypes = {
  cost: PropTypes.string
}

OrderCard.defaultProps = {
  cost: '0.00'
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    margin: 16, borderRadius: 4,
    backgroundColor: Colors.BACKGROUND_GREY, overflow: 'visible',
    shadowOffset:{  width: 0,  height: 0  }, shadowRadius: 12,
    shadowColor: 'rgb(100,100,100)',
    shadowOpacity: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center'
  },
  total: {
    fontSize: 28, fontFamily: 'bold',
  },
  cost: {
    fontSize: 24, fontFamily: 'bold',
    color: Colors.GREEN
  }
})

export default OrderCard
