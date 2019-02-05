import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as Colors from '../theme/colors';
import PropTypes from 'prop-types';

const ItemBox = (props) => (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => {props.onPress()}} style={{flex: 1}}>
          <View style={styles.textContainer} >
            <Text style={styles.bigText}>{props.title}</Text>
            <Text style={styles.smallText}>{props.text}{props.id}</Text>
          </View>

          {(props.hasFeature)
            ? <View style={styles.featureContainer} >
                <Text style={styles.featureText}>{props.featureText}</Text>
               <Text style={styles.featureLabel}>{props.featureLabel}</Text>
              </View>
            : null
          }


      </TouchableOpacity>
    </View>
)
export default ItemBox;

ItemBox.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  onPress: PropTypes.func,
  hasFeature: PropTypes.bool,
  featureValue: PropTypes.string,
  featureColor: PropTypes.string
}

ItemBox.defaultProps = {
  hasFeature: false,
  featureValue: '',
  featureColor: 'orange'
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset:{ width: 0, height: 4 },
    justifyContent:'center',
    margin: 12,
  },
  mainContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'
  },
  featureContainer: {
    flex: 1, backgroundColor: Colors.SECONDARY,
    flexDirection: 'column', alignItems: 'center', justifyContent:'center'
  },
  textContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'stretch',
    margin: 16, 
  },
  featureText: {
    fontSize: 24, fontFamily: 'bold', color: Colors.SECONDARY_DARK,
    textAlign: 'center'
  },
  featureLabel: {
    position: 'relative', top: 8, fontSize: 16, color: Colors.SECONDARY_DARK, fontFamily: 'bold'
  },
  smallText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'bold'
  },
  bigText: {
    fontFamily: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 8
  },
});
