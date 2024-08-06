import {
    View,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import useScreenHooks from './SettingsScreen.Hooks';
import { styles } from './styles';
import ScreenHeader from '../../component/ScreenHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import CustomButton from '../../component/button/CustomButton';

const SettingsScreen = (props) => {

    const {
        navigation,
        userData,
        bottomTabHeight,

        onEditProfilePress,
        onFavouriteRestaurantsPress,
        onBookingsPress,
        onInvoicesPress,
        onLogoutPress,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Settings'}
            isDashboard
        >
            <ScrollView
                style={styles.Container}
                contentContainerStyle={[styles.ContentContainer, { paddingBottom: bottomTabHeight + 15, }]}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.ProfileContainer}>

                    <View style={styles.ProfileImageContainer}>
                        <FastImage
                            source={{
                                uri: userData
                                    ? userData.userImg ||
                                    'https://firebasestorage.googleapis.com/v0/b/gluttonresto.appspot.com/o/user_profile.jpg?alt=media&token=66288953-06ba-4e3a-8546-1fd4114dfa13'
                                    : 'https://firebasestorage.googleapis.com/v0/b/gluttonresto.appspot.com/o/user_profile.jpg?alt=media&token=66288953-06ba-4e3a-8546-1fd4114dfa13'
                            }}
                            style={styles.ProfileImage}
                            resizeMode='cover'
                        />
                    </View>

                    <View style={styles.ProfileDetailContainer}>
                        <View style={{ flex: 1, }}>
                            <Text style={{
                                fontSize: 15,
                                color: '#000',
                            }} numberOfLines={1}>
                                {userData.userName == '' ? "Glutton User" : userData.userName}
                            </Text>

                            <Text style={styles.ProfileTextStyle} numberOfLines={1}>
                                {userData.email == '' ? "Email not found" : userData.email}
                            </Text>

                            <Text style={styles.ProfileTextStyle} numberOfLines={1}>
                                {userData.contactNo == '' ? "Contact not found" : "+91 " + userData.contactNo}
                            </Text>
                        </View>
                        <CustomButton
                            colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                            text={'Edit Profile'}
                            onPress={onEditProfilePress}
                            style={{ height: 35 }}
                            borderRadius={13}
                        />
                    </View>

                </View>

                <TouchableOpacity
                    onPress={onFavouriteRestaurantsPress}
                    style={styles.Button}
                >
                    <View style={styles.ButtonIconContainer}>
                        <Ionicons name='heart-outline' size={20} color={COLOR.BLACK} />
                    </View>
                    <Text style={styles.ButtonText}>Favourite Restaurants</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onBookingsPress}
                    style={styles.Button}
                >
                    <View style={styles.ButtonIconContainer}>
                        <MaterialCommunityIcons name='table-chair' size={18} color={COLOR.BLACK} />
                    </View>
                    <Text style={styles.ButtonText}>Bookings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onInvoicesPress}
                    style={styles.Button}
                >
                    <View style={styles.ButtonIconContainer}>
                        <FontAwesome5 name={'file-invoice'} size={20} color={COLOR.BLACK} />
                    </View>
                    <Text style={styles.ButtonText}>Invoices</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onLogoutPress}
                    style={styles.Button}
                >
                    <View style={styles.ButtonIconContainer}>
                        <MaterialIcons name={'logout'} size={20} color={COLOR.BLACK} />
                    </View>
                    <Text style={styles.ButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenHeader>
    )
}

export default SettingsScreen