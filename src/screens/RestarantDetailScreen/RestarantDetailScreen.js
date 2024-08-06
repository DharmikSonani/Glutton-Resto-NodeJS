import React, { useRef } from 'react'
import useScreenHooks from './RestarantDetailScreen.Hooks';
import { styles } from './styles';
import ScreenHeader from '../../component/ScreenHeader';
import { RestaurantDBFields } from '../../constants/Database';
import FavouriteButton from '../../component/button/FavouriteButton';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import StarRating from '../../component/StarRating';
import { COLOR } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddReviewModal from '../../component/modal/AddReviewModal';
import MenuStrip from '../../component/details/MenuStrip';
import Overview from '../../component/details/Overview';
import Reviews from '../../component/details/Reviews';
import Photos from '../../component/details/Photos';
import Menu from '../../component/details/Menu';
import { headerStyle } from '../../constants/Styles';

const RestarantDetailScreen = (props) => {

    const _scrollViewVertical = useRef();
    const _scrollView = useRef();

    const _scrollX = useRef(new Animated.Value(0)).current;

    const {
        navigation,
        data,
        windowWidth,
        windowHeight, setWindowHeight,

        reviewModalVisible, setReviewModalVisibility,

        onDirectionPress,
        onCallPress,
        onAddReviewPress,

    } = useScreenHooks(props);

    return (
        <>
            <ScreenHeader
                navigation={navigation}
                title={data[RestaurantDBFields.restaurantName]}
                rightButton={
                    <FavouriteButton
                        restId={data.uid}
                        style={styles.FavButton}
                    />
                }
                onLayout={(layout) => setWindowHeight(layout.nativeEvent.layout.height - headerStyle.height - 50)}
            >
                <ScrollView
                    ref={_scrollViewVertical}
                    style={styles.Container}
                    contentContainerStyle={styles.ContentContainer}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    scrollEnabled={false}
                >

                    <View style={styles.ImageContainer}>

                        <SkeletonPlaceholder speed={1000}>
                            <View style={styles.ImageStyle} />
                        </SkeletonPlaceholder>

                        <FastImage
                            style={[styles.ImageStyle, { position: 'absolute' }]}
                            source={{ uri: data[RestaurantDBFields.restImage] }}
                            resizeMode='cover'
                        />

                    </View>

                    <View style={styles.DetailsContainer}>

                        <Text style={{ color: COLOR.BLACK, marginBottom: 5, }}>
                            {data[RestaurantDBFields.address]}, {data[RestaurantDBFields.city]}, {data[RestaurantDBFields.state]} {data[RestaurantDBFields.pincode]}
                        </Text>

                        <StarRating ratings={data[RestaurantDBFields.rate]} reviews={(data[RestaurantDBFields.reviews] && data[RestaurantDBFields.reviews] > 0) ? data[RestaurantDBFields.reviews] : undefined} />

                        <View style={styles.ButtonContainer}>

                            <TouchableOpacity style={styles.Button} onPress={onDirectionPress}>
                                <MaterialIcons name='directions' size={25} color={COLOR.BLACK} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.Button} onPress={onCallPress}>
                                <MaterialIcons name='call' size={25} color={COLOR.BLACK} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.Button} onPress={onAddReviewPress}>
                                <MaterialIcons name='rate-review' size={25} color={COLOR.BLACK} />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <MenuStrip
                        _scrollX={_scrollX}
                        onTabPress={(index) => {
                            _scrollView.current.scrollTo({ x: index * windowWidth })
                            _scrollViewVertical.current.scrollTo({ y: index > 0 ? windowHeight : 0 })
                        }}
                    />

                    <Animated.ScrollView
                        ref={_scrollView}
                        horizontal
                        pagingEnabled
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: _scrollX,
                                        }
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                        onMomentumScrollEnd={(e) => {
                            _scrollViewVertical.current.scrollTo({ y: e.nativeEvent.contentOffset.x > 0 ? windowHeight : 0 })
                        }}
                        bounces={false}
                        alwaysBounceHorizontal={false}
                    >

                        <Overview
                            data={data}
                            navigation={navigation}
                            width={windowWidth}
                        />

                        <Menu
                            restId={data?.uid}
                            height={windowHeight}
                            width={windowWidth}
                        />

                        <Reviews
                            restId={data?.uid}
                            height={windowHeight}
                            width={windowWidth}
                        />

                        <Photos
                            restId={data?.uid}
                            height={windowHeight}
                            width={windowWidth}
                        />

                    </Animated.ScrollView>

                </ScrollView>

                {
                    reviewModalVisible &&
                    <AddReviewModal
                        restId={data?.uid}
                        modalVisible={reviewModalVisible}
                        setModalVisible={setReviewModalVisibility}
                    />
                }

            </ScreenHeader >

            {
                reviewModalVisible &&
                <View style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: 100,
                    backgroundColor: COLOR.BLACK_10,
                }} />
            }

        </>
    )
}

export default RestarantDetailScreen