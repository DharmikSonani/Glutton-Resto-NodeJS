import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const AuthButton = ({
    onPress,
    style,
    text,
    icon,
}) => {
    return (
        <TouchableOpacity
            style={[styles.Container, style && style]}
            onPress={onPress}
        >
            {
                icon &&
                <View style={styles.IconStyle}>
                    {icon}
                </View>
            }
            <Text style={styles.TextStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default AuthButton

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        height: 40,
        marginBottom: 10,
        borderRadius: 20,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconStyle: {
        height: '100%',
        position: 'absolute',
        left: 14,
        justifyContent: 'center',
    },
    TextStyle: {
        color: COLOR.BLACK,
        fontSize: 14,
        fontWeight: '600',
    },
})