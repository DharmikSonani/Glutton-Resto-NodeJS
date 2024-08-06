import { Animated, BackHandler, Dimensions } from 'react-native';
import { NavigationScreens } from '../../constants/Strings';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { CustomerDBFields, CustomerDBPath } from '../../constants/Database';
import { storeAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { navigationToReset } from '../../constants/NavigationController';
import firestore from '@react-native-firebase/firestore';
import { NormalSnackBar } from '../../constants/SnackBars';

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
                .then((res) => {
                    const user = res.user;
                    const uid = res.user.uid;

                    let path = CustomerDBPath.doc(uid);

                    path.get()
                        .then((documentSnapshot) => {
                            let data = {}

                            data[CustomerDBFields.authType] = 'google';

                            if (documentSnapshot.exists) {
                                path = path.update(data)
                            } else {

                                data[CustomerDBFields.contactNo] = '';
                                data[CustomerDBFields.createdAt] = firestore.Timestamp.fromDate(new Date());
                                data[CustomerDBFields.email] = user.email;
                                data[CustomerDBFields.userId] = uid;
                                data[CustomerDBFields.userImg] = '';
                                data[CustomerDBFields.userName] = user.displayName;

                                path = path.set(data)
                            }
                            path.then(async () => {
                                await storeAuthID(uid);
                                dispatch(setAuthIDInRedux(uid));
                                navigationToReset(navigation, NavigationScreens.HomeTab);
                                setLoading(false);
                            })
                        })
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