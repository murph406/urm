import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import TextBox from '../components/text-box';
import SubmitButton from '../ui-elements/submit-button';


class NewItemOrderScreen extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.textView}>
           <Text>HEllo</Text>
          <View>
            <SubmitButton
            title='Close'
            onPress={() => this.props.onDismiss()}
            />
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'stretch',
   backgroundColor: '#f5f5f5',

  },
 textView: {
   marginTop: 40,
   marginLeft: 12,
   marginRight: 12,
 }
});

var mapStateToProps = state => {
  return {
    stores: state.user.user.stores
  }
}

export default connect(mapStateToProps)(NewItemOrderScreen);
