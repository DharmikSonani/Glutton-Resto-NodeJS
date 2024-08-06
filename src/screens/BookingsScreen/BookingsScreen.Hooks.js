import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { BookingsDBFields, BookingsDBPath } from '../../constants/Database';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const uid = useSelector(state => state[Reducers.AuthReducer]);
    const currentDate = format(new Date(), 'yyyy-MM-dd').toString();
    const bottomTabHeight = useSelector(state => state[Reducers.BottomTabHeightReducer]);

    // UseStates
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        getBookingsDate();
    }, [])

    // Methods
    const getBookingsDate = async () => {
        setLoading(true);
        try {
            BookingsDBPath
                .where(BookingsDBFields.custId, '==', uid)
                .orderBy(BookingsDBFields.date, 'desc')
                .onSnapshot((querySnap) => {
                    let list = [];
                    querySnap.docs.map((doc, i) => {
                        const { date, } = doc.data();
                        if (!list.some(o => o.date === date)) {
                            if (currentDate == date) {
                                list.unshift({ i, date });
                            } else {
                                list.push({ i, date });
                            }
                        }
                    })
                    setDates(list);
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    return {
        navigation,
        uid,
        currentDate,
        bottomTabHeight,

        dates,
        loading,
    };
}

export default useScreenHooks