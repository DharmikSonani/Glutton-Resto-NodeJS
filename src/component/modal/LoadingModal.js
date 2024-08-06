import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const LoadingModal = ({
    visible,
    setVisibility,
}) => {
    return (
        <Modal
            animationType='fade'
            transparent
            visible={visible}
            statusBarTranslucent
        // onRequestClose={() => { setVisibility(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={styles.Container}>
                    <ActivityIndicator color={COLOR.BLACK} size='small' />
                </View>
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
    Container: {
        alignItems: "center",
        borderRadius: 10,
        padding: 20,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
})