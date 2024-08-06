import { StyleSheet, TouchableOpacity, View, Text, } from 'react-native'
import React, { useEffect } from 'react'
import StarRating from './StarRating'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { NavigationScreens } from '../constants/Strings';
import { COLOR } from '../constants/Colors';
import FavouriteButton from './button/FavouriteButton';
import { RestaurantDBFields, RestaurantDBPath } from '../constants/Database';

const borderRadius = 15;

const RestoCard = ({ data, navigation, }) => {

    useEffect(() => {
        try {
            if (!data[RestaurantDBFields.endDate] || (data[RestaurantDBFields.endDate] && new Date(data[RestaurantDBFields.endDate]) < new Date())) {
                RestaurantDBPath
                    .doc(data[RestaurantDBFields.restId])
                    .update({
                        isActive: 'false',
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <TouchableOpacity
            style={styles.Container}
            activeOpacity={1}
            onPress={() => { navigation.navigate(NavigationScreens.RestaurantDetailScreen, { data: data }) }}
        >
            <View style={styles.CardImage}>
                <SkeletonPlaceholder speed={1000}>
                    <View style={{ width: '100%', height: '100%', }} />
                </SkeletonPlaceholder>
                <FastImage
                    source={{ uri: data.restImage }}
                    style={{ width: '100%', height: '100%', position: 'absolute', }}
                    resizeMode={'cover'}
                />
            </View>

            <View style={styles.TextContent}>
                <Text numberOfLines={1} style={styles.Cardtitle}>{data.restaurantName}</Text>
                <StarRating ratings={data.rate} reviews={(data.reviews && data.reviews > 0) ? data.reviews : undefined} />
                <Text numberOfLines={1} style={styles.CardDescription}>{data.address}, {data.city}, {data.state} {data.pincode}</Text>
            </View>

            <View style={styles.Button}>
                <FavouriteButton restId={data.restId} />
            </View>
        </TouchableOpacity>
    )
}

export default RestoCard

const styles = StyleSheet.create({
    Container: {
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: COLOR.WHITE,
        flex: 1,
        width: '100%',
        aspectRatio: 1.75 / 1,
        borderRadius: borderRadius,
        marginBottom: 15,
    },
    CardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: borderRadius,
        overflow: 'hidden',
    },
    Cardtitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: COLOR.BLACK,
        marginBottom: 2,
    },
    CardDescription: {
        fontSize: 11,
        color: COLOR.BLACK_60,
        marginTop: 2,
    },
    TextContent: {
        padding: 10,
        position: 'absolute',
        backgroundColor: COLOR.WHITE_90,
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderWidth: 1,
        borderColor: COLOR.WHITE,
    },
    Button: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
})