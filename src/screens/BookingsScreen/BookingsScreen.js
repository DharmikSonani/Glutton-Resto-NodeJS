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

        data,
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
                        data={data}
                        renderItem={({ item }) =>
                            <BookingList data={item} />
                        }
                        keyExtractor={item => item.date}
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