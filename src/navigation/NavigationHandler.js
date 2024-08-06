import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from '../screens/AuthenticationScreen/AuthenticationScreen';
import { NavigationScreens } from '../constants/Strings';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BottomTab from './BottomTab/BottomTab';
import InvoicesScreen from '../screens/InvoicesScreen/InvoicesScreen';
import InvoiceScreen from '../screens/InvoiceScreen/InvoiceScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import BookTableScreen from '../screens/BookTableScreen/BookTableScreen';
import RestarantDetailScreen from '../screens/RestarantDetailScreen/RestarantDetailScreen';

const Stack = createStackNavigator();

export const SplashNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationScreens.SplashScreen} component={SplashScreen} />
            <Stack.Screen name={NavigationScreens.AuthenticationScreen} component={AuthenticationScreen} />
            <Stack.Screen name={NavigationScreens.HomeTab} component={BottomTab} />
            <Stack.Screen name={NavigationScreens.EditProfileScreen} component={EditProfileScreen} />
            <Stack.Screen name={NavigationScreens.InvoicesScreen} component={InvoicesScreen} />
            <Stack.Screen name={NavigationScreens.InvoiceScreen} component={InvoiceScreen} />
            <Stack.Screen name={NavigationScreens.BookTableScreen} component={BookTableScreen} />
            <Stack.Screen name={NavigationScreens.RestaurantDetailScreen} component={RestarantDetailScreen} />
        </Stack.Navigator>
    )
}