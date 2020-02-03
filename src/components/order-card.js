import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { SECONDARY } from '../theme/colors';
import { Fonts } from '../theme/styling';

function OrderCard(props) {
  let { cost } = props;

  return (
    <View style={styles.card}>
      <Text style={[Fonts.headline, { color: 'black' }]}>Total:</Text>
      <Text style={[Fonts.headline, { color: SECONDARY }]}>${cost}</Text>
    </View>
  )
}

OrderCard.propTypes = {
  cost: PropTypes.string
}

OrderCard.defaultProps = {
  cost: '0.00'
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    borderRadius: 8,
    backgroundColor: "white",
    overflow: 'visible',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})

export default OrderCard
