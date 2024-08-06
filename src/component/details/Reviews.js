import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReviewCard from '../ReviewCard';
import moment from 'moment';
import { COLOR } from '../../constants/Colors';
import { headerStyle } from '../../constants/Styles';
import { RatingDBFields, RatingDBPath } from '../../constants/Database';

const Reviews = ({ restId, height, width, }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        try {
            RatingDBPath
                .orderBy(RatingDBFields.time, 'desc')
                .where(RatingDBFields.restId, '==', restId)
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        const { rating, review, time, userId } = doc.data();
                        timeStamp = moment(time.toDate()).fromNow();
                        return { rating, review, timeStamp, userId, i }
                    })
                    setData(list);
                })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        data.length > 0 ?
            <FlatList
                data={data}
                renderItem={({ item }) => <ReviewCard data={item} />}
                keyExtractor={item => item.i}
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