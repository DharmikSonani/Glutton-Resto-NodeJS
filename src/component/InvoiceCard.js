import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors'

const InvoiceCard = ({
    data,
    onPress,
}) => {
    return (
        <View style={styles.Container}>

            <View style={styles.ContentContainer}>
                <Text style={styles.RestNameText} numberOfLines={1}>{data.restName}</Text>
                <Text style={styles.IdText} numberOfLines={1}>Invoice ID : {data.docId}</Text>
                <Text style={styles.TextStyle} numberOfLines={1}>Date : {format(new Date(data.date), 'MMMM d,yyyy')}</Text>
                <Text style={styles.TextStyle} numberOfLines={1}>Booking Time : {moment(data.time, ['hh:mm']).format('hh:mm A')}</Text>
            </View>

            <TouchableOpacity
                style={styles.Button}
                onPress={() => { onPress(data) }}
            >
                <LinearGradient
                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                    style={styles.ButtonGradient}
                    angle={110}
                    useAngle
                >
                    <MaterialIcons name='keyboard-arrow-right' size={20} color={COLOR.WHITE} />
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
}

export default InvoiceCard

const styles = StyleSheet.create({
    Container: {
        padding: 10,
        marginBottom: 10,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ContentContainer: {
        flex: 1,
        marginRight: 10,
    },
    RestNameText: {
        color: COLOR.BLACK,
        fontSize: 13,
        marginBottom: 2,
    },
    IdText: {
        color: COLOR.BLACK_30,
        fontSize: 10,
        marginVertical: 2
    },
    TextStyle: {
        color: COLOR.BLACK,
        fontSize: 12,
        marginTop: 2,
    },
    Button: {
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        padding: 1,
    },
    ButtonGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        padding: 7,
    },
})