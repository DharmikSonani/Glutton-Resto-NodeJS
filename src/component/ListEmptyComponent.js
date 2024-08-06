import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Reducers } from '../constants/Strings';
import { COLOR } from '../constants/Colors';
import { headerStyle } from '../constants/Styles';

const screen_height = Dimensions.get('screen').height;

const ListEmptyComponent = ({
    text,
    children,
}) => {
    const bottomTabHeight = useSelector(state => state[Reducers.BottomTabHeightReducer]);

    return (
        <View style={[styles.Container, {
            height: screen_height - bottomTabHeight - headerStyle.height - 50,
        }]}>
            {
                children ?
                    children
                    :
                    <Text style={styles.TextStyle}>
                        {text}
                    </Text>
            }
        </View>
    )
}

export default ListEmptyComponent

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontSize: 15,
        color: COLOR.BLACK_60,
    }
})