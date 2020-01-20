import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'

import { Fonts } from '../theme/styling'

function TextField(props) {

    const [search, updateSearch] = useState(0)
    const { onFocus, primaryColor, secondaryColor, textColor, placeHolderText, onChangeText } = props

    function onChangeSearch(text) {
        updateSearch(text)
        onChangeText(text)
    }

    return (
        <View style={{ backgroundColor: secondaryColor }}>
            <SearchBar
                placeholder={placeHolderText}
                round={true}
                searchIcon={{
                    color: textColor,
                    size: 24
                }}
                clearIcon={{
                    color: textColor,
                    size: 24
                }}
                onFocus={onFocus}
                cancelButtonTitle="Cancel"
                placeholderTextColor={textColor}
                inputContainerStyle={{ backgroundColor: primaryColor }}
                containerStyle={[styles.searchContainer, { backgroundColor: secondaryColor }]}
                inputStyle={Fonts.subHeading}
                onChangeText={onChangeSearch}
                value={search}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    searchContainer: {
        borderWidth: 0,
        shadowColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    }
})

export default TextField;
