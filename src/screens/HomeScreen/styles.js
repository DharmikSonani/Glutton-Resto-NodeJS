import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    MarkerWrap: {
        justifyContent: "flex-end",
        height: 45,
    },
    Marker: {
        width: 30,
        height: 30,
    },
    ScrollView: {
        position: "absolute",
        zIndex: 1000,
    },
    SearchContainer: {
        width: '100%',
        paddingHorizontal: 15,
        position: 'absolute',
        zIndex: 10,
        marginTop: 55,
        flexDirection: 'row',
    },
    LocationButton: {
        padding: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius: 15,
        marginLeft: 15,
        aspectRatio: 1 / 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SearchItems: {
        left: 15,
        right: 15,
        shadowColor: COLOR.BLACK,
        position: 'absolute',
        marginTop: 115,
        maxHeight: 200,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius: 15,
    },
    SearchItemsContentContainer: {
        padding: 10,
    },
    TextStyle: {
        color: COLOR.BLACK_30,
        fontSize: 13,

    }
})