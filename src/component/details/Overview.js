import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { NavigationScreens } from '../../constants/Strings'
import { RestaurantDBFields } from '../../constants/Database'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import CustomButton from '../button/CustomButton'

const Overview = ({ navigation, data, width, }) => {

    const isActive = data[RestaurantDBFields.isActive] == 'true';

    const DisplayData = [
        {
            icon: <Entypo name='shop' size={22} color={COLOR.BLACK_80} />,
            text: data[RestaurantDBFields.restaurantName],
            lines: 1,
        },
        {
            icon: <MaterialIcons name='location-pin' size={25} color={COLOR.BLACK_80} />,
            text: `${data[RestaurantDBFields.address]}, ${data[RestaurantDBFields.city]}, ${data[RestaurantDBFields.state]} ${data[RestaurantDBFields.pincode]}`,
            lines: 2,
        },
        {
            icon: <Octicons name='clock' size={20} color={COLOR.BLACK_80} />,
            text: `Open - ${data[RestaurantDBFields.openTime]} to ${data[RestaurantDBFields.closeTime]}`,
            lines: 1,
        },
        {
            icon: <MaterialIcons name='call' size={20} color={COLOR.BLACK_80} />,
            text: `+91 ${data[RestaurantDBFields.contactNo]}`,
            lines: 1,
        },
        {
            icon: <MaterialCommunityIcons name='table-chair' size={20} color={COLOR.BLACK_80} />,
            text: `Book Table`,
            lines: 1,
            onPress: () => {
                navigation.navigate(NavigationScreens.BookTableScreen,
                    {
                        restId: data[RestaurantDBFields.restId],
                        restName: data[RestaurantDBFields.restaurantName],
                        openTime: data[RestaurantDBFields.openTime],
                        closeTime: data[RestaurantDBFields.closeTime],
                        tables: data[RestaurantDBFields.tables],
                        endDate: data[RestaurantDBFields.endDate],
                    });
            }
        },
    ]

    return (
        <View style={{ width: width, }}>
            {
                DisplayData.map((item, i) => {
                    return (
                        <View style={styles.DataStyle} key={i}>

                            <View style={styles.IconContainer}>
                                {item.icon}
                            </View>

                            <Text
                                numberOfLines={item.lines}
                                style={{ flex: 1, color: COLOR.BLACK_80, }}
                            >
                                {item.text}
                            </Text>

                            {
                                item.onPress &&
                                <CustomButton
                                    colors={isActive ? GRADIENTCOLOR.ORANGE : GRADIENTCOLOR.CANCELLED}
                                    text={isActive ? 'Book Now' : 'Inactive'}
                                    disabled={!isActive}
                                    onPress={item.onPress}
                                    style={styles.ButtonStyle}
                                    borderRadius={12}
                                />
                            }

                        </View>
                    )
                })
            }
        </View>
    )
}

export default Overview

const styles = StyleSheet.create({
    DataStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        borderBottomColor: COLOR.BLACK_30,
        borderBottomWidth: 0.5,
        alignItems: 'center',
    },
    IconContainer: {
        width: '15%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonStyle: {
        width: 'auto',
        marginTop: 0,
        height: 30,
    }
})