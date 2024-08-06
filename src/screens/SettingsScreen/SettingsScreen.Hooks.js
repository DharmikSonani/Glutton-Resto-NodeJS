import { useDispatch, useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { removeAuthID } from '../../constants/AsyncStorage';
import { removeUserDataFromRedux } from '../../redux/UserData/UserDataAction';
import { removeFavouriteRestaurantsFromRedux } from '../../redux/FavouriteRestaurants/FavouriteRestaurantsAction';
import { removeAuthIDFromRedux } from '../../redux/Authentication/AuthAction';
import auth from '@react-native-firebase/auth';
import { navigationToReset } from '../../constants/NavigationController';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const bottomTabHeight = useSelector(state => state[Reducers.BottomTabHeightReducer]);
    const userData = useSelector(state => state[Reducers.UserDataReducer]);
    const dispatch = useDispatch();

    // UseStates


    // UseEffects


    // Methods
    const onEditProfilePress = () => navigation.navigate(NavigationScreens.EditProfileScreen);

    const onFavouriteRestaurantsPress = () => navigation.navigate(NavigationScreens.FavouriteRestaurantsScreen);

    const onBookingsPress = () => navigation.navigate(NavigationScreens.BookingsScreen);

    const onInvoicesPress = () => navigation.navigate(NavigationScreens.InvoicesScreen);

    const onLogoutPress = () => {
        Alert.alert(
            'Logout',
            'Are you sure, you want to logout?',
            [
                {
                    text: 'No', onPress: () => { }
                },
                {
                    text: 'Yes', onPress: () => {
                        auth().signOut().then(
                            removeAuthID(),
                            navigationToReset(navigation, NavigationScreens.AuthenticationScreen),
                            GoogleSignin.signOut(),
                            dispatch(removeUserDataFromRedux()),
                            dispatch(removeFavouriteRestaurantsFromRedux()),
                            dispatch(removeAuthIDFromRedux()),
                        )
                    }
                },
            ],
        )
    }

    return {
        navigation,
        userData,
        bottomTabHeight,

        onEditProfilePress,
        onFavouriteRestaurantsPress,
        onBookingsPress,
        onInvoicesPress,
        onLogoutPress,

    };
}

export default useScreenHooks