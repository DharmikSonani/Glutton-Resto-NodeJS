import { StyleSheet, Text, View, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import { useIsFocused } from '@react-navigation/native';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import QRCodeModal from './modal/QRCodeModal';
import BookingCard from './BookingCard';
import { BookingsDBFields, BookingsDBPath } from '../constants/Database';

const BookingList = ({
    date,
    currentDate,
    uid,
}) => {

    const currentTime = moment(new Date()).format('HH:mm').toString();
    const isFocused = useIsFocused();

    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState({});

    useEffect(() => {
        isFocused && getBookings();
    }, [isFocused])

    const getBookings = async () => {
        try {
            BookingsDBPath
                .where(BookingsDBFields.date, '==', date)
                .where(BookingsDBFields.custId, '==', uid)
                .orderBy(BookingsDBFields.time, 'desc')
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        const docId = doc.id;
                        return { docId, ...doc.data() };
                    })
                    setBookings(list);
                    setSelectedBooking({});
                })
        } catch (e) {
            console.log(e);
        }
    }

    const onCancelBooking = (docId) => {
        try {
            BookingsDBPath
                .doc(docId)
                .update({
                    isCancel: 'true',
                })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.Container}>

            <Text style={styles.DateText}>{date && format(new Date(date), 'MMMM d, yyyy')}</Text>

            {
                currentDate == date &&
                <View style={styles.TodayContainer}>
                    <LinearGradient
                        colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                        style={styles.TodayGradient}
                        angle={150}
                        useAngle
                    >
                        <Text style={{ color: COLOR.WHITE }}>
                            Today
                        </Text>
                    </LinearGradient>
                </View>
            }

            <FlatList
                data={bookings}
                renderItem={({ item }) =>
                    <BookingCard
                        data={{ ...item, date }}
                        onPress={setSelectedBooking}
                        onCancelBooking={onCancelBooking}
                        currentDate={currentDate}
                        currentTime={currentTime}
                    />
                }
                keyExtractor={item => item.docId}
                scrollEnabled={false}
            />

            {
                Object.keys(selectedBooking).length > 0 &&
                <QRCodeModal
                    data={selectedBooking}
                    modalVisible={Object.keys(selectedBooking).length > 0}
                    setModalVisible={setSelectedBooking}
                />
            }
        </View >
    )
}

export default BookingList

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 10,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: COLOR.WHITE,
    },
    DateText: {
        color: COLOR.BLACK,
        padding: 10,
        backgroundColor: COLOR.BORDERCOLOR,
        borderRadius: 7,
        overflow: 'hidden',
        width: '35%',
        textAlign: 'center',
    },
    TodayContainer: {
        backgroundColor: COLOR.WHITE,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        position: 'absolute',
        right: -1,
        top: -1,
    },
    TodayGradient: {
        paddingVertical: 5,
        paddingHorizontal: 50,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 40,
        borderColor: 'rgba(243,244,246,1)',
        borderWidth: 1,
        position: "absolute",
    },
})