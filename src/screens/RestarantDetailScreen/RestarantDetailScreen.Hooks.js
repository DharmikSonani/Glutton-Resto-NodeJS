import { Dimensions, Linking, Platform } from 'react-native';
import { RestaurantDBFields } from '../../constants/Database';
import call from 'react-native-phone-call';
import { useState } from 'react';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const data = props?.route?.params?.data;
    const windowWidth = Dimensions.get('window').width;

    // UseStates
    const [reviewModalVisible, setReviewModalVisibility] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);

    // UseEffects


    // Methods
    const onDirectionPress = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latlong = `${data[RestaurantDBFields.coordinates].latitude},${data[RestaurantDBFields.coordinates].longitude}`;
        const lable = data[RestaurantDBFields.restaurantName];

        const encodedLabel = encodeURIComponent(lable);
        const url = Platform.select({
            ios: `${scheme}${latlong}${encodedLabel}@`,
            android: `${scheme}${latlong}(${encodedLabel})`,
        });

        Linking
            .canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                }
                console.log('Cannot open map URL');
            })
            .catch((error) => console.log(error));
    }

    const onCallPress = () => {
        call({
            number: data[RestaurantDBFields.contactNo],
            prompt: false,
            skipCanOpen: true
        }).catch(console.log)
    }

    const onAddReviewPress = () => setReviewModalVisibility(true);


    return {
        navigation,
        data,
        windowWidth,
        windowHeight, setWindowHeight,

        reviewModalVisible, setReviewModalVisibility,

        onDirectionPress,
        onCallPress,
        onAddReviewPress,

    };
}

export default useScreenHooks