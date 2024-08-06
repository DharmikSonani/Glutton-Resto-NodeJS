import { Animated, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLOR } from '../../constants/Colors';

export default TabButton = ({ Data, onPress, focused, buttonSize }) => {

    const Animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(Animation, {
            toValue: focused ? 1 : 0,
            useNativeDriver: false,
            duration: 500,
        }).start()
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.TabButtonView, { width: buttonSize, }]}
        >
            <Animated.View
                style={[styles.ActiveLine, {
                    backgroundColor: Data.bg,
                    transform: [{
                        translateY: Animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [15, 53]
                        })
                    }]
                }]}
            />
            <Animated.View
                style={[styles.Icon, { transform: [{ scale: Data.scale }] }]}
            >
                <Data.Icon name={Data.name} size={20} color={Data.bg} />
            </Animated.View>
            <Animated.View
                style={[styles.Icon, { transform: [{ scale: Data.scale }] }, {
                    opacity: Animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    }),
                    position: 'absolute',
                }]}
            >
                <Data.Icon name={Data.name} size={20} color={COLOR.BLACK_30} />
            </Animated.View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    TabButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
    },
    Icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
    },
    ActiveLine: {
        position: 'absolute',
        width: 40,
        height: 3,
        zIndex: 1,
        top: 0,
        borderRadius: 20,
    },
})