import { ActivityIndicator, Keyboard, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, GRADIENTCOLOR, } from '../../constants/Colors';
import { headerBackgroundContainerStyle } from '../../constants/Styles';
import CustomButton from '../button/CustomButton';
import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NormalSnackBar } from '../../constants/SnackBars';
import { addRatingAPI } from '../../api/utils';

const AddReviewModal = ({
    restId,
    modalVisible,
    setModalVisible,
}) => {

    const userData = useSelector(state => state[Reducers.UserDataReducer]);

    const [rating, setRating] = useState(0);
    const [desc, setDesc] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const onSubmit = async () => {
        try {
            if (rating == 0) {
                NormalSnackBar('Give Ratings.')
                return;
            }

            if (!desc) {
                NormalSnackBar('Give Review about your experience.')
                return;
            }

            setLoading(true);

            let data = {};

            data['restId'] = restId;
            data['review'] = desc;
            data['rating'] = rating;
            data['userId'] = userData._id;

            const res = await addRatingAPI(data);

            if (res?.data && res.data?.status == true) {
                NormalSnackBar('Review Submit.')
                setLoading(false);
                setRating(0);
                setDesc('');
                setModalVisible(false);
            } else {
                NormalSnackBar('Something wents wrong.')
                setLoading(false);
                setRating(0);
                setDesc('');
            }
        } catch (e) {
            NormalSnackBar('Something wents wrong.')
            setLoading(false);
            setRating(0);
            setDesc('');
        }
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { !loading && setModalVisible(false) }}
        >
            <TouchableOpacity
                style={[{ height: '100%', width: '100%', }]}
                onPress={() => { !loading && setModalVisible(false) }}
                activeOpacity={1}
            >

            </TouchableOpacity>

            <View style={[styles.Container, headerBackgroundContainerStyle, { bottom: keyboardHeight }]}>
                <View style={styles.RatingContainer}>
                    {
                        [1, 2, 3, 4, 5].map((item, key) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { setRating(item) }}
                                    key={item}
                                    style={{ padding: 10, }}
                                    activeOpacity={1}
                                >
                                    {
                                        item <= rating ?
                                            <Ionicons name={'star'} size={25} style={styles.star} color={COLOR.RATING} />
                                            :
                                            <Ionicons name={'star-outline'} size={25} style={styles.star} color={COLOR.BLACK_10} />
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <TextInput
                    placeholder="Describe your experience..."
                    style={styles.TextInput}
                    value={desc}
                    onChangeText={setDesc}
                    placeholderTextColor={COLOR.GRAY}
                    multiline
                    blurOnSubmit
                />

                <CustomButton
                    colors={GRADIENTCOLOR.ORANGE}
                    text={loading ? 'Processing...' : 'Submit'}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    {loading && <ActivityIndicator color={COLOR.WHITE} size={'small'} />}
                </CustomButton>
            </View>
        </Modal>
    )
}

export default AddReviewModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    Container: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        position: 'absolute',
        zIndex: 100,
    },
    RatingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    TextInput: {
        width: "100%",
        height: 100,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        backgroundColor: COLOR.BORDERCOLOR,
        fontSize: 13,
        color: COLOR.BLACK,
        textAlignVertical: 'top',
    },
})
