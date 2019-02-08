import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import TextBox from '../components/text-box';
import FilterButton from '../ui-elements/filter-button';



class FilterItemModal extends Component {
    constructor() {
        super();
        this.state = {
            filterOptions: [
                {name: 'Alphabetical', isSelected: false},
                {name: 'Newest', isSelected: false},
            ],
            filterOptions2: [
                {name: 'YES', isSelected: false},
                {name: 'YES', isSelected: false},
                {name: 'YES', isSelected: false},
            ]
        }
}
  componentDidMount() {

  }

  render() {
    return(
      <View style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => this.props.onDismissFilter()}
            >
                <Text style={styles.headerText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.headerText}>Apply</Text>
            </TouchableOpacity>
           </View>
           <View style={styles.filterContainer}>
            <FilterButton
                onPress={() => this.setState({isSelected: true})}
                options={this.state.filterOptions}
            />
           </View>
         </View>

      </View>
    )
  }
}

FilterItemModal.propTypes = {
  onSelectStore: PropTypes.func,
  onDismiss: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'stretch',
   backgroundColor: Colors.BACKGROUND_DARK_LIGHTGREY,
   paddingTop: 54,
   paddingRight: 12,
   paddingLeft: 12,
   paddingBottom: 12,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
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

export default connect(mapStateToProps)(FilterItemModal);
