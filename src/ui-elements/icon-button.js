import React, { useState } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';


function IconButton(props) {
    const [isIconPressed, toggleButton] = useState(false);
    const { iconSource, iconDimensions, onPress, primaryColor, secondaryColor } = props

    function toggleButtonBackground() {
        toggleButton(!isIconPressed)
    }

    return (
        <TouchableWithoutFeedback
            onPressIn={toggleButtonBackground}
            onPressOut={toggleButtonBackground}
            onPress={onPress}>
            <View style={{
                height: iconDimensions * 1.75,
                width: iconDimensions * 1.75,
                borderRadius: iconDimensions,
                backgroundColor: (isIconPressed) ? secondaryColor : primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    style={{ height: iconDimensions, width: iconDimensions }}
                    source={iconSource}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default IconButton;