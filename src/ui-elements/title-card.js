import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';


const TitleCard = (props) => (
    <View style={styles.container} >

        <Text style={styles.bigText}>{props.title}</Text>

        <View style={styles.infoContainer} >
          {(props.info.map((detail, index) => (
            <View style={styles.detail} >
              <Text style={styles.smallText}>{detail.label}  {detail.value}</Text>
            </View>
          )))}
        </View>
    </View>
)
TitleCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  info: PropTypes.array
}
TitleCard.defaultProps = {
  info: [],
  price: ''
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: Colors.BACKGROUND_DARK_DARKGREY,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    alignItems: 'stretch',
    padding: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom:6,
    marginTop: 6,
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 20,
    color: 'rgb(220,220,220)',
    fontFamily: 'bold',
    marginBottom: 12,
  },
  bigText: {
    backgroundColor: 'transparent',
    fontFamily: 'bold',
    fontSize: 32,
    color: 'white',

  },
  featureText: {
    fontSize: 24, textAlign: 'center'
  },
});

export default TitleCard;
