import { useEffect, useState } from 'react';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { getInvoiceListAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const uid = useSelector(state => state[Reducers.AuthReducer]);

    // UseStates
    const [invoices, setInvocies] = useState([]);
    const [loading, setLoading] = useState(true);

    // UseEffects
    useEffect(() => {
        fetchInvoices();
    }, []);

    // Methods
    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const res = await getInvoiceListAPI(uid);
            if (res && res.data && res?.data?.data) {
                setInvocies(res?.data?.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const onNextPress = (data) => {
        navigation.navigate(NavigationScreens.InvoiceScreen, { data: data });
    }

    return {
        navigation,

        invoices, setInvocies,
        loading, setLoading,

        onNextPress,
    };
}

export default useScreenHooks