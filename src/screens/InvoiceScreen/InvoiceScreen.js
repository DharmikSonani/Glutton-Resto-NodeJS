import {
    View,
    ActivityIndicator,
    ScrollView,
    Text,
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './InvoiceScreen.Hooks';
import ScreenHeader from '../../component/ScreenHeader';
import { styles } from './styles';
import Invoice from '../../component/Invoice/Invoice';

const InvoiceScreen = (props) => {

    const {
        navigation,
        invoiceId,
        data,

        details,
        items,
        total,
        loading,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Invoice'}
        >
            {
                loading ?
                    <View style={styles.Container}>
                        <ActivityIndicator color={COLOR.BLACK} />
                    </View>
                    :
                    details?.isComplete == 'true' ?
                        <ScrollView
                            contentContainerStyle={styles.ContentContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <Invoice
                                invoiceId={invoiceId}
                                details={details}
                                items={items}
                                restData={data}
                                total={total}
                            />
                        </ScrollView>
                        :
                        <View style={styles.Container}>
                            <Text style={styles.EmptyText}>Invoice Not Found.</Text>
                        </View>
            }
        </ScreenHeader>
    )
}

export default InvoiceScreen