import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLOR } from '../../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextInputHeight = 50;

const AuthInput = ({
    value,
    style,
    onChangeText,
    maxLength,
    keyboardType,
    placeholder,
    passwordFiled,
    editable = true,
}) => {

    const _animation = useRef(new Animated.Value(value ? 1 : 0)).current;

    const [passVisible, setPassVisibility] = useState(false);

    const [lableWidth, setLableWidth] = useState(0);

    const onAnimate = (value) => {
        Animated.timing(_animation, {
            toValue: value,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }

    return (
        <View style={[styles.Container, style && style]}>
            <Animated.Text
                style={[styles.LableText, {
                    transform: [
                        {
                            translateY: _animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -TextInputHeight / 2],
                            }),
                        },
                        {
                            translateX: _animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, - lableWidth * 0.1],
                            }),
                        },
                        {
                            scale: _animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.8],
                            }),
                        },
                        {
                            translateX: _animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 5],
                            }),
                        },
                    ],
                    opacity: _animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                    }),
                }]}
                onLayout={(e) => setLableWidth(e.nativeEvent.layout.width)}
            >
                {placeholder}
            </Animated.Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                style={[styles.TextInputStyle, !editable && { color: COLOR.BLACK_30 }]}
                keyboardType={keyboardType}
                secureTextEntry={!passVisible && passwordFiled}
                editable={editable}
                onFocus={() => { onAnimate(1); }}
                onBlur={() => { !value && onAnimate(0); }}
            />
            {
                passwordFiled &&
                <TouchableOpacity
                    style={styles.PasswordVisibleButton}
                    onPress={() => { setPassVisibility(!passVisible) }}
                >
                    {
                        passVisible ?
                            <Ionicons name='eye' size={20} color={COLOR.BLACK} />
                            :
                            <Ionicons name='eye-off' size={20} color={COLOR.GRAY} />
                    }
                </TouchableOpacity>
            }
        </View>
    )
}

export default AuthInput

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: TextInputHeight,
        borderRadius: 15,
        backgroundColor: COLOR.WHITE,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        elevation: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        marginTop: 20,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    TextInputStyle: {
        flex: 1,
        color: COLOR.BLACK,
        fontSize: 13,
        height: '100%',
        verticalAlign: 'middle',
        textAlignVertical: 'center',
    },
    PhoneNoText: {
        fontSize: 13,
        color: COLOR.BLACK,
        textAlignVertical: 'center',
    },
    PasswordVisibleButton: {
        height: '100%',
        justifyContent: 'center',
    },
    LableText: {
        color: COLOR.BLACK_60,
        position: 'absolute',
        zIndex: -10,
        left: 11,
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: 4,
        fontSize: 14,
        borderRadius: 2,
        overflow: 'hidden',
    }
})