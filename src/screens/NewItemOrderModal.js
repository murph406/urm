import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import TextBox from '../components/text-box';
import SubmitButton from '../ui-elements/submit-button';



class NewItemOrderModal extends Component {

  componentDidMount() {
    console.log(this.props.stores);

  }

  render() {
    return(
      <View style={styles.container}>
          <ScrollView>
            <View >
              {(this.props.stores.map((model, index)=>
                <TextBox
                  onPress={()=> this.props.onSelectStore(model)}
                  title= {model.name}
                  text={'Store ID: '+ model.store_id}
                />
              ))}
           </View>
         </ScrollView>

        <View style={styles.submitButton}>
          <SubmitButton
            title='Close'
            onPress={() => this.props.onDismiss()}
          />
        </View>
      </View>
    )
  }
}

NewItemOrderModal.propTypes = {
  onSelectStore: PropTypes.func,
  onDismiss: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'stretch',
   backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
   paddingTop: 54,
  },
  cardContainer: {
   height: 120,
   borderRadius: 4,
   backgroundColor: 'white',
   shadowOpacity: 0.2,
   shadowColor: 'black',
   shadowRadius: 4,
   shadowOffset:{ width: 0, height: 4 },
   justifyContent:'center',
   marginBottom: 12,
   marginLeft: 12,
   marginRight: 12,
  },
  submitButton: {
    position: 'absolute',
    bottom: 24,
    right: 36,
    left: 36,
  },
});

var mapStateToProps = state => {
  return {
    stores: state.user.user.stores
  }
}

export default connect(mapStateToProps)(NewItemOrderModal);
