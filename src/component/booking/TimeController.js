import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { format } from 'date-fns'
import moment from 'moment'
import { BookingsDBFields, BookingsDBPath } from '../../constants/Database'
import LinearGradient from 'react-native-linear-gradient'
import { NormalSnackBar } from '../../constants/SnackBars'

const width = Dimensions.get('window').width - 70;

const TimeController = ({
    restId,
    time,
    onSelectTime,
    onDateChange,
    openTime,
    closeTime,
    tables,
}) => {

    const [timeSlot, setTimeSlot] = useState([]);
    const [timeLoading, setTimeLoading] = useState(false);

    useEffect(() => {
        setTimeLoading(true);
        if (onDateChange == format(new Date(), 'yyyy-MM-dd').toString()) {
            fetchCurrentTime(onDateChange);
        } else {
            fetchBookings(onDateChange);
        }
    }, [onDateChange])

    const fetchCurrentTime = (date) => {
        var h = new Date().getHours();
        var m = new Date().getMinutes();

        if (m >= 30 && h < 22) {
            h = h + 1;
            m = '00';
        } else {
            m = 30;
        }
        let fromTime = h + ':' + m;
        const time = moment(fromTime, 'HH:mm');
        const oTime = moment(openTime, 'HH:mm');
        if (oTime > time) {
            fromTime = openTime;
        }
        fetchBookings(date, fromTime);
    }

    const fetchBookings = (date, ot = openTime) => {
        try {
            BookingsDBPath
                .where(BookingsDBFields.restId, '==', restId)
                .where(BookingsDBFields.date, '==', date)
                .where(BookingsDBFields.isCancel, '==', 'false')
                .onSnapshot((querySnap) => {
                    setTimeLoading(true);
                    onSelectTime('');
                    const list = querySnap.docs.map((doc) => {
                        const { time } = doc.data();
                        return (time)
                    })
                    setTimeSlot(createTimeSlots(ot, closeTime, list));
                })
        } catch (error) {
            console.log(error)
        }
    }

    const createTimeSlots = (fromTime, toTime, data) => {
        let startTime = moment(fromTime, 'HH:mm');
        let endTime = moment(toTime, 'HH:mm');
        let arr = [];
        let i = 1;
        while (startTime < endTime) {
            if ((data.filter(x => x == moment(startTime, ['HH:mm']).format('HH:mm')).length) >= parseInt(tables)) {
                arr.push({ key: i, time: moment(startTime, ['HH:mm']).format('hh:mm A'), full: true });
            } else {
                arr.push({ key: i, time: moment(startTime, ['HH:mm']).format('hh:mm A'), full: false });
            }
            startTime.add(30, 'minutes');
            i = 1 + i;
        }
        onSelectTime('');
        setTimeLoading(false);
        return arr;
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.TitleText}>Time</Text>

            {
                timeLoading ?
                    <View style={styles.SubContainer}>
                        <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                    </View>
                    :
                    timeSlot.length == 0 ?
                        <View style={styles.SubContainer}>
                            <Text style={styles.EmptyText}>{`No Time Slot for ${format(new Date(onDateChange), 'dd MMMM, yyyy')}`}</Text>
                        </View>
                        :
                        <FlatList
                            data={timeSlot}
                            renderItem={
                                ({ item }) =>
                                    <View style={styles.ItemMainContainer}>
                                        <View style={[
                                            time != item.time ? styles.ItemBorderStyle : {
                                                elevation: 2,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 2,

                                            },
                                            {
                                                padding: 1,
                                                backgroundColor: COLOR.WHITE,
                                                borderRadius: 12,
                                            }
                                        ]}>
                                            <LinearGradient
                                                colors={time === item.time ? GRADIENTCOLOR.BLACK_50_100_100_100 : GRADIENTCOLOR.WHITE_15_TO_05}
                                                style={styles.ItemGradientStyle}
                                                angle={140}
                                                useAngle
                                            >
                                                <TouchableOpacity
                                                    style={styles.ItemButtonStyle}
                                                    onPress={() => {
                                                        if (item.full) {
                                                            onSelectTime('');
                                                            NormalSnackBar('Bookings are full for this time.');
                                                        } else {
                                                            onSelectTime(item.time);
                                                        }
                                                    }}
                                                >
                                                    <Text style={[styles.ButtonText, item.full && { color: COLOR.CANCELLED }, time == item.time && { color: COLOR.WHITE }]}>{item.time}</Text>
                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </View>
                                    </View>
                            }
                            numColumns={3}
                            keyExtractor={item => item.key}
                            style={{ width: width, marginTop: 10, }}
                            contentContainerStyle={{ paddingBottom: 5, }}
                            showsVerticalScrollIndicator={false}
                        />
            }
        </View>
    )
}

export default TimeController

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 20,
        borderColor: COLOR.BORDERCOLOR,
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,
    },
    TitleText: {
        fontSize: 20,
        color: COLOR.BLACK,
        fontWeight: 'bold',
    },
    SubContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ItemMainContainer: {
        width: width / 3,
        padding: 5,
    },
    ItemBorderStyle: {
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
    ItemGradientStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
    },
    ItemButtonStyle: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    ButtonText: {
        fontWeight: 'bold',
        color: COLOR.BLACK,
        fontSize: 13
    },
    EmptyText: {
        color: COLOR.BLACK_30,
        fontSize: 13,
    }
})