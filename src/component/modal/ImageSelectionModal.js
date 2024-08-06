import { Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, } from '../../constants/Colors';
import { headerBackgroundContainerStyle } from '../../constants/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ActionSnackBar } from '../../constants/SnackBars';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const ImageSelectionModal = ({
    onImageSelect,
    modalVisible,
    setModalVisible,
}) => {

    const onImageSelectPress = async () => {
        const granted = await checkPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        if (granted) {
            ImageCropPicker.openPicker({
                width: 720,
                height: 720,
                cropping: true,
                compressImageQuality: 1,
                mediaType: 'photo',
            }).then(image => {
                onImageSelect(image.path);
                setModalVisible(false);
            }).catch((e) => { console.log(e); });
        } else {
            ActionSnackBar('Please allow photo permission from settings.', 'Open', () => { Linking.openSettings() });
        }
    }

    const onCameraPress = async () => {
        const granted = await checkPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.CAMERA :
                PERMISSIONS.ANDROID.CAMERA
        );
        if (granted) {
            ImageCropPicker.openCamera({
                width: 720,
                height: 720,
                cropping: true,
                compressImageQuality: 1,
                mediaType: 'photo',
            }).then(image => {
                onImageSelect(image.path);
                setModalVisible(false);
            }).catch((e) => { console.log(e); });
        } else {
            ActionSnackBar('Please allow camera permission from settings.', 'Open', () => { Linking.openSettings() });
        }
    }

    const checkPermission = async (permission) => {
        return check(permission)
            .then((result) => {
                switch (result) {
                    case RESULTS.DENIED:
                        return requestPermission(permission);
                    case RESULTS.GRANTED:
                        return true;
                    case RESULTS.UNAVAILABLE:
                        return Platform.OS == 'android' && requestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
                }
            }).catch((error) => { console.log(error) })
    }

    const requestPermission = (permission) => {
        return request(permission, true).then((result) => {
            switch (result) {
                case RESULTS.GRANTED:
                    return true;
            }
        })
    }


    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <TouchableOpacity
                style={[{ height: '100%', width: '100%', }]}
                onPress={() => { setModalVisible(false) }}
                activeOpacity={1}
            >

            </TouchableOpacity>

            <View style={[styles.Container, headerBackgroundContainerStyle]}>
                <TouchableOpacity
                    onPress={onCameraPress}
                    style={[styles.Button,]}
                >
                    <MaterialIcons name='photo-camera' size={40} color={COLOR.BLACK} style={styles.ButtonIcons} />
                    <Text style={styles.ButtonText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onImageSelectPress}
                    style={[styles.Button,]}
                >
                    <MaterialIcons name='insert-photo' size={40} color={COLOR.BLACK} style={styles.ButtonIcons} />
                    <Text style={styles.ButtonText} numberOfLines={1}>Gallery</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ImageSelectionModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    Container: {
        alignItems: "center",
        justifyContent: "space-evenly",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 30,
        paddingTop: 40,
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
    },
    Button: {
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.BLACK,
        marginTop: 5,
        fontSize: 13,
        fontWeight: '400',
    }
})
