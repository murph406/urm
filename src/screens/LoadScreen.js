import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Animated } from 'react-native';
import { categories, getByCategory } from '../api/api';
import * as Colors from '../theme/colors';
import { Fonts, DeviceWidth } from '../theme/styling';

const LAST_UPDATED = 1000 * 60 * 60;

export default class LoadScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            progress: 0.0,
        }
        this.animatedBarValue = new Animated.Value(0)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isReady) {
            setTimeout(() => {
                this.props.navigation.navigate('home')
            }, 1000)
        }
    }

    async componentDidMount() {

        const isStale = await this.isDataStale()
        this.setProgressBar(.15)

        if (isStale) {
            this.getData()
        } else {
            this.setProgressBar(1)
            this.setState({ isReady: true })
        }
    }

    setProgressBar(value) {
        let { animatedBarValue } = this

        Animated.timing(animatedBarValue, {
            toValue: value,
            duration: 1200,
        }).start()
    }

    async isDataStale() {
        const val = await AsyncStorage.getItem('key:last_updated')

        if (!val || Date.now() - parseInt(val) >= LAST_UPDATED) {
            console.log('isStale')
            return true;
        }
        return false;
    }

    getData = () => {
        let { animatedBarValue } = this
        let promiseArray = [];

        this.setProgressBar(.4)
        categories.forEach(element => {
            promiseArray.push(getByCategory(element));
        })

        this.setProgressBar(.55)

        Promise.all(promiseArray)
            .then((value) => {
                this.setProgressBar(.8)

                AsyncStorage.setItem('key:last_updated', Date.now().toString(), (err) => {
                    this.setProgressBar(1)
                    this.setState({ isReady: true })
                })
            })
            .catch(err => {
                console.log('Error: ', err)
                this.setProgressBar(1)
                this.setState({ isReady: true })
            });
    }

    render() {
        let { animatedBarValue } = this

        const AnimatedBarInterpolation = animatedBarValue.interpolate({
            inputRange: [0, 1],
            outputRange: [DeviceWidth, 0],
        })

        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <Text style={[Fonts.headline, { color: Colors.BACKGROUND_DARK_GREY, textAlign: 'center', paddingBottom: 32 }]}>Initializing Data...</Text>
                    <View style={styles.progressBar}>
                        <Animated.View style={[styles.progress, { right: AnimatedBarInterpolation }]} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_GREY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    progressBar: {
        borderRadius: 8,
        overflow: 'hidden',
        width: DeviceWidth - 64,
        height: 12,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: Colors.BACKGROUND_LIGHT_GREY
    },
    progress: {
        backgroundColor: Colors.SECONDARY,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0
    }
})