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
                    marginLeft: 12,
                    size: 32
                }}
                clearIcon={{
                    color: textColor,
                    marginRight: 32,
                    size: 32
                }}
                onFocus={onFocus}
                cancelButtonTitle="Cancel"
                placeholderTextColor={textColor}
                inputContainerStyle={{ backgroundColor: primaryColor, height: 64, borderRadius: 32 }}
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
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        shadowOpacity: .5,
        shadowColor: 'rgb(180,180,180)',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 4
    }
})

export default TextField;
