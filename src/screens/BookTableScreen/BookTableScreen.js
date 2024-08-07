import {
    View,
} from 'react-native'
import React from 'react'
import { GRADIENTCOLOR } from '../../constants/Colors';
import useScreenHooks from './BookTableScreen.Hooks';
import { styles } from './styles';
import ScreenHeader from '../../component/ScreenHeader';
import GuestController from '../../component/booking/GuestController';
import DateController from '../../component/booking/DateController';
import TimeController from '../../component/booking/TimeController';
import CustomButton from '../../component/button/CustomButton';
import BookingConfirmationModal from '../../component/modal/BookingConfirmationModal';

const BookTableScreen = (props) => {

    const {
        navigation,
        restId,
        restName,
        openTime,
        closeTime,
        endDate,
        userData,
        tables,

        noGuest, setNoGuest,
        date, setDate,
        time, setTime,
        confirmModalVisible, setConfirmModalVisibility,

        onBookTablePress,
        onSuccess,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={restName}
        >

            <View style={styles.Container}>

                <GuestController
                    min={1}
                    max={20}
                    value={noGuest}
                    onChange={setNoGuest}
                />

                <DateController
                    value={date}
                    onChange={setDate}
                    endDate={endDate}
                />

                <TimeController
                    restId={restId}
                    tables={tables}
                    time={time}
                    onSelectTime={setTime}
                    onDateChange={date}
                    openTime={openTime}
                    closeTime={closeTime}
                />

                <CustomButton
                    colors={GRADIENTCOLOR.ORANGE}
                    text={'Book Table'}
                    onPress={onBookTablePress}
                />
            </View>

            {
                confirmModalVisible &&
                <BookingConfirmationModal
                    userData={userData}
                    restId={restId}
                    restName={restName}
                    date={date}
                    time={time}
                    noGuest={noGuest}
                    modalVisible={confirmModalVisible}
                    setModalVisible={setConfirmModalVisibility}
                    onSuccess={onSuccess}
                />
            }
        </ScreenHeader>
    )
}

export default BookTableScreen