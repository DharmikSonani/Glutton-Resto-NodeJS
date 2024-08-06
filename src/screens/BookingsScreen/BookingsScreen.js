import {
    View,
    ActivityIndicator,
    FlatList,
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './BookingsScreen.Hooks';
import ScreenHeader from '../../component/ScreenHeader';
import { styles } from './styles';
import BookingList from '../../component/BookingList';
import ListEmptyComponent from '../../component/ListEmptyComponent';

const BookingsScreen = (props) => {

    const {
        navigation,
        bottomTabHeight,
        currentDate,
        uid,

        dates,
        loading,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Bookings'}
            isDashboard
        >
            {
                loading ?
                    <View style={[styles.LoadingContainer, {
                        marginBottom: bottomTabHeight,
                    }]}>
                        <ActivityIndicator color={COLOR.BLACK} size='small' />
                    </View>
                    :
                    <FlatList
                        data={dates}
                        renderItem={({ item }) =>
                            <BookingList
                                date={item.date}
                                uid={uid}
                                currentDate={currentDate}
                                navigation={navigation}
                            />
                        }
                        keyExtractor={item => item.i}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={[styles.ContentContainerStyle, { paddingBottom: bottomTabHeight + 10 }]}
                        ListEmptyComponent={<ListEmptyComponent text={'No Bookings Yet'} />}
                    />
            }
        </ScreenHeader>
    )
}

export default BookingsScreen