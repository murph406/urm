import React, { PureComponent, Children } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import { styles, containerHeight } from './AnimatedTextBox-Styles';
import { SECONDARY } from '../../theme/colors'

export class AnimatedContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidUpdate(prevProps) {
        let prevIsActive = prevProps.isActive
        let isActive = this.props.isActive

        this.goAnimation(prevIsActive, isActive)
    }

    goAnimation(prevIsActive, isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children, minHeight, maxHeight, isActive } = this.props
        const { animatedValue } = this.state

        const animatedValueStyle = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [minHeight, maxHeight],
            extrapolate: 'clamp'
        })

        return (
            <Animated.View
                style={[styles.container, { height: animatedValueStyle }]}>
                {children}
            </Animated.View>
        )
    }
}

export class AnimatedColor extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidUpdate(prevProps) {
        let prevIsActive = prevProps.isActive
        let isActive = this.props.isActive

        this.goAnimation(prevIsActive, isActive)
    }

    goAnimation(prevIsActive, isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children, initialColor, finalColor, style } = this.props
        const { animatedValue } = this.state

        const AnimatedColorStyle = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [initialColor, finalColor],
            extrapolate: 'clamp'
        })

        return (
            <Animated.View
                style={[style, { backgroundColor: AnimatedColorStyle }]}>
                {children}
            </Animated.View>
        )
    }
}

export class AnimatedRotation extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidUpdate(prevProps) {
        let prevIsActive = prevProps.isActive
        let isActive = this.props.isActive

        this.goAnimation(prevIsActive, isActive)
    }

    goAnimation(prevIsActive, isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
        }).start();
    }

    render() {
        const { style, imageSource, initialDeg, finalDeg, children } = this.props
        const { animatedValue } = this.state

        const AnimatedRotationStyle = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [initialDeg, finalDeg],
        })

        return (
            <Animated.View
                source={imageSource}
                style={[style, { transform: [{ rotate: AnimatedRotationStyle }] }]}>
                {children}
            </Animated.View>
        )
    }
}

export class AnimatedOpacity extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidUpdate(prevProps) {
        let prevIsActive = prevProps.isActive
        let isActive = this.props.isActive

        this.goAnimation(prevIsActive, isActive)
    }

    goAnimation(prevIsActive, isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children } = this.props
        const { animatedValue } = this.state

        const AnimatedOpacityStyle = animatedValue.interpolate({
            inputRange: [.3, .7],
            outputRange: [0, 1],
            useNativeDriver: true
        })

        return (
            <Animated.View
                style={{opacity: AnimatedOpacityStyle}}>
                {children}
            </Animated.View>
        )
    }
}


