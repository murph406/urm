import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Dimensions } from 'react-native';

import { categories, getByCategory } from '../api/api';
// import { getByCategory } from './src/api/api'
import * as Colors from '../theme/colors';

const LAST_UPDATED = 1000*60 * 60;
const FRAME = Dimensions.get('window')

export default class LoadScreen extends Component {

    constructor() {
        super()

        this.state = {
            isReady: false,
            progress: 0.0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.isReady) {
            setTimeout(() => {
                this.props.navigation.navigate('home')
            }, 1000)
        }
    }

    async componentDidMount() {
        const isStale = await this.isDataStale()

        this.setState({ progress: 15 })

        if(isStale) {
            this.getData()
        } else {
            this.setState({ progress: 100 })
            this.setState({ isReady: true })
        }
    }

    async isDataStale() {
        const val = await AsyncStorage.getItem('key:last_updated')

        if(!val || Date.now() - parseInt(val) >= LAST_UPDATED) {
            console.log('isstale')
            return true;
        }
        return false;
    }

    getData = () => {
        this.setState({ progress: 40 })
        promiseArray = [];
        categories.forEach(element => {
            promiseArray.push(getByCategory(element));
        });
        this.setState({ progress: 55 })

        Promise.all(promiseArray)
        .then((value) => {
            this.setState({ progress: 80 })
            AsyncStorage.setItem('key:last_updated', Date.now().toString(), (err) => {
                this.setState({ progress: 100 })
                this.setState({ isReady: true });
            })
        })
        .catch(err => {
            console.log('Error: ', err)
            this.setState({ progress: 100, isReady: true })
        }); 
    }

    // progress(num) {
    //     // if(this.state.progress >= 100) {
    //     //     return this.setState({ isReady: true })
    //     // }

    //     // for(let i = 0; i < num; i++) {
    //     //     setInterval(() => {
    //     //         this.setState({ progress: this.state.progress + num })
    //     //     }, 10)
    //     // }
    // }

    getWidth() {
        const w = FRAME.width;
        if(this.state.progress >= 100) {
            return w
        }
        return (w - 64) * (this.state.progress/100)
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.view}>

                    <Text style={styles.label}>Initializing Data...</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, { right: (FRAME.width) - this.getWidth() }]}></View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_DARK_GREY,
        justifyContent: 'center', alignItems: 'center'
    },
    view: {
        justifyContent: 'center', alignItems: 'stretch'
    },
    label: {
        fontFamily: 'bold', color: 'white', fontSize: 32, marginBottom: 8
    },
    progressBar: {
        // flex: 1,
        borderRadius: 4, overflow: 'hidden',
        width: FRAME.width - 64, height: 80,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: Colors.BACKGROUND_LIGHT_GREY
    },
    progress: {
        backgroundColor: Colors.RED,
        position: 'absolute', 
        left: 0, top: 0, bottom: 0
    }
})