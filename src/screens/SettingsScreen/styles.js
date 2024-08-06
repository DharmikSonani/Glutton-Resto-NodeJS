import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        padding: 15,
        paddingTop: 55,
    },
    ProfileContainer: {
        flexDirection: 'row',
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
    },
    ProfileImageContainer: {
        width: '40%',
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 100,
    },
    ProfileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    ProfileDetailContainer: {
        flex: 1,
        marginLeft: 15,
    },
    ProfileTextStyle: {
        fontSize: 12,
        color: COLOR.GRAY,
        marginTop: 5,
    },
    Button: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 15,
        flexDirection: 'row',
        height: 50,
    },
    ButtonIconContainer: {
        height: '100%',
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.BLACK,
        marginLeft: 10,
    },
})