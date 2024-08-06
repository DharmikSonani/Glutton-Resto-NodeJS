import { StyleSheet, Text, View, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { COLOR } from '../../constants/Colors';
import { headerStyle } from '../../constants/Styles';
import { getRestaurantPhotosAPI } from '../../api/utils';

const Photos = ({ restId, height, width }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await getRestaurantPhotosAPI(restId);
            res?.data && setData(res?.data?.data?.images);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        data.length > 0 ?
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: width, height: height, }}
                contentContainerStyle={styles.ContentContainer}
            >
                <View style={{ flex: 1, }}>
                    {
                        data.map((image, i) => {
                            return (
                                i % 2 == 0 &&
                                <View style={[styles.ImageContainerStyle, { aspectRatio: i % 3 == 0 ? 1 / 1.5 : 1 / 0.75 }]} key={i}>
                                    <SkeletonPlaceholder borderRadius={4} speed={1000}>
                                        <View style={styles.ImageStyle} />
                                    </SkeletonPlaceholder>
                                    <FastImage source={{ uri: image }} style={[styles.ImageStyle, { position: 'absolute' }]} />
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ width: 10, }} />

                <View style={{ flex: 1, }}>
                    {
                        data.map((image, i) => {
                            return (
                                i % 2 != 0 &&
                                <View style={[styles.ImageContainerStyle, { aspectRatio: i % 3 == 0 ? 1 / 1.5 : 1 / 0.75 }]} key={i}>
                                    <SkeletonPlaceholder borderRadius={4} speed={1000}>
                                        <View style={styles.ImageStyle} />
                                    </SkeletonPlaceholder>
                                    <FastImage source={{ uri: image }} style={[styles.ImageStyle, { position: 'absolute' }]} />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            :
            <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', paddingBottom: headerStyle.height / 2, }}>
                <Text style={{ color: COLOR.BLACK_30 }}>Photos Not Found</Text>
            </View>
    )
}

export default Photos

const styles = StyleSheet.create({
    ImageContainerStyle: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    Container: {
        width: '100%',
        height: '100%',
    },
    ContentContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
})