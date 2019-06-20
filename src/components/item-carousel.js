import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import * as Colors from '../theme/colors';

const FRAME = Dimensions.get('window')

function renderItem({ item, index }, onSelect) {
  console.log(item)
  return (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)} >
      <View style={{flex: 4, justifyContent: 'center', alignItems: 'stretch'}}>
        <Image style={{ width: FRAME.width - 64, flex: 1}} source={{uri: item.image_url}} resizeMode={'center'} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.title}>{item.brand}</Text>
        <Text style={[styles.title, {fontSize: 18}]}>{item.brand}</Text>
        <Text style={[styles.title, {fontSize: 18}]}>{item.items.length} Variations</Text>
      </View>
    </TouchableOpacity>
  )
}

const ItemCarousel = props => (
  <Carousel
    ref={(c) => { _carousel = c; }}
    data={props.items}
    renderItem={(item) => renderItem(item, props.onSelect)}
    sliderWidth={FRAME.width}
    itemWidth={FRAME.width - 64}
  />
  )

ItemCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.string,
    unit: PropTypes.string,
    exclusiveGroups: PropTypes.array,
    variations: PropTypes.array
  })),
  onSelect: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1, overflow: 'hidden'
  },
  item: {
    flex: 1, backgroundColor: 'white',
    justifyContent: 'center', alignItems:'stretch',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 8},
    shadowRadius: 12,
    shadowOpacity: 0.5,
    marginBottom: 16
  },
  image: {
    flex: 1, justifyContent:'center',alignItems:'center'
  },
  bottomView: {
    flex: 1,
    backgroundColor: Colors.GREEN,
    padding: 16, justifyContent: 'space-around', borderBottomLeftRadius: 4, borderBottomRightRadius: 4,
  },
  title: {
    fontFamily: 'bold', color: 'white',
    fontSize: 28,
  }
})

export default ItemCarousel
