import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const GuestController = ({
    value,
    onChange,
    min,
    max,
}) => {
    return (
        <View style={styles.Container}>

            <Text style={styles.TitleText}>Guests</Text>

            <View style={styles.ContentContainer}>
                <TouchableOpacity
                    style={styles.ButtonStyle}
                    onPress={() => { value > min && onChange(value - 1); }}
                    disabled={value == min}
                >
                    <FontAwesome5 name='minus' size={12} color={value == min ? COLOR.BLACK_30 : COLOR.BLACK} />
                </TouchableOpacity>

                <Text style={styles.GuestText}>{value}</Text>

                <TouchableOpacity
                    style={styles.ButtonStyle}
                    onPress={() => { value < max && onChange(value + 1); }}
                    disabled={value == max}
                >
                    <FontAwesome5 name='plus' size={12} color={value == max ? COLOR.BLACK_30 : COLOR.BLACK} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default GuestController

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: 20,
        borderColor: COLOR.BORDERCOLOR,
        borderRadius: 15,
        justifyContent: 'space-between',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    TitleText: {
        fontSize: 20,
        color: COLOR.BLACK,
        fontWeight: 'bold',
    },
    ContentContainer: {
        backgroundColor: COLOR.BORDERCOLOR,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    ButtonStyle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    GuestText: {
        fontSize: 17,
        color: COLOR.BLACK,
        fontWeight: 'bold',
    },
})