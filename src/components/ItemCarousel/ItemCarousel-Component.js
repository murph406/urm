import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import { styles, DeviceHeight, DeviceWidth } from './ItemCarousel-Styles'
import { Fonts } from '../../theme/styling'
import { SECONDARY, BACKGROUND_DARK_GREY, RED } from '../../theme/colors'

export default class ItemCarouselComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onSelectItem = (item) => () => {
        const { onSelect } = this.props
        onSelect(item)
    }

    renderItems = ({ item, index }) => {

        const { image_url, items, brand } = item

        const content = (
            <TouchableOpacity
                activeOpacity={.7}
                onPress={this.onSelectItem(item)}
                style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: image_url }}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={styles.bottomView}>
                    <Text style={Fonts.headline}>{item.brand}</Text>
                    <Text style={[Fonts.subHeading, { color: 'white' }]}>{brand}</Text>
                    <Text style={[Fonts.subHeading, { color: 'white' }]}>{items.length} Variations</Text>
                </View>
            </TouchableOpacity>
        )
        return content;
    }

    render() {

        const { items } = this.props

        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={items}
                renderItem={this.renderItems}
                sliderWidth={DeviceWidth}
                itemWidth={DeviceWidth}
            />
        )
    }
}


ItemCarouselComponent.propTypes = {

}

ItemCarouselComponent.defaultProps = {

}