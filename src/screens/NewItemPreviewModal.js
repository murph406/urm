import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet,Image,ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import TextBox from '../components/text-box';
import FilterButton from '../ui-elements/filter-button';
import SubmitButton from '../ui-elements/submit-button';
import CircleButton from '../ui-elements/circle-button';

const FRAME = Dimensions.get('window')

class NewItemPreviewModal extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/sellsheet.png')}
                    resizeMode={'contain'}
                />
                <View style={styles.button}>
                    <CircleButton
                    onPress={() => this.props.onDismissPreview()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        height: FRAME.height,
        width: FRAME.width
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0
    },
    button: {
        position: 'absolute',
        left: 16,
        //right: 0,
         bottom: 16
    }
})
export default NewItemPreviewModal;

//../../assets/images/shellsheet.pdf
