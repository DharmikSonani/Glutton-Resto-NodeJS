import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GRADIENTCOLOR } from '../../../constants/Colors'
import AuthInput from '../../../component/input/AuthInput';
import CustomButton from '../../../component/button/CustomButton';
import { NavigationScreens, keyboardType } from '../../../constants/Strings';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CustomerDBFields, CustomerDBPath } from '../../../constants/Database';
import { emailRegEx, passwordRegEx } from '../../../constants/RegularExpression';
import { storeAuthID } from '../../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../../redux/Authentication/AuthAction';
import { useDispatch } from 'react-redux';
import { navigationToReset } from '../../../constants/NavigationController';

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
                .then((res) => createUser(res.user.uid))
                .catch((e) => {
                    setLoading(false);
                    if (e.code == 'auth/email-already-in-use') {
                        onSuccess('This Email is already used with Glutton.');
                    }
                })
        } catch (e) { console.log(e), setLoading(false) }
    }

    const createUser = async (uid) => {
        try {
            let data = {}
            data[CustomerDBFields.authType] = 'email';
            data[CustomerDBFields.contactNo] = '';
            data[CustomerDBFields.createdAt] = firestore.Timestamp.fromDate(new Date());
            data[CustomerDBFields.email] = email;
            data[CustomerDBFields.userId] = uid;
            data[CustomerDBFields.userImg] = '';
            data[CustomerDBFields.userName] = name;

            CustomerDBPath.doc(uid).set(data)
                .then(async () => {
                    await storeAuthID(uid);
                    dispatch(setAuthIDInRedux(uid));
                    setLoading(false);
                    onScreenChange(0);
                    setTimeout(() => {
                        navigationToReset(navigation, NavigationScreens.HomeTab);
                    }, duration - 200);
                })
        } catch (error) {
            console.log(error);
        }
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