import {
    View,
    StatusBar,
    Animated,
    TouchableOpacity,
    FlatList,
    Text,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './HomeScreen.Hooks';
import { styles } from './styles';
import MapView, { Marker } from 'react-native-maps';
import { MapStandardStyle } from '../../constants/MapStyle';
import { MarkerIcon } from '../../constants/Assets';
import RestoCard from '../../component/RestoCard';
import SearchView from '../../component/SearchView';
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HomeScreen = (props) => {

    const _map = useRef();
    const _scrollView = useRef();

    const {
        navigation,
        width,
        mapAnimation,
        initialRegion,
        interpolations,
        bottomTabHeight,

        data,
        search,
        searchList,
        searchListVisible,
        scrollViewHeight, setScrollViewHeight,
        height, setHeight,

        requestLocationPermission,
        onMarkerPress,
        onClearPress,
        onSearch,
        onItemPress,

    } = useScreenHooks(props);

    useEffect(() => {
        requestLocationPermission(_map);
    }, [])

    return (
        <View
            style={styles.ViewWrapper}
            onLayout={(layout) => height == 0 && setHeight(layout.nativeEvent.layout.height)}
        >

            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLOR.TRANSPARANT}
                translucent
            />

            {/* Map View */}
            <MapView
                ref={_map}
                provider={'google'}
                initialRegion={initialRegion}
                style={{ flex: 1, }}
                showsMyLocationButton={false}
                showsUserLocation={true}
                customMapStyle={MapStandardStyle}
                toolbarEnabled={false}
            >
                {
                    data.length > 0 && data.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    translateY: interpolations[index].translateY,
                                },
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        return (
                            <Marker
                                key={index}
                                coordinate={marker.coordinates}
                                onPress={(e) => onMarkerPress(e, _scrollView)}
                            >
                                <Animated.View style={styles.MarkerWrap}>
                                    <Animated.Image
                                        source={MarkerIcon}
                                        style={[styles.Marker, scaleStyle]}
                                        resizeMode='contain'
                                    />
                                </Animated.View>
                            </Marker>
                        );
                    })
                }
            </MapView>

            {/* Resto Cards */}
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
                style={[styles.ScrollView, { marginTop: height - scrollViewHeight - bottomTabHeight }]}
                contentContainerStyle={{ paddingHorizontal: 25, }}
                snapToInterval={width}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
                onMomentumScrollEnd={(e) => {
                    const i = Math.ceil((e.nativeEvent.contentOffset.x) / width);
                    const marker = data[i];
                    marker && _map.current.animateToRegion({
                        ...initialRegion,
                        latitude: parseFloat(marker.coordinates.latitude),
                        longitude: parseFloat(marker.coordinates.longitude),
                    })
                }}
            >
                {
                    data.map((marker, index) => {
                        const inputRange = [
                            (index - 2) * width,
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width,
                            (index + 2) * width
                        ];
                        return (
                            <Animated.View
                                key={index}
                                style={{
                                    width: width,
                                    transform: [
                                        {
                                            translateY: mapAnimation.interpolate({
                                                inputRange,
                                                outputRange: [20, 20, 0, 20, 20],
                                            })
                                        },
                                        {
                                            scale: mapAnimation.interpolate({
                                                inputRange,
                                                outputRange: [0.9, 0.9, 1, 0.9, 0.9],
                                            })
                                        },
                                    ]
                                }}
                            >
                                <RestoCard
                                    data={marker}
                                    navigation={navigation}
                                />
                            </Animated.View>
                        );
                    })
                }
            </Animated.ScrollView>

            {/* Search View */}
            <View style={styles.SearchContainer}>

                <SearchView
                    search={search}
                    setSearch={onSearch}
                    onClear={() => onClearPress(_map, _scrollView)}
                />

                <TouchableOpacity
                    style={styles.LocationButton}
                    onPress={() => { requestLocationPermission(_map); }}
                >
                    <MaterialIcons name='my-location' size={25} color={COLOR.BLACK} />
                </TouchableOpacity>

            </View>

            {
                searchListVisible &&
                <View style={styles.SearchItems}>
                    <FlatList
                        data={searchList}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                style={{
                                    padding: 5,
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                                onPress={() => onItemPress(item, _map, _scrollView)}
                            >
                                <View style={{ flex: 1 }}>

                                    <Text style={{ color: COLOR.BLACK, fontSize: 13, }} numberOfLines={1}>{item.restaurantName}</Text>

                                    <Text style={{ fontSize: 11, color: COLOR.GRAY, }} numberOfLines={1}>{item.address}, {item.city}, {item.state} {item.pincode}</Text>

                                </View>

                                <Feather name='arrow-up-left' size={20} color={COLOR.GRAY} />

                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.restId}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Text style={styles.TextStyle}>Restaurant Not Found</Text>}
                        style={{ flex: 1, }}
                        contentContainerStyle={styles.SearchItemsContentContainer}
                    />
                </View>
            }
        </View>
    )
}

export default HomeScreen