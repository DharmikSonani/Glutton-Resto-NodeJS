import {
    View,
    ActivityIndicator,
    FlatList,
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './InvoicesScreen.Hooks';
import { styles } from './styles';
import ScreenHeader from '../../component/ScreenHeader';
import ListEmptyComponent from '../../component/ListEmptyComponent';
import InvoiceCard from '../../component/InvoiceCard';

const InvoicesScreen = (props) => {

    const {
        navigation,

        invoices,
        loading,

        onNextPress,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Invoices'}
        >
            {
                loading ?
                    <View style={[styles.LoadingContainer]}>
                        <ActivityIndicator color={COLOR.BLACK} size='small' />
                    </View>
                    :
                    <FlatList
                        data={invoices}
                        renderItem={({ item }) => <InvoiceCard data={item} onPress={onNextPress} />}
                        keyExtractor={item => item.invoiceId}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={[styles.ContentContainerStyle]}
                        ListEmptyComponent={<ListEmptyComponent text={'Invoice not generated yet.'} />}
                    />
            }
        </ScreenHeader>
    )
}

export default InvoicesScreen