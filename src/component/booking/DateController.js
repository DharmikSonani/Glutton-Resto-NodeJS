import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { addDays, eachDayOfInterval, format, subDays } from 'date-fns'
import LinearGradient from 'react-native-linear-gradient'

const DateController = ({
    onChange,
    endDate,
}) => {

    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nev', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const dates = eachDayOfInterval(
        {
            start: new Date(),
            end: (endDate && subDays(new Date(endDate), 1) < addDays(new Date(), 6)) ? subDays(new Date(endDate), 1) : addDays(new Date(), 6),
        },
        {
            weekStartsOn: 1,
        }
    );

    const [day, setDay] = useState(dates[0].getDate());
    const [month, setMonth] = useState(dates[0].getMonth());
    const [year, setYear] = useState(dates[0].getFullYear());

    return (
        <View style={styles.Container}>

            <View style={styles.HeaderContainer}>
                <Text style={styles.TitleText}>Date</Text>
                <Text style={styles.MonthYearText}>{months[month]} {year}</Text>
            </View>

            <ScrollView
                horizontal
                style={{ marginHorizontal: 16, }}
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 20, paddingHorizontal: 2, }}
                showsHorizontalScrollIndicator={false}
            >
                {
                    dates.map((item, i) => {
                        return (
                            <View
                                style={{
                                    borderRadius: 20,
                                    height: 100,
                                    padding: 1,
                                    marginHorizontal: 2,
                                    backgroundColor: COLOR.WHITE,
                                    elevation: day === item.getDate() ? 5 : 0,
                                    shadowColor: COLOR.BLACK,
                                    shadowOffset: { width: 0, height: day === item.getDate() ? 2 : 0 },
                                    shadowOpacity: day === item.getDate() ? 0.2 : 0,
                                    shadowRadius: day === item.getDate() ? 2 : 0,
                                }}
                                key={i}
                            >
                                <LinearGradient
                                    colors={day === item.getDate() ? GRADIENTCOLOR.BLACK_50_100_100_100 : GRADIENTCOLOR.WHITE_15_TO_05}
                                    style={{ borderRadius: 19, }}
                                    angle={120}
                                    useAngle
                                    key={i}
                                >
                                    <TouchableOpacity
                                        style={{
                                            padding: 10,
                                            width: 70,
                                            height: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            setDay(item.getDate())
                                            setMonth(item.getMonth());
                                            setYear(item.getFullYear());
                                            onChange(format(new Date(item), 'yyyy-MM-dd'));
                                        }}
                                        activeOpacity={1}
                                    >
                                        <Text style={{ fontSize: 13, color: day === item.getDate() ? COLOR.WHITE : COLOR.BLACK, fontWeight: 'bold', }}>{days[item.getDay()].toUpperCase()}</Text>
                                        <Text style={{ fontSize: 30, color: day === item.getDate() ? COLOR.WHITE : COLOR.BLACK, fontWeight: 'bold', }}>{item.getDate()}</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default DateController

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        // padding: 20,
        borderColor: COLOR.BORDERCOLOR,
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 15,
    },
    TitleText: {
        fontSize: 20,
        color: COLOR.BLACK,
        fontWeight: 'bold',
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    MonthYearText: {
        backgroundColor: COLOR.BORDERCOLOR,
        borderRadius: 10,
        color: COLOR.BLACK_60,
        paddingHorizontal: 30,
        paddingVertical: 10,
        fontSize: 13,
        fontWeight: 'bold',
        overflow: 'hidden',
    },
})