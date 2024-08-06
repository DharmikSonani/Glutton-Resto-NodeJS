import { Animated, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { COLOR } from '../constants/Colors';

const MenuCard = ({
    data,
    itemList,
    inputRange,
    AnimatedValue,
    zIndex,
    height,
}) => {

    const translateY = AnimatedValue.interpolate({
        inputRange,
        outputRange: [-45, 0, height * 0.5]
    })
    const scale = AnimatedValue.interpolate({
        inputRange,
        outputRange: [0.9, 1, 1]
    })
    const opacity = AnimatedValue.interpolate({
        inputRange,
        outputRange: [0.75, 1, 0]
    })

    return (
        <Animated.View
            style={[styles.CardContainer, {
                height: height * 0.88,
                zIndex: zIndex,
                opacity,
                transform: [
                    { translateY },
                    { scale }
                ],
            }]}
        >

            <FastImage
                source={{ uri: data.menuCardImg }}
                style={styles.BackgroundImage}
                resizeMode='cover'
            />
            <View style={styles.ContentContainer}>
                {
                    itemList && itemList.map((item, i) => {
                        return (
                            <View
                                key={i}
                                style={[styles.ItemContainer]}
                            >
                                <Text style={{ color: data.fontColor, fontSize: 12, flex: 1, }} numberOfLines={1}>{item.itemName}</Text>
                                <Text style={{ color: data.fontColor, fontSize: 12, }} numberOfLines={1}>₹{item.price}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </Animated.View >
    )
}

export default MenuCard

const styles = StyleSheet.create({
    CardContainer: {
        position: 'absolute',
        backgroundColor: COLOR.WHITE,
        aspectRatio: 1 / 1.77777778,
        elevation: 3,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderRadius: 15,
    },
    BackgroundImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
    },
    ContentContainer: {
        alignSelf: 'center',
        width: '70%',
        top: '30%',
        overflow: 'hidden',
        height: '50%',
    },
    ItemContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 2,
        justifyContent: 'space-between',
    }
})
