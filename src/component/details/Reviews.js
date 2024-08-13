import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReviewCard from '../ReviewCard';
import { COLOR } from '../../constants/Colors';
import { headerStyle } from '../../constants/Styles';
import { getRestaurantReviewsAPI } from '../../api/utils';
import socketServices from '../../api/Socket';

const Reviews = ({ restId, height, width, }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
        socketServices.on('ReviewAdded', fetchData);
        return () => {
            socketServices.removeListener('ReviewAdded');
        }
    }, [])

    const fetchData = async () => {
        try {
            const res = await getRestaurantReviewsAPI(restId);
            res?.data && setData(res.data?.data)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        data.length > 0 ?
            <FlatList
                data={data}
                renderItem={({ item }) => <ReviewCard data={item} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                style={{ width: width, height: height, }}
                contentContainerStyle={{ padding: 15, paddingBottom: 5, }}
            />
            :
            <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', paddingBottom: headerStyle.height / 2, }}>
                <Text style={{ color: COLOR.BLACK_30 }}>Reviews Not Found</Text>
            </View>
    )
}

export default Reviews

const styles = StyleSheet.create({})