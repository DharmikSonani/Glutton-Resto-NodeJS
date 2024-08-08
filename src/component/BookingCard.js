import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import CustomButton from './button/CustomButton';

const borderRadius = 10;

const BookingCard = ({
    data,
    onPress,
    onCancelBooking,
}) => {

    return (
        <View style={styles.Container}>

            <Text style={styles.RestNameText} numberOfLines={1}>{data?.restaurant?.name}</Text>

            <View style={styles.DiscountContainer}>
                <LinearGradient
                    colors={GRADIENTCOLOR.ORANGE}
                    style={styles.DiscountGradient}
                    angle={110}
                    useAngle
                >
                    <Text style={styles.DiscountText} numberOfLines={1}>{data?.booking?.discount}% Off</Text>
                </LinearGradient>
            </View>

            <View style={styles.ContentContainer}>

                <View style={styles.DetailsContainer}>

                    <View style={{ flex: 1, marginBottom: 15, }}>
                        <Text style={styles.IdText} numberOfLines={1}>Booking ID : {data?._id}</Text>
                        <Text style={styles.TextStyle} numberOfLines={1}>Booking Time : {moment(data?.booking?.time, ['hh:mm']).format('hh:mm A')}</Text>
                        <Text style={styles.TextStyle} numberOfLines={1}>Guest : {data?.booking?.noOfGuest}</Text>
                    </View>

                    {
                        data?.isVerify == false && data?.isCancel == false &&
                        <CustomButton
                            colors={GRADIENTCOLOR.CANCELLED}
                            text={'Cancel Booking'}
                            onPress={() => {
                                Alert.alert(
                                    'Cancel Booking',
                                    'Are you sure you want to cancel your table booking?',
                                    [
                                        { text: 'No', onPress: () => { } },
                                        { text: 'Yes', onPress: () => { onCancelBooking(data?._id) } },
                                    ],
                                    { cancelable: true }
                                )
                            }}
                            borderRadius={10}
                            style={{ height: 30, marginTop: 0, }}
                        />
                    }

                    {
                        data.isVerify == false && data.isCancel == true &&
                        <View style={styles.BookingStatusContainer}>
                            <SimpleLineIcons name='close' size={15} color={COLOR.CANCELLED} />
                            <Text style={[styles.BookingStatusText, { color: COLOR.CANCELLED }]}>Cancelled</Text>
                        </View>
                    }

                    {
                        data.isVerify == true && data.isCancel == false &&
                        <View style={styles.BookingStatusContainer}>
                            <Octicons name='issue-closed' size={15} color={COLOR.VERIFIED} />
                            <Text style={[styles.BookingStatusText, { color: COLOR.VERIFIED }]}>Verified</Text>
                        </View>
                    }
                </View>

                <TouchableOpacity
                    style={styles.QRContainer}
                    onPress={() => onPress(data)}
                >
                    <QRCode
                        value={data?._id}
                        size={80}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookingCard

const styles = StyleSheet.create({
    Container: {
        padding: 10,
        marginTop: 10,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: borderRadius,
        backgroundColor: COLOR.WHITE,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    RestNameText: {
        maxWidth: '70%',
        color: COLOR.BLACK,
        fontSize: 15,
    },
    IdText: {
        color: COLOR.BLACK_30,
        fontSize: 10,
        marginBottom: 5,
    },
    DiscountContainer: {
        position: 'absolute',
        right: -1,
        top: -1,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: COLOR.BLACK,
    },
    DiscountGradient: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
    },
    DiscountText: {
        color: COLOR.WHITE,
        fontSize: 14,
        fontWeight: '500',
    },
    ContentContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 5,
        alignItems: 'flex-end',
    },
    DetailsContainer: {
        flex: 1,
        marginRight: 10,
    },
    TextStyle: {
        color: COLOR.BLACK,
        fontSize: 12,
        marginTop: 2,
    },
    QRContainer: {
        padding: 7.5,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: borderRadius - 5,
        backgroundColor: COLOR.WHITE,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BookingStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BookingStatusText: {
        marginLeft: 5,
        fontSize: 12,
    },
})