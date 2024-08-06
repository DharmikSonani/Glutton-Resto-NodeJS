import { ActivityIndicator, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { manageFavoriteByUidAPI } from '../../api/utils';
import { CustomerDBFields } from '../../constants/Database';
import { setFavouriteRestaurantsInRedux } from '../../redux/FavouriteRestaurants/FavouriteRestaurantsAction';

const FavouriteButton = ({
    restId,
    style,
}) => {

    const uid = useSelector(state => state[Reducers.AuthReducer]);
    const favlist = useSelector(state => state[Reducers.FavouriteRestaurantsReducer]);
    const isFav = favlist.includes(restId);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onPress = async () => {
        try {
            setLoading(true);
            let data = {};
            data['restId'] = restId;
            const res = await manageFavoriteByUidAPI(uid, data);
            setLoading(false);
            res?.data && dispatch(setFavouriteRestaurantsInRedux(res.data?.data[CustomerDBFields.favourites]));
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.Container, style && style]}
            disabled={loading}
        >
            {
                loading ?
                    <ActivityIndicator color={COLOR.BLACK_10} size={'small'} />
                    :
                    <Ionicons name='heart' size={25} color={isFav ? COLOR.CANCELLED : COLOR.BLACK_10} />
            }
        </TouchableOpacity>
    )
}

export default FavouriteButton

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        padding: 5,
        borderRadius: 16,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        height: 40,
        aspectRatio: 1 / 1,
        alignItems: 'center',
    },
})