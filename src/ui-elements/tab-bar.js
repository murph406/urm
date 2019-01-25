import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as Colors from '../theme/colors';


const TabBar = (props) => (
  <View style={styles.container}>
    <View style={styles.tabBar}>


        <View style={styles.textContainer}>
            {(props.hasBackButton)
              ? <TouchableOpacity
                  onPress={() => props.onGoBack()}
                >
                  <Image
                    style={styles.icon}
                    source={require('../../assets/go-back-icon.png')}
                  />

                </TouchableOpacity>
              : null
            }
            <Text style={styles.font}>{props.text}</Text>
          </View>
    </View>
  </View>
)

TabBar.propTypes = {
  hasBackButton: PropTypes.bool,
  onGoBack: PropTypes.func
}

TabBar.defaultProps = {
  hasBackButton: true
}



export default TabBar;



const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: Colors.SECONDARY,
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    shadowOffset:{width: 0, height: 5},
  },
  font: {
    fontFamily: 'regular',
    fontSize: 32,
    color: 'white',
  },
  tabBar: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20
  }
});
