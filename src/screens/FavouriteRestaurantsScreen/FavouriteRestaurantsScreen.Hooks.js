import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { getFavouriteRestaurantsAPI } from '../../api/utils';

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
    const fetchRestData = async (restList) => {
        if (restList.length > 0) {
            try {
                let params = {};
                params['restList'] = restList;
                const res = await getFavouriteRestaurantsAPI(params);
                res?.data && setRestList(res?.data?.data);
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