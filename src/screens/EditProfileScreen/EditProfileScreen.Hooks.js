import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerDBFields, } from '../../constants/Database';
import storage from '@react-native-firebase/storage';
import { NormalSnackBar } from '../../constants/SnackBars';
import { updateCustomerByUidAPI } from '../../api/utils';
import { setUserDataInRedux } from '../../redux/UserData/UserDataAction';
import socketServices from '../../api/Socket';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const userData = useSelector(state => state[Reducers.UserDataReducer]);
    const uid = useSelector(state => state[Reducers.AuthReducer]);
    const dispatch = useDispatch();

    // UseStates
    const [name, setName] = useState(userData && userData[CustomerDBFields.userName]);
    const [email, setEmail] = useState(userData && userData[CustomerDBFields.email]);
    const [contactNo, setContactNo] = useState(userData && userData[CustomerDBFields.contactNo]);
    const [image, setImage] = useState(userData && userData[CustomerDBFields.userImg]);

    const [mobileEnable, setMobileEnable] = useState(false);
    const [emailEnable, setEmailEnable] = useState(false);

    const [imageSelectionModalVisible, setImageSelectionModalVisibility] = useState(false);

    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        if (!auth()?.currentUser?.emailVerified && auth()?.currentUser?.email == null) {
            // Login Using Mobile Number
            setMobileEnable(false);
            setEmailEnable(true);
        } else {
            // Login Using Email Or Google
            setMobileEnable(true);
            setEmailEnable(false);
        }
    }, [])

    // Methods
    const onSavePress = async () => {
        try {
            if (!name) {
                NormalSnackBar('Enter Name.');
                return;
            }
            if (!email) {
                NormalSnackBar('Enter Email.');
                return;
            }
            if (!contactNo) {
                NormalSnackBar('Enter Phone No.');
                return;
            }

            setLoading(true);

            let imageUri = ''

            image && (imageUri = image?.includes('http') ? image : await uploadImage());

            let data = {};
            data[CustomerDBFields.userName] = name;
            data[CustomerDBFields.email] = email;
            data[CustomerDBFields.contactNo] = contactNo;
            data[CustomerDBFields.userImg] = imageUri;

            const res = await updateCustomerByUidAPI(uid, data);
            setLoading(false);
            if (res?.data) {
                socketServices.emit('CustomersUpdates', res?.data?.data)
                dispatch(setUserDataInRedux(res.data?.data));
                NormalSnackBar('Profile Update Successfully.');
                navigation.pop(1);
            }
        } catch (e) {
            setLoading(false)
            NormalSnackBar('Something wents wrong.')
            console.log(e);
        }
    }

    const uploadImage = async () => {
        if (image == '') {
            return ''
        }

        const uploadUri = image;
        let filename = uid;

        const storageRef = storage().ref(`User Photos/${filename}`)
        const task = storageRef.putFile(uploadUri);
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        try {
            await task
            const uri = storageRef.getDownloadURL()
            return uri;
        } catch (e) {
            console.log(e);
            return null;
        }
    }


    const onSelectImagePress = () => setImageSelectionModalVisibility(true);

    return {
        navigation,

        name, setName,
        email, setEmail,
        contactNo, setContactNo,
        image, setImage,
        mobileEnable, setMobileEnable,
        emailEnable, setEmailEnable,
        imageSelectionModalVisible, setImageSelectionModalVisibility,
        loading, setLoading,

        onSelectImagePress,
        onSavePress,
    };
}

export default useScreenHooks