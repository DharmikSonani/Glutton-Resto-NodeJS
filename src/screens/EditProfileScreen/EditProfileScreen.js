import {
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import useScreenHooks from './EditProfileScreen.Hooks';
import { styles } from './styles';
import ScreenHeader from '../../component/ScreenHeader';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../component/button/CustomButton';
import AuthInput from '../../component/input/AuthInput';
import { keyboardType } from '../../constants/Strings';
import ImageSelectionModal from '../../component/modal/ImageSelectionModal';

const EditProfileScreen = (props) => {

    const {
        navigation,

        name, setName,
        email, setEmail,
        contactNo, setContactNo,
        image, setImage,
        mobileEnable,
        emailEnable,
        imageSelectionModalVisible, setImageSelectionModalVisibility,
        loading,

        onSavePress,
        onSelectImagePress,

    } = useScreenHooks(props);

    return (
        <>
            <ScreenHeader
                navigation={navigation}
                title={'Edit Profile'}
            >
                <ScrollView
                    style={styles.Container}
                    contentContainerStyle={styles.ContentContainerStyle}
                    bounces={false}
                >

                    <View style={styles.ImageContainer}>
                        <FastImage
                            source={{
                                uri:
                                    image
                                    ||
                                    'https://firebasestorage.googleapis.com/v0/b/gluttonresto.appspot.com/o/user_profile.jpg?alt=media&token=66288953-06ba-4e3a-8546-1fd4114dfa13'
                            }}
                            style={styles.Image}
                        />
                        <TouchableOpacity
                            style={styles.ImageSelectionButton}
                            onPress={onSelectImagePress}
                        >
                            <LinearGradient
                                colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                                style={styles.ImageSelectionButtonGradient}
                                angle={150}
                                useAngle
                            >
                                <MaterialIcons name='photo-camera' size={20} color={COLOR.WHITE} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

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
                        editable={emailEnable}
                    />

                    <AuthInput
                        value={contactNo}
                        onChangeText={setContactNo}
                        placeholder={'Phone No'}
                        phoneField
                        keyboardType={keyboardType.phone_pad}
                        maxLength={10}
                        editable={mobileEnable}
                    />

                    <CustomButton
                        colors={GRADIENTCOLOR.ORANGE}
                        text={loading ? 'Saving...' : 'Save Changes'}
                        onPress={onSavePress}
                        disabled={loading}
                        style={{ marginTop: 50, }}
                    >
                        {loading && <ActivityIndicator size={'small'} color={COLOR.WHITE} />}
                    </CustomButton>
                </ScrollView>
                <ImageSelectionModal
                    onImageSelect={setImage}
                    modalVisible={imageSelectionModalVisible}
                    setModalVisible={setImageSelectionModalVisibility}
                />
            </ScreenHeader>
            {
                imageSelectionModalVisible &&
                <View style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: 100,
                    backgroundColor: COLOR.BLACK_10,
                }} />
            }
        </>
    )
}

export default EditProfileScreen