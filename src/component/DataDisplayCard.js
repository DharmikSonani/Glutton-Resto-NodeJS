import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

const DataDisplayCard = ({
    title,
    children,
    style,
}) => {
    return (
        <View style={[styles.Container, style && style]}>
            <View style={styles.TitleContainer}>
                <Text style={styles.TitleText} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            <View style={styles.ContentContainer} >

                {children}

            </View>

        </View>
    )
}

export default DataDisplayCard

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignItems: 'center',
    },
    ContentContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        paddingTop: 30,
        marginTop: 20,
        backgroundColor: COLOR.WHITE,
    },
    TitleContainer: {
        position: 'absolute',
        left: 20,
        zIndex: 10,
        backgroundColor: COLOR.BORDERCOLOR,
        borderRadius: 12,
        right: 20,
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    TitleText: {
        color: COLOR.BLACK,
        fontSize: 14,
    },
})