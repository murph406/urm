import React, { PureComponent } from 'react';
import { View, Animated, Easing, Text } from 'react-native';

import { styles } from './AnimatedTextBox-Styles';

export class AnimatedContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidUpdate() {
        let isActive = this.props.isActive

        this.goAnimation(isActive)
    }

    goAnimation(isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children, minHeight, maxHeight } = this.props
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

    componentDidUpdate() {
        let isActive = this.props.isActive

        this.goAnimation(isActive)
    }

    goAnimation(isActive) {
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

    componentDidUpdate() {
        let isActive = this.props.isActive

        this.goAnimation(isActive)
    }

    goAnimation(isActive) {
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

    componentDidUpdate() {
        let isActive = this.props.isActive

        this.goAnimation(isActive)
    }

    goAnimation(isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children, inputRange, outputRange } = this.props
        const { animatedValue } = this.state

        const AnimatedOpacityStyle = animatedValue.interpolate({
            inputRange: inputRange,
            outputRange: outputRange,
            useNativeDriver: true
        })

        return (
            <Animated.View
                style={{ opacity: AnimatedOpacityStyle }}>
                {children}
            </Animated.View>
        )
    }
}

export class AnimatedText extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),

        }
    }

    componentDidUpdate() {
        let isActive = this.props.isActive

        this.goAnimation(isActive)
    }

    goAnimation(isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children, inputRange, outputRange, fontStyle, textColor } = this.props
        const { animatedValue } = this.state

        const AnimatedNumberOfLines = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2],
            useNativeDriver: true
        })

        return (
            <Animated.Text
                style={[fontStyle, { opacity: 1, color: textColor }]} numberOfLines={AnimatedNumberOfLines}>
                {children}
            </Animated.Text>
        )
    }
}


export class AnimatedPositionAbsolute extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    componentDidUpdate() {
        let isActive = this.props.isActive

        this.goAnimation(isActive)
    }

    goAnimation(isActive) {
        let { animatedValue } = this.state

        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 300,
        }).start();
    }

    render() {
        const { children, inputRange, outputRange } = this.props
        const { animatedValue } = this.state

        const { bottomInitial, rightInitial, leftInitial, topInitial } = inputRange
        const { bottomFinal, rightFinal, leftFinal, topFinal } = outputRange
        
        const animatedBottom = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [bottomInitial, bottomFinal],
            useNativeDriver: true
        })
        const animatedRight = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [rightInitial, rightFinal],
            useNativeDriver: true
        })
        const animatedLeft = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [leftInitial, leftFinal],
            useNativeDriver: true
        })
        const animatedTop = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [topInitial, topFinal],
            useNativeDriver: true
        })

        return (
            <Animated.View
                style={
                    {
                        position: 'absolute',
                        top: animatedTop,
                        bottom: animatedBottom,
                        right: animatedRight,
                        left: animatedLeft
                    }}>
                {children}
            </Animated.View>
        )
    }
}



