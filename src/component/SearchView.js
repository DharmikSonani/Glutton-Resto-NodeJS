import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR } from '../constants/Colors';

const Container = ({
    search,
    setSearch,
    onClear,
}) => {
    return (
        <View style={styles.Container}>

            <FontAwesome name='search' size={20} color={COLOR.BLACK_30} />

            <TextInput
                placeholder='Search'
                style={styles.Search}
                value={search}
                placeholderTextColor={COLOR.BLACK_60}
                onChangeText={setSearch}
            />

            {
                search &&
                <TouchableOpacity
                    style={{ padding: 15, }}
                    onPress={onClear}
                >
                    <Entypo name='cross' size={20} color={COLOR.BLACK} />
                </TouchableOpacity>
            }

        </View>
    )
}

export default Container

const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        flex: 1,
        height: 50,
        alignItems: 'center',
        borderRadius: 15,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        paddingLeft: 15,
        flexDirection: 'row',
    },
    Search: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        color: COLOR.BLACK,
    },
})