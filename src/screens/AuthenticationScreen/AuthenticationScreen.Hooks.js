import { Animated, BackHandler, Dimensions } from 'react-native';
import { NavigationScreens } from '../../constants/Strings';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { storeAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { navigationToReset } from '../../constants/NavigationController';
import { NormalSnackBar } from '../../constants/SnackBars';
import { customerRegiaterAPI, getCustomerByUidAPI } from '../../api/utils';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height + 30;

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const animation = useRef(new Animated.Value(0)).current;
    const animationDuration = 800;
    const dispatch = useDispatch();

    // UseStates
    const [translateY, setTranslateY] = useState(0);
    const [activeView, setActiveView] = useState(0);
    const [timeoutId, setTimeoutId] = useState('');

    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [activeView])

    // Methods
    const onAnimate = (value, reset = false) => {
        clearTimeout(timeoutId);
        Animated.timing(animation, {
            toValue: value,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
        if (value == 0 && reset) {
            let id = setTimeout(() => {
                setActiveView(0);
            }, animationDuration);
            setTimeoutId(id);
        }
    }

    const handleBackButtonClick = () => {
        if (activeView != 0) {
            onAnimate(0, true);
            return true;
        }
    }

    const onGooglePress = async () => {
        try {
            setLoading(true);

            await GoogleSignin.hasPlayServices();

            setLoading(false);

            const { idToken } = await GoogleSignin.signIn().catch((e) => { console.log(e) });

            setLoading(true);

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            auth()
                .signInWithCredential(googleCredential)
                .then(async (res) => {
                    const user = res.user;
                    const uid = res.user.uid;

                    const customer = await getCustomerByUidAPI(uid);

                    if (customer?.data) {
                        if (customer?.data?.data) {
                            await storeAuthID(uid);
                            dispatch(setAuthIDInRedux(uid));
                            navigationToReset(navigation, NavigationScreens.HomeTab);
                            setLoading(false);
                        } else {
                            const data = {
                                "authType": "google",
                                "uid": uid,
                                "email": user.email,
                                "contactNo": "",
                                "userName": user.displayName,
                            }
                            const register = await customerRegiaterAPI(data);
                            if (register?.data && register?.data?.data) {
                                await storeAuthID(uid);
                                dispatch(setAuthIDInRedux(uid));
                                navigationToReset(navigation, NavigationScreens.HomeTab);
                                setLoading(false);
                            } else {
                                NormalSnackBar('Something wents wrong.');
                            }
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                    setLoading(false);
                    NormalSnackBar('Something wents wrong.');
                });
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const onSuccess = (mes) => {
        setTimeout(() => {
            NormalSnackBar(mes)
        }, 10);
    }

    return {
        navigation,
        animation,
        animationDuration,
        width, height,

        translateY, setTranslateY,
        activeView, setActiveView,
        loading, setLoading,

        onAnimate,
        onGooglePress,
        onSuccess,
    };
}

export default useScreenHooks