import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { DetailTabs } from '../../constants/Helper'
import { COLOR } from '../../constants/Colors'

const MenuStrip = ({
    onTabPress,
    _scrollX,
}) => {

    const [width, setWidth] = useState(0);

    return (
        <View style={styles.Container}>
            {
                DetailTabs.map((tab, i) => {
                    return (
                        <TouchableOpacity
                            style={[styles.Button]}
                            onPress={() => {
                                onTabPress(i);
                            }}
                            key={i}
                            onLayout={(layout) => setWidth(layout.nativeEvent.layout.width)}
                        >
                            <Text numberOfLines={1} style={styles.ButtonText}>{tab}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            <Animated.View
                style={[styles.ActiveTab, { width: width }, {
                    transform: [{
                        translateX: _scrollX.interpolate({
                            inputRange: [0, (width * 4) + 30],
                            outputRange: [0, width]
                        })
                    }]
                }]}
            />
        </View>
    )
}

export default MenuStrip

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderColor: COLOR.BORDERCOLOR,
        borderBottomWidth: 2,
    },
    Button: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.BLACK,
        fontSize: 13,
    },
    ActiveTab: {
        height: 2,
        backgroundColor: COLOR.ORANGE,
        position: 'absolute',
        zIndex: 100,
        bottom: -2,
        marginLeft: 15,
        borderRadius: 1,
    },
})