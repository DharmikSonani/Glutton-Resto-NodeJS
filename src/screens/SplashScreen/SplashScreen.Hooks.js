import { useDispatch } from 'react-redux';
import { NavigationScreens } from '../../constants/Strings';
import { getAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { useEffect } from 'react';
import { navigationToReplace } from '../../constants/NavigationController';
import { DomainPath } from '../../constants/Database';
import { setServerDomainInRedux } from '../../redux/ServerDomain/ServerDomainAction';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();

    // UseStates


    // UseEffects
    useEffect(() => {
        fetchDomain();
        getFromStorage();
    }, [])

    // Methods
    const getFromStorage = async () => {
        const authId = await getAuthID();
        authId && dispatch(setAuthIDInRedux(authId));
        setTimeout(() => {
            if (authId) {
                navigationToReplace(navigation, NavigationScreens.HomeTab);
            } else {
                navigationToReplace(navigation, NavigationScreens.AuthenticationScreen);
            }
        }, 2500);
    }

    const fetchDomain = async () => {
        try {
            DomainPath.onSnapshot((data) => {
                const { url } = data?.data();
                if (url != '' && url.includes('http')) {
                    dispatch(setServerDomainInRedux(url));
                } else {
                    dispatch(setServerDomainInRedux('https://glutton-server.vercel.app/'));
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return {};
}

export default useScreenHooks