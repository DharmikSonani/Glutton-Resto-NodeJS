import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { RestaurantDBFields, RestaurantDBPath } from '../../constants/Database';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const bottomTabHeight = useSelector(state => state[Reducers.BottomTabHeightReducer]);
    const favlist = useSelector(state => state[Reducers.FavouriteRestaurantsReducer]);

    // UseStates
    const [restList, setRestList] = useState([]);

    // UseEffects
    useEffect(() => {
        fetchRestData(favlist)
    }, [favlist])

    // Methods
    const fetchRestData = (restList) => {
        if (restList.length > 0) {
            try {
                RestaurantDBPath
                    .where(RestaurantDBFields.restId, 'in', restList)
                    .orderBy(RestaurantDBFields.rate, "desc")
                    .onSnapshot((querySnap) => {
                        const list = querySnap.docs.map(doc => doc.data())
                        setRestList(list);
                    })
            } catch (e) {
                console.log(e);
            }
        } else {
            setRestList([]);
        }
    }

    return {
        navigation,
        bottomTabHeight,

        restList,
    };
}

export default useScreenHooks