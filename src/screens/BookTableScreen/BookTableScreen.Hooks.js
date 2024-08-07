import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import moment from 'moment';
import { format } from 'date-fns';
import { useState } from 'react';
import { NormalSnackBar } from '../../constants/SnackBars';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = props.route.params.restId;
    const tables = props.route.params.tables;
    const restName = props.route.params.restName;
    const endDate = props.route.params.endDate;
    const openTime = moment(props.route.params.openTime, ['hh:mm A']).format('HH:mm');
    const closeTime = moment(props.route.params.closeTime, ['hh:mm A']).format('HH:mm');
    const uid = useSelector(state => state[Reducers.AuthReducer]);
    const userData = useSelector(state => state[Reducers.UserDataReducer]);

    // UseStates
    const [noGuest, setNoGuest] = useState(1);
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd').toString());
    const [time, setTime] = useState('');
    const [confirmModalVisible, setConfirmModalVisibility] = useState(false);

    // UseEffects

    // Methods
    const onBookTablePress = () => {
        if (!date) {
            NormalSnackBar('Select Date.');
            return;
        }
        if (!time) {
            NormalSnackBar('Select Time.');
            return;
        }
        setConfirmModalVisibility(true);
    }

    const onSuccess = () => {
        setNoGuest(1);
        setTime('');
    }

    return {
        navigation,
        restId,
        restName,
        endDate,
        openTime,
        closeTime,
        uid,
        userData,
        tables,

        noGuest, setNoGuest,
        date, setDate,
        time, setTime,
        confirmModalVisible, setConfirmModalVisibility,

        onBookTablePress,
        onSuccess,
    };
}

export default useScreenHooks