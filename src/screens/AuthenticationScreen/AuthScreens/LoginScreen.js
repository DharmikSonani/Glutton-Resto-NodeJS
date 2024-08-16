import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../../constants/Colors'
import AuthInput from '../../../component/input/AuthInput'
import { NavigationScreens, keyboardType } from '../../../constants/Strings'
import CustomButton from '../../../component/button/CustomButton'
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import { emailRegEx } from '../../../constants/RegularExpression'
import { useDispatch } from 'react-redux'
import { storeAuthID } from '../../../constants/AsyncStorage'
import { setAuthIDInRedux } from '../../../redux/Authentication/AuthAction'
import { navigationToReset } from '../../../constants/NavigationController'
import { checkUserByUID } from '../../../api/utils'

const LoginScreen = ({
    onLayout,
    navigation,
    onScreenChange,
    duration,
    setLoading,
    onSuccess,
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [screen, setScreen] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [screen])

    const handleBackButtonClick = () => {
        if (screen != 1) {
            onScreenChange(0)
            setTimeout(() => {
                setScreen(1);
                onScreenChange(1);
            }, duration);
            return true;
        }
    }

    const onForgotPasswordPress = () => {
        onScreenChange(0)
        setTimeout(() => {
            setScreen(2);
            onScreenChange(1);
        }, duration);
    }

    const onSendMailPress = () => {
        if (!email) {
            onSuccess('Enter Email.');
            return;
        }

        if (!emailRegEx.test(email)) {
            onSuccess('Enter Valid Email.');
            return;
        }
        try {
            setLoading(true);
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    setLoading(false);
                    onSuccess('Mail Sended Successfully, Please check your mail.');
                    handleBackButtonClick();
                })
                .catch((e) => {
                    setLoading(false);
                    if (e.code == 'auth/user-not-found') {
                        onSuccess('This email not register with Glutton.');
                    }
                    if (e.code == 'auth/too-many-requests') {
                        onSuccess('Please try sometimes later.');
                    }
                })
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const onLoginPress = () => {
        if (!email) {
            onSuccess('Enter Email.');
            return;
        }

        if (!emailRegEx.test(email)) {
            onSuccess('Enter Valid Email.');
            return;
        }
        if (!password) {
            onSuccess('Enter Password.');
            return;
        }

        setLoading(true);

        try {
            auth().signInWithEmailAndPassword(email, password)
                .then(async (res) => {
                    const uid = res.user.uid;
                    const user = await checkUserByUID(uid);
                    if (user?.data) {
                        if (user?.data?.data) {
                            const type = user.data.data;
                            if (type == 'Customer') {
                                await storeAuthID(uid);
                                dispatch(setAuthIDInRedux(uid));
                                onScreenChange(0);
                                setTimeout(() => {
                                    navigationToReset(navigation, NavigationScreens.HomeTab);
                                }, duration - 200);
                            } else {
                                auth().signOut();
                                onSuccess(`This email is register as Glutton ${type}`);
                            }
                        }
                        setLoading(false);
                    } else {
                        setLoading(false);
                        onSuccess('Something wents wrong.');
                    }
                })
                .catch((e) => {
                    setLoading(false);
                    if (e.code == 'auth/user-not-found') {
                        onSuccess('User not found, Please register first.');
                    } else if (e.code == 'auth/wrong-password') {
                        onSuccess('Incorrect Password');
                    }
                })
        } catch (e) { console.log(e) }
    }

    return (
        screen == 1 ?
            <View style={styles.Container} onLayout={onLayout}>
                <View style={styles.ContentContainer}>
                    <AuthInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={'Email'}
                        keyboardType={keyboardType.email_address}
                    />
                    <AuthInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder={'Password'}
                        keyboardType={keyboardType.email_address}
                        passwordFiled
                    />
                    <TouchableOpacity
                        style={styles.ForgotPasswordButton}
                        onPress={onForgotPasswordPress}
                    >
                        <Text style={styles.ForgotPasswordButtonText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton
                    colors={GRADIENTCOLOR.ORANGE}
                    text={'Login'}
                    onPress={onLoginPress}
                />
            </View>
            :
            <View style={styles.Container} onLayout={onLayout}>
                <TouchableOpacity
                    onPress={handleBackButtonClick}
                    style={styles.BackButton}
                >
                    <Entypo name="chevron-left" size={25} color={COLOR.BLACK} />
                    <Text style={{ color: COLOR.BLACK }}>Login</Text>
                </TouchableOpacity>
                <View style={styles.ContentContainer}>
                    <AuthInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder={'Email'}
                        keyboardType={keyboardType.email_address}
                    />
                </View>
                <CustomButton
                    colors={GRADIENTCOLOR.ORANGE}
                    text={'Send Password Reset Mail'}
                    onPress={onSendMailPress}
                />
            </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: 20,
    },
    ContentContainer: {
        marginVertical: 20,
        width: '100%',
    },
    ForgotPasswordButton: {
        alignItems: 'flex-end',
        marginTop: 10,
        paddingVertical: 10,
        marginBottom: -10,
        justifyContent: 'center',
    },
    ForgotPasswordButtonText: {
        color: COLOR.GRAY,
        fontSize: 12,
    },
    BackButton: {
        position: 'absolute',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 10,
        flexDirection: 'row',
    },
})