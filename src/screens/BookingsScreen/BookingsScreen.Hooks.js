import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { getBookingsByUidAPI } from '../../api/utils';
import socketServices from '../../api/Socket';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const uid = useSelector(state => state[Reducers.AuthReducer]);
    const bottomTabHeight = useSelector(state => state[Reducers.BottomTabHeightReducer]);

    // UseStates
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        setLoading(true);
        getBookingsData();
        socketServices.on('NewBookingForCutomer', getBookingsData);
        socketServices.on('CancelBookingForCutomer', getBookingsData);

        return () => {
            socketServices.removeListener('NewBookingForCutomer');
            socketServices.removeListener('CancelBookingForCutomer');
        }
    }, [])

    // Methods
    const getBookingsData = async () => {
        try {
            const res = await getBookingsByUidAPI(uid);
            res?.data && setData(res?.data?.data);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    return {
        navigation,
        bottomTabHeight,

        data,
        loading,
    };
}

export default useScreenHooks