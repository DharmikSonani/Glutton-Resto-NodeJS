import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR, } from '../../constants/Colors';
import FieldValuePairLabel from '../FieldValuePairLabel';
import DataDisplayCard from '../DataDisplayCard';
import moment from 'moment';
import { format } from 'date-fns';
import { CustomerDBFields } from '../../constants/Database';
import CustomButton from '../button/CustomButton';
import { NormalSnackBar } from '../../constants/SnackBars';
import { BookingDoneVideo } from '../../constants/Assets';
import Video from 'react-native-video';
import FieldValuePairInput from '../input/FieldValuePairInput';
import { keyboardType } from '../../constants/Strings';
import { emailRegEx } from '../../constants/RegularExpression';
import { bookTableAPI } from '../../api/utils';
import socketServices from '../../api/Socket';

const width = Dimensions.get('window').width * 0.9;

const BookingConfirmationModal = ({
    userData,
    restId,
    restName,
    date,
    time,
    noGuest,
    modalVisible,
    setModalVisible,
    onSuccess,
}) => {

    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(userData && userData[CustomerDBFields.userName]);
    const [phoneNo, setPhoneNo] = useState(userData && userData[CustomerDBFields.contactNo]);
    const [email, setEmail] = useState(userData && userData[CustomerDBFields.email]);

    const onConfirmPress = async () => {

        if (!name) {
            NormalSnackBar('Enter Name.');
            return
        }

        if (!phoneNo) {
            NormalSnackBar('Enter Contact No.');
            return
        }

        if (phoneNo.length != 10) {
            NormalSnackBar('Enter Valid Contact No.');
            return
        }

        if (!email) {
            NormalSnackBar('Enter Email.');
            return
        }

        if (!emailRegEx.test(email)) {
            NormalSnackBar('Enter Valid Email.');
            return
        }

        try {
            const params = {
                "restaurant": {
                    "uid": restId,
                    "name": restName,
                },
                "customer": {
                    "uid": userData.uid,
                    "name": name,
                    "email": email,
                    "contact": phoneNo,
                },
                "booking": {
                    "noOfGuest": noGuest,
                    "time": moment(time, ['HH:mm A']).format('HH:mm').toString(),
                    "date": date,
                },
                "isCancel": false,
                "isVerify": false
            };

            setLoading(true);
            const res = await bookTableAPI(params);
            if (res?.data && res?.data?.status == true) {
                socketServices.emit('AddBooking', res?.data?.data);
                setIsDone(true);
                setTimeout(() => {
                    setModalVisible(false);
                    setLoading(false);
                    setIsDone(false);
                }, 2400);
                onSuccess();
            } else {
                setLoading(false);
                NormalSnackBar('Something wents wrong.');
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            NormalSnackBar('Something wents wrong.');
        }
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { !loading && setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                {
                    isDone ?
                        <View style={styles.Container}>
                            <Video
                                source={BookingDoneVideo}
                                style={{
                                    width: width * 0.7,
                                    aspectRatio: 1 / 1.25,
                                }}
                                resizeMode='contain'
                                shutterColor={COLOR.WHITE}
                            />
                        </View>
                        :
                        <View style={styles.Container}>

                            <DataDisplayCard
                                title={'Confirm Booking'}
                            >

                                <FieldValuePairInput
                                    field={'Book By'}
                                    value={name}
                                    onChangeText={setName}
                                    keyboardType={keyboardType.default}
                                />

                                <FieldValuePairInput
                                    field={'Contact No.'}
                                    value={phoneNo}
                                    onChangeText={setPhoneNo}
                                    keyboardType={keyboardType.number_pad}
                                    maxLength={10}
                                />

                                <FieldValuePairInput
                                    field={'E-Mail'}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType={keyboardType.email_address}
                                />

                                <FieldValuePairLabel
                                    field={'Time'}
                                    value={time}
                                />

                                <FieldValuePairLabel
                                    field={'Date'}
                                    value={date && format(new Date(date), 'MMMM d, yyyy')}
                                />

                                <FieldValuePairLabel
                                    field={'Guests'}
                                    value={noGuest}
                                    style={{ marginBottom: 0 }}
                                />

                            </DataDisplayCard>

                            <View style={styles.NoteContainer}>

                                <Text style={[styles.NoteText,]} numberOfLines={1}>Note : </Text>
                                <Text style={[styles.NoteText, { flex: 1 }]}>Please visit the restaurant 30 minutes before your booking time to verify your booking.</Text>

                            </View>

                            <View style={{ marginTop: 10, }}>
                                <CustomButton
                                    colors={GRADIENTCOLOR.ORANGE}
                                    text={loading ? 'Processing...' : 'Confirm'}
                                    onPress={onConfirmPress}
                                    disabled={loading}
                                >
                                    {loading && <ActivityIndicator size={'small'} color={COLOR.WHITE} />}
                                </CustomButton>
                            </View>

                            {
                                !loading &&
                                <TouchableOpacity
                                    style={styles.CloseButton}
                                    onPress={() => { setModalVisible(false) }}
                                    activeOpacity={1}
                                >
                                    <Ionicons name='close' size={20} color={COLOR.WHITE} />
                                </TouchableOpacity>
                            }

                        </View>
                }
            </View>
        </Modal>
    )
}

export default BookingConfirmationModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
    Container: {
        elevation: 20,
        shadowColor: COLOR.BLACK_60,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        padding: 30,
        maxWidth: width,
    },
    CloseButton: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        aspectRatio: 1 / 1,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        position: 'absolute',
        right: -15,
        top: -15,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.BLACK,
    },
    NoteContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    NoteText: {
        color: COLOR.BLACK_30,
        fontSize: 10,
    }
})