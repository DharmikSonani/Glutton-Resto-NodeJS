import {
    FlatList
} from 'react-native'
import React from 'react'
import { styles } from './styles';
import useScreenHooks from './FavouriteRestaurantsScreen.Hooks';
import ScreenHeader from '../../component/ScreenHeader';
import ListEmptyComponent from '../../component/ListEmptyComponent';
import RestoCard from '../../component/RestoCard';

const FavouriteRestaurantsScreen = (props) => {

    const {
        navigation,
        bottomTabHeight,

        restList,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Favourite Restaurants'}
            isDashboard
        >
            <FlatList
                data={restList}
                renderItem={({ item }) => <RestoCard data={item} navigation={navigation} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                style={styles.Container}
                contentContainerStyle={[styles.ContentContainerStyle, { paddingBottom: bottomTabHeight + 5 }]}
                ListEmptyComponent={<ListEmptyComponent text={'No Favourite Restaurant.'} />}
            />
        </ScreenHeader>
    )
}

export default FavouriteRestaurantsScreen