import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, } from '../../constants/Colors';
import QRCode from 'react-native-qrcode-svg';
import FieldValuePairLabel from '../FieldValuePairLabel';
import DataDisplayCard from '../DataDisplayCard';
import moment from 'moment';
import { format } from 'date-fns';

const width = Dimensions.get('window').width * 0.65;

const QRCodeModal = ({
    data,
    modalVisible,
    setModalVisible,
}) => {

    const docId = data?._id;

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible({}) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={styles.Container}>

                    <DataDisplayCard
                        title={data?.restaurant?.name}
                        style={{ maxWidth: width + 30 }}
                    >

                        <FieldValuePairLabel
                            field={'Booking ID'}
                            value={docId}
                        />

                        <FieldValuePairLabel
                            field={'Book By'}
                            value={data?.customer?.name}
                        />

                        <FieldValuePairLabel
                            field={'Contact No.'}
                            value={`+91 ${data?.customer?.contact}`}
                        />

                        <FieldValuePairLabel
                            field={'Email'}
                            value={data?.customer?.email}
                        />

                        <FieldValuePairLabel
                            field={'Guest'}
                            value={data?.booking?.noOfGuest}
                        />

                        <FieldValuePairLabel
                            field={'Date'}
                            value={data?.booking?.date && format(new Date(data?.booking?.date), 'MMMM d, yyyy')}
                        />

                        <FieldValuePairLabel
                            field={'Time'}
                            value={data?.booking?.time && moment(data?.booking?.time, ['hh:mm']).format('hh:mm A')}
                            style={{ marginBottom: 0 }}
                        />

                    </DataDisplayCard>

                    <View style={styles.QRCodeContainer}>
                        <QRCode
                            value={docId}
                            size={width}
                        />
                    </View>

                    <Text style={styles.TextStyle} numberOfLines={1}>Scan above QR Code for verifying your booking.</Text>

                    <TouchableOpacity
                        style={styles.CloseButton}
                        onPress={() => { setModalVisible({}) }}
                        activeOpacity={1}
                    >
                        <Ionicons name='close' size={20} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default QRCodeModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
    Container: {
        alignItems: "center",
        justifyContent: "center",
        elevation: 20,
        shadowColor: COLOR.BLACK_60,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        padding: 30,
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
    QRCodeContainer: {
        padding: 15,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        marginTop: 10,
        marginBottom: 15,
    },
    TextStyle: {
        color: COLOR.BLACK_60,
        fontSize: 11,
        textAlign: 'center',
    },
})