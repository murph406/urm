import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import { BACKGROUND_LIGHT_GREY } from '../../theme/colors'
import { styles, DeviceWidth } from './ItemCarousel-Styles'
import { Fonts } from '../../theme/styling'

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

    getEmptyFlatlistView() {
        let contents = (
            <View style={styles.emptyFlatlistContainer}>
                <Text style={[Fonts.headline, { color: BACKGROUND_LIGHT_GREY }]}>Sorry, No Results</Text>
            </View>
        )
        return contents
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
                    <Text style={[Fonts.headline, { color: 'white'}]}>{item.brand}</Text>
                    <Text style={[Fonts.subHeading, { color: 'white' }]}>{brand}</Text>
                    <Text style={[Fonts.subHeading, { color: 'white' }]}>{items.length} Variations</Text>
                </View>
            </TouchableOpacity>
        )
        return content;
    }

    render() {

        const { items } = this.props
        const emptyFlatlistVeiw = this.getEmptyFlatlistView()

        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={items}
                ListEmptyComponent={emptyFlatlistVeiw}
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