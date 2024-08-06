import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SplashNavigation } from './src/navigation/NavigationHandler'
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from './src/constants/Strings';
import { setUserDataInRedux } from './src/redux/UserData/UserDataAction';
import { getCustomerByUidAPI } from './src/api/utils';
import { setFavouriteRestaurantsInRedux } from './src/redux/FavouriteRestaurants/FavouriteRestaurantsAction';
import { CustomerDBFields } from './src/constants/Database';

const App = () => {

  const dispatch = useDispatch();
  const authId = useSelector(state => state[Reducers.AuthReducer]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '910507929298-vvkde5e56a8ljlcnr7j8dvdhrsm4q2ff.apps.googleusercontent.com',
    });
  }, [])

  useEffect(() => {
    authId && fetchUserData(authId);
  }, [authId])

  const fetchUserData = async (authId) => {
    try {
      const res = await getCustomerByUidAPI(authId);
      res?.data && dispatch(setUserDataInRedux(res.data?.data));
      res?.data && dispatch(setFavouriteRestaurantsInRedux(res.data?.data[CustomerDBFields.favourites]));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <NavigationContainer>
      <SplashNavigation />
    </NavigationContainer>
  )
}

export default App
