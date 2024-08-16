import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { GRADIENTCOLOR } from '../../../constants/Colors'
import AuthInput from '../../../component/input/AuthInput';
import CustomButton from '../../../component/button/CustomButton';
import { NavigationScreens, keyboardType } from '../../../constants/Strings';
import auth from '@react-native-firebase/auth';
import { emailRegEx, passwordRegEx } from '../../../constants/RegularExpression';
import { storeAuthID } from '../../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../../redux/Authentication/AuthAction';
import { useDispatch } from 'react-redux';
import { navigationToReset } from '../../../constants/NavigationController';
import { customerRegiaterAPI } from '../../../api/utils';

const SignupScreen = ({
    onLayout,
    navigation,
    setLoading,
    onSuccess,
    duration,
    onScreenChange,
}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onRegisterPress = () => {
        if (!name) {
            onSuccess('Enter Name.')
            return;
        }

        if (!email) {
            onSuccess('Enter Email.')
            return;
        }

        if (!emailRegEx.test(email)) {
            onSuccess('Enter Valid Email.')
            return;
        }

        if (password.length < 6) {
            onSuccess('Password must contain 6 or more character.')
            return;
        }

        if (!passwordRegEx.test(password)) {
            onSuccess('Password must contain alphabets and numbers.')
            return;
        }

        try {
            setLoading(true);
            auth().createUserWithEmailAndPassword(email, password)
                .then(async (res) => {
                    const uid = res.user.uid;

                    const params = {
                        "authType": "email",
                        "uid": uid,
                        "email": email,
                        "contactNo": "",
                        "userName": name
                    }

                    const user = await customerRegiaterAPI(params);

                    if (user?.data && user?.data?.data) {
                        await storeAuthID(uid);
                        dispatch(setAuthIDInRedux(uid));
                        onScreenChange(0);
                        setTimeout(() => {
                            navigationToReset(navigation, NavigationScreens.HomeTab);
                        }, duration - 200);
                    } else {
                        onSuccess('Something wents wrong');
                    }
                    setLoading(false);
                })
                .catch((e) => {
                    setLoading(false);
                    if (e.code == 'auth/email-already-in-use') {
                        onSuccess('This Email is already used with Glutton.');
                    }
                })
        } catch (e) { console.log(e), setLoading(false) }
    }

    return (
        <View style={styles.Container} onLayout={onLayout}>
            <View style={styles.ContentContainer}>

                <AuthInput
                    value={name}
                    onChangeText={setName}
                    placeholder={'Name'}
                    keyboardType={keyboardType.default}
                />

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

            </View>
            <CustomButton
                colors={GRADIENTCOLOR.ORANGE}
                text={'Register'}
                onPress={onRegisterPress}
            />
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: 20,
    },
    ContentContainer: {
        marginVertical: 20,
        width: '100%',
    },
})