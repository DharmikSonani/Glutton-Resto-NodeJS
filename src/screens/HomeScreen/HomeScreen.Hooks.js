import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import { Animated, Dimensions, Keyboard, PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service'
import { getActiveRestaurantsAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const mapAnimation = new Animated.Value(1);
    const bottomTabHeight = useSelector(state => state[Reducers.BottomTabHeightReducer]);
    const width = Dimensions.get('window').width - 50;

    const initialRegion = {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }

    // UseStates
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [searchListVisible, setSearchListVisible] = useState(false);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const [height, setHeight] = useState(0);

    // UseEffects
    useEffect(() => {
        fetchData();
    }, [])

    // Methods
    const fetchData = async () => {
        try {
            const res = await getActiveRestaurantsAPI();
            res?.data && setData(res?.data?.data);
        } catch (e) {
            console.log(e);
        }
    }

    const requestLocationPermission = async (_map) => {
        if (Platform.OS === 'ios') {
            const locationPermissionStatus = await Geolocation.requestAuthorization(
                'whenInUse',
            );

            const locationGranted = locationPermissionStatus === 'granted' || locationPermissionStatus === 'restricted';

            if (locationGranted) {
                handleUserLocation(_map);
                return true;
            }
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    handleUserLocation(_map);
                } else {
                    requestLocationPermission();
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }

    const handleUserLocation = (_map) => {
        Geolocation.getCurrentPosition(
            (pos) => {
                _map?.current.animateToRegion({
                    ...initialRegion,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
            },
            (error) => {
                // See error code charts below.
                console.warn("Error " + error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
    }

    const onMarkerPress = (mapEventData, _scrollView) => {
        const markerID = mapEventData._targetInst.return.key;
        const x = (markerID * width);
        _scrollView?.current?.scrollTo({ x: x, animated: true });
    }

    const interpolations = data.map((marker, index) => {
        const inputRange = [
            (index - 2) * width - 25,
            (index - 1) * width - 25,
            index * width - 25,
            (index + 1) * width - 25,
            (index + 2) * width - 25,
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1, 1.5, 1, 1],
            extrapolate: "clamp"
        });
        const translateY = mapAnimation.interpolate({
            inputRange,
            outputRange: [0, 0, -7.5, 0, 0],
        });

        return { scale, translateY };
    });

    const onClearPress = (_map, _scrollView) => {
        setSearch('');
        setSearchList([]);
        setSearchListVisible(false);

        Keyboard.dismiss();

        _scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
        _map.current.animateToRegion({
            ...initialRegion,
            latitude: parseFloat(data[0].coordinates.latitude),
            longitude: parseFloat(data[0].coordinates.longitude),
        })
    }

    const onSearch = (text) => {
        setSearch(text);
        if (text) {
            setSearchListVisible(true);
            setSearchList(data.filter((data) => data.restaurantName.toLowerCase().includes(text.toLowerCase())));
        } else {
            setSearchListVisible(false);
            setSearchList([]);
        }
    }

    const onItemPress = (item, _map, _scrollView) => {
        setSearchListVisible(false);
        setSearch(item.restaurantName);
        setSearchList([]);

        const markerID = data.findIndex(obj => obj.uid == item.uid);
        const x = (markerID * width);

        mapAnimation.setValue(x);

        _scrollView.current.scrollTo({ x: x, animated: true });
        _map.current.animateToRegion({
            ...initialRegion,
            latitude: parseFloat(item.coordinates.latitude),
            longitude: parseFloat(item.coordinates.longitude),
        })
    }

    return {
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
    };
}

export default useScreenHooks