import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    FavButton: {
        elevation: 0,
        shadowOpacity: 0,
        marginRight: 13,
    },
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingTop: 10,
    },
    ImageContainer: {
        width: '100%',
        aspectRatio: 1.75 / 1,
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
    },
    DetailsContainer: {
        padding: 15,
    },
    ButtonContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Button: {
        borderWidth: 1,
        height: 45, aspectRatio: 1 / 1,
        marginRight: 15,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLOR.GRAY,
    },
    ViewWrapper: {
        backgroundColor: COLOR.BLACK_10,
        flex: 1,
    }
})
