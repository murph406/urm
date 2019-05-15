import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import * as Colors from '../theme/colors';

const FRAME = Dimensions.get('window')

class ItemCarousel extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      cost: PropTypes.string,
      unit: PropTypes.string,
      exclusiveGroups: PropTypes.array,
      variations: PropTypes.array
    }))
  }

  renderItem({ item, index }) {
    console.log('ayoooo')
    return (
      <View style={styles.item} >
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'stretch'}}>
          <Image style={{ width: FRAME.width - 64, flex: 1}} source={item.image} resizeMode={'center'} />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.title, {fontSize: 18}]}>${item.cost} per {item.unit}</Text>
          <Text style={[styles.title, {fontSize: 18}]}>Whole Foods</Text>
        </View>
      </View>
    )
  }

  render() {
    return(
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.items}
          renderItem={this.renderItem}
          sliderWidth={FRAME.width}
          itemWidth={FRAME.width - 64}
        />
    )
  }

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
