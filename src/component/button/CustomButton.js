import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR } from '../../constants/Colors'

const CustomButton = ({
    onPress,
    text,
    colors,
    children,
    disabled,
    style,
    fontStyle,
    gradientStyle,
    borderRadius,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.Container, style && style, borderRadius && { borderRadius }]}
            disabled={disabled}
        >
            <LinearGradient
                colors={colors}
                style={[styles.GradientStyle, gradientStyle && gradientStyle, borderRadius && { borderRadius: borderRadius - 1 }]}
                angle={150}
                useAngle
            >
                {children}
                <Text style={[styles.ButtonText, children && { marginLeft: 5 }, fontStyle && fontStyle]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        marginTop: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: COLOR.WHITE,
        borderRadius: 15,
        padding: 1,
        height: 40,
    },
    GradientStyle: {
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ButtonText: {
        color: COLOR.WHITE,
        fontSize: 13,
    },
})