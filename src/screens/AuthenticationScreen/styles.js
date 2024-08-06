import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: COLOR.WHITE
    },
    BackgroundContainer: {
        position: 'absolute',
        width: '100%',
        zIndex: 10,
    },
    CloseButtonContainer: {
        position: 'absolute',
        bottom: -20,
        alignSelf: 'center',
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        aspectRatio: 1 / 1,
        height: 40,
        elevation: 5,
        shadowOffset: { height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    CloseButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    BottomContentContainer: {
        position: 'absolute',
        width: '100%',
        zIndex: 100,
        padding: 40,
        paddingTop: 50,
        backgroundColor: COLOR.BLACK_60,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: COLOR.WHITE_50,
    },
    RegisterButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    RegisterButtonText: {
        color: COLOR.WHITE,
    },
})