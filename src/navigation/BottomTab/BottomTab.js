import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './TabBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationScreens } from '../../constants/Strings';
import { COLOR } from '../../constants/Colors';
import { Keyboard } from 'react-native';
import BookingsScreen from '../../screens/BookingsScreen/BookingsScreen';
import FavouriteRestaurantsScreen from '../../screens/FavouriteRestaurantsScreen/FavouriteRestaurantsScreen';
import SettingsScreen from '../../screens/SettingsScreen/SettingsScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';

const Tab = createBottomTabNavigator();

const Screens = [
    {
        name: NavigationScreens.HomeScreen,
        component: HomeScreen,
        icon: Fontisto,
        iconname: "map",
        bg: 'rgba(33,150,246,1)',
        scale: 1,
    },
    {
        name: NavigationScreens.BookingsScreen,
        component: BookingsScreen,
        icon: MaterialCommunityIcons,
        iconname: "table-chair",
        bg: 'rgba(254,161,22,1)',
        scale: 1.2,
    },
    {
        name: NavigationScreens.FavouriteRestaurantsScreen,
        component: FavouriteRestaurantsScreen,
        icon: Icon,
        iconname: "heart-outline",
        bg: 'rgba(243,67,52,1)',
        scale: 1.2,
    },
    {
        name: NavigationScreens.SettingsScreen,
        component: SettingsScreen,
        icon: Icon,
        iconname: "settings-outline",
        bg: 'rgba(179,68,233,1)',
        scale: 1.2,
    },
]

const BottomTab = () => {

    const [isTabBarVisible, setIsTabBarVisible] = useState(true);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setIsTabBarVisible(false);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setIsTabBarVisible(true);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarBackground: COLOR.TRANSPARANT,
            }}
            tabBar={(props) => (isTabBarVisible && <TabBar {...props} />)}
        >
            {
                Screens.map((Screen, i) =>
                    <Tab.Screen
                        key={i}
                        name={Screen.name}
                        component={Screen.component}
                        options={{
                            params: {
                                Icon: Screen.icon,
                                name: Screen.iconname,
                                bg: Screen.bg,
                                scale: Screen.scale,
                            }
                        }}
                    />
                )
            }
        </Tab.Navigator>
    )
}

export default BottomTab
