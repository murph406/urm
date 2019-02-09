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
                {name: 'Alphabetical',  index: 0, isSelected: false},
                {name: 'Newest', index: 1, isSelected: false},
             
            ],
            filterOptions2: [
                {name: 'YES', index: 0, isSelected: false},
                {name: 'Yup', index: 1, isSelected: false},
                {name: 'Ooh', index: 2, isSelected: false},
            ]
        }
}
  componentDidMount() {

  }

  onSelectFilter = (index) => {
    FilterButton.onSelectItem(this.state.filterOptions, index, (arr) => {
      this.setState({ filterOptions: arr });
    });
  }
  onSelectFilter2 = (index) => {
    FilterButton.onSelectItem(this.state.filterOptions2, index, (arr) => {
      this.setState({ filterOptions2: arr });
    });
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
                onPress={(index) => this.onSelectFilter(index)}
                options={this.state.filterOptions}
            />
            <FilterButton
                onPress={(index) => this.onSelectFilter2(index)}
                options={this.state.filterOptions2}
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
