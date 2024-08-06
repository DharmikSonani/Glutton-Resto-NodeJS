import { useEffect, useState } from 'react';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { InvoiceDBFields, InvoiceDBPath, RestaurantDBPath } from '../../constants/Database';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const uid = useSelector(state => state[Reducers.AuthReducer]);

    // UseStates
    const [invoices, setInvocies] = useState([]);
    const [loading, setLoading] = useState(true);

    // UseEffects
    useEffect(() => {
        fetchRestData();
    }, []);

    // Methods
    const fetchInvoices = async (restData) => {
        setLoading(true);
        try {
            InvoiceDBPath
                .where(InvoiceDBFields.isComplete, '==', 'true')
                .where(InvoiceDBFields.custId, '==', uid)
                .orderBy(InvoiceDBFields.generatedAt, 'desc')
                .onSnapshot((querySnap) => {
                    let list = [];
                    querySnap.docs.map((doc, i) => {
                        const docId = doc.id;
                        const { custName, time, date, discount, restId } = doc.data();
                        const rest = restData.filter((i) => i.restId.toLowerCase().includes(restId.toLowerCase()));
                        const restName = rest[0].restaurantName;
                        const restContact = rest[0].restContact;
                        const restEmail = rest[0].restEmail;
                        list.push({ custName, time, date, docId, discount, restId, restName, restContact, restEmail });
                    })
                    setInvocies(list);
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const fetchRestData = () => {
        try {
            RestaurantDBPath
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map(doc => {
                        const { restId, restaurantName, contactNo, email } = doc.data()
                        return ({ restId, restaurantName, restContact: contactNo, restEmail: email })
                    })
                    fetchInvoices(list);
                })
        } catch (e) {
            console.log(e);
        }
    }

    const onNextPress = (item) => {
        navigation.navigate(NavigationScreens.InvoiceScreen, { data: item });
    }

    return {
        navigation,

        invoices, setInvocies,
        loading, setLoading,

        onNextPress,
    };
}

export default useScreenHooks