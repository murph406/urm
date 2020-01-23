import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { SECONDARY, RED } from '../theme/colors';
import * as Colors from '../theme/colors';
import { Fonts } from '../theme/styling';

const addIcon = require('../../assets/icons/add.png')
const subtractIcon = require('../../assets/icons/minus.png')

function IncrementButton(props) {
    let { icon, onPress } = props

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.incrementButton}
            onPress={onPress}>
            <Image
                style={styles.incrementIcon}
                source={icon} />
        </TouchableOpacity>
    )
}

function InfoLabel(props) {
    let { label, value } = props

    return (
        <View style={styles.labelValue}>
            <Text style={Fonts.subHeading}>{label}</Text>
            <Text style={Fonts.subHeading, { color: 'black', fontWeight: 'bold', paddingVertical: 8 }}>{value}</Text>
        </View>
    )
}

function ItemSelector(props) {
    let { item } = props;

    let [count, setCount] = useState(0)
    let [total, setTotal] = useState(0.00)
    const { onIncrement } = props
    const { billing_price } = props.item

    onSubtractValue = () => {
        setCount((count === 0) ? count : --count)
        onIncrement(count)
        setTotal(count * billing_price)
    }

    onAddValue = () => {
        setCount(++count)
        onIncrement(count)
        setTotal(count * billing_price)
    }

    return (
        
        <View style={[styles.orderItemContainer, { height: 300 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={[Fonts.headline, { color: 'black' }]}>{item.item_description}</Text>
                <TouchableOpacity onPress={props.removeItem}>
                    <Text style={[Fonts.display, { color: SECONDARY }]}>Delete</Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 64 }}>
                <View style={styles.card}>
                    <Text style={[Fonts.headline, { color: 'black'}]}>Total:</Text>
                    <Text style={[Fonts.headline, { color: SECONDARY}]}>${total.toFixed(2)}</Text>
                </View>
            </View>

            <View style={{ position: 'absolute', right: 0, left: 0, bottom: 0 }}>
                <View style={styles.incrementContainer} >
                    <IncrementButton
                        icon={subtractIcon}
                        onPress={onSubtractValue} />
                    <Text style={[Fonts.headline, { color: 'white' }]}>{count}</Text>
                    <IncrementButton
                        icon={addIcon}
                        onPress={onAddValue} />
                </View>
            </View>
        </View>


        
    )
}

ItemSelector.propTypes = {
    item: PropTypes.shape({
        urm_item_num: PropTypes.string,
        case_upc_num: PropTypes.string,
        pack_size: PropTypes.string,
        description: PropTypes.string,
        case_cost: PropTypes.string,
        net_case: PropTypes.string,
        net_unit: PropTypes.string
    }),
    onIncrement: PropTypes.func
}

const styles = StyleSheet.create({
    incrementContainer: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        overflow: 'hidden'
    },
    incrementButton: {
        height: 64,
        width: 100,
        borderRadius: 4,
        backgroundColor: RED,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incrementIcon: {
        height: 24,
        width: 24,
        tintColor: 'white'
    },
    card: {
        height: 80,
        borderRadius: 8,
        backgroundColor: "white",
        overflow: 'visible',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
    orderItemContainer: {
        backgroundColor: 'white',
        flex: 1,
        padding: 32,
        shadowOpacity: .5,
        shadowColor: Colors.BACKGROUND_DARK_GREY,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        borderRadius: 8,
        marginHorizontal: 16
      },
})

export default ItemSelector;



