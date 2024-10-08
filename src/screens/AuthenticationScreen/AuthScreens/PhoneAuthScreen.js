import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../../constants/Colors'
import CustomButton from '../../../component/button/CustomButton'
import AuthInput from '../../../component/input/AuthInput'
import { NavigationScreens, keyboardType } from '../../../constants/Strings'
import { useDispatch } from 'react-redux'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { storeAuthID } from '../../../constants/AsyncStorage'
import { setAuthIDInRedux } from '../../../redux/Authentication/AuthAction'
import { navigationToReset } from '../../../constants/NavigationController'
import { customerRegiaterAPI, getCustomerByUidAPI } from '../../../api/utils'
import socketServices from '../../../api/Socket'

const CELL_COUNT = 6;

const PhoneAuthScreen = ({
    onLayout,
    navigation,
    onScreenChange,
    duration,
    setLoading,
    onSuccess,
}) => {

    const [phoneNo, setPhoneNo] = useState('');

    const [screen, setScreen] = useState(1);

    const dispatch = useDispatch();

    const [otp, setOTP] = useState('');
    const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: otp, setValue: setOTP, });

    const [second, setSecond] = useState('');
    const [disableResend, setDisableResend] = useState(false);
    const [intervalID, setIntervalID] = useState('');
    const [timeoutID, setTimeoutID] = useState('');
    const [confirm, setConfirm] = useState('');

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [screen])

    const handleBackButtonClick = () => {
        if (screen != 1) {
            onScreenChange(0);
            setTimeout(() => {
                setScreen(1);
                onScreenChange(1);
            }, duration);
            return true;
        }
    }

    const onEditNumberPress = () => {
        clearInterval(intervalID);
        clearTimeout(timeoutID);
        onScreenChange(0);
        setTimeout(() => {
            setOTP('');
            setScreen(1);
            onScreenChange(1);
        }, duration);
    }

    const onVerifyOTPPress = async () => {
        if (otp.length != 6) {
            onSuccess('Enter Proper OTP.')
            return
        }
        try {
            setLoading(true);
            await confirm.confirm(otp);
            if (auth().currentUser) {
                const uid = auth().currentUser.uid;
                const customer = await getCustomerByUidAPI(uid);

                if (customer?.data) {
                    if (customer?.data?.data) {
                        storeAuthInfo(uid);
                    } else {
                        const data = {
                            "authType": "phone",
                            "uid": uid,
                            "email": "",
                            "contactNo": phoneNo,
                            "userName": "",
                        }
                        const register = await customerRegiaterAPI(data);
                        if (register?.data && register?.data?.data) {
                            socketServices.emit('CustomersUpdates', register?.data?.data)
                            storeAuthInfo(uid);
                        } else {
                            onSuccess('Something wents wrong.');
                        }
                    }
                }
            }
        } catch (error) {
            setLoading(false);
            auth().currentUser && auth().signOut();
            if (error.code == 'auth/session-expired') {
                onSuccess('OTP Is Expired, Please Resend It.')
            }

            if (error.code == 'auth/invalid-verification-code') {
                onSuccess('Invalid OTP')
            }

            console.log(error)
        }
    }

    const storeAuthInfo = async (uid) => {
        await storeAuthID(uid);
        dispatch(setAuthIDInRedux(uid));
        setLoading(false)
        onScreenChange(0);
        setTimeout(() => {
            navigationToReset(navigation, NavigationScreens.HomeTab);
        }, duration - 200);
    }

    const onSendOTP = async () => {
        if (!phoneNo) {
            onSuccess('Enter Phone No.')
            return
        }

        if (phoneNo.length != 10) {
            onSuccess('Enter Valid Phone No.')
            return
        }

        clearInterval(intervalID);
        clearTimeout(timeoutID);

        setDisableResend(true);
        await signInWithPhoneNumber("+91" + phoneNo)
        var sec = 59;
        setSecond(" in " + sec);
        const ID = setInterval(() => {
            { sec > 0 ? sec = sec - 1 : sec }
            { sec != 0 ? setSecond(" in " + sec) : setSecond('') }
        }, 1000);
        setIntervalID(ID);
        const timeID = setTimeout(() => {
            clearInterval(ID);
            setDisableResend(false);
        }, 60000);
        setTimeoutID(timeID);
    }

    const signInWithPhoneNumber = async (phoneNumber) => {
        try {
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
            setLoading(false);
            onSuccess(`OTP Send to +91 ${phoneNo}.`)
            if (screen == 1) {
                onScreenChange(0);
                setTimeout(() => {
                    setScreen(2);
                    onScreenChange(1);
                }, duration);
            }
        } catch (e) {
            console.log(e);
            if (e.code == 'auth/invalid-phone-number') {
                onSuccess('Invalid Phone No.')
            }
            setLoading(false);
        }
    }

    return (
        screen == 1 ?
            <View style={styles.Container} onLayout={onLayout}>
                <View style={styles.ContentContainer}>

                    <Text style={styles.TitleText}>Enter Phone Number</Text>
                    <Text style={[styles.SubTitleContainer, styles.SubTitleText, { marginTop: 5, }]}>We will send you the 6 digit verification code</Text>

                    <AuthInput
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                        placeholder={'Phone No'}
                        phoneField
                        keyboardType={keyboardType.phone_pad}
                        maxLength={10}
                        style={{ marginTop: 20, }}
                    />
                </View>
                <CustomButton
                    colors={GRADIENTCOLOR.ORANGE}
                    text={'Generate OTP'}
                    onPress={onSendOTP}
                />
            </View>
            :
            <View style={styles.Container} onLayout={onLayout}>
                <View style={styles.ContentContainer}>
                    <Text style={styles.TitleText}>OTP Verification</Text>

                    <View style={styles.SubTitleContainer}>
                        <Text style={styles.SubTitleText}>Enter the OTP sent to +91 {phoneNo}</Text>
                        <TouchableOpacity style={{ padding: 5, }} onPress={onEditNumberPress}>
                            <MaterialIcons name='mode-edit' size={15} color={COLOR.GRAY} />
                        </TouchableOpacity>
                    </View>

                    <SafeAreaView style={styles.OTPContainer}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={otp}
                            onChangeText={setOTP}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.OTPContentContainer}
                            keyboardType="number-pad"
                            textContentType='oneTimeCode'
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    style={[styles.OTPCell, isFocused && styles.OTPFocusCell]}
                                    key={index}
                                    onLayout={getCellOnLayoutHandler(index)}
                                >
                                    <Text
                                        key={index}
                                        style={[styles.TextStyle]}
                                    >
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                    </SafeAreaView>

                    <TouchableOpacity onPress={onSendOTP} disabled={disableResend}>
                        <Text style={[styles.ResendText, {
                            color: disableResend ? COLOR.GRAY : COLOR.ORANGE,
                        }]}>
                            Resend OTP{second && `${second} sec`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <CustomButton
                    colors={GRADIENTCOLOR.ORANGE}
                    text={'Verify OTP'}
                    onPress={onVerifyOTPPress}
                />
            </View>
    )
}

export default PhoneAuthScreen

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: 20,
    },
    ContentContainer: {
        marginVertical: 20,
        width: '100%',
    },
    TitleText: {
        color: COLOR.BLACK,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    SubTitleContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    SubTitleText: {
        fontSize: 14,
        color: COLOR.GRAY,
    },
    OTPContainer: {
        flexGrow: 0,
        marginVertical: 20,
    },
    OTPContentContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    OTPCell: {
        width: 45,
        aspectRatio: 1 / 1.1,
        elevation: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        backgroundColor: COLOR.WHITE,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
    TextStyle: {
        fontSize: 30,
        color: COLOR.BLACK,
        fontWeight: '500',
    },
    OTPFocusCell: {
        elevation: 2,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width: 50,
    },
    ResendText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 13,
    },
})