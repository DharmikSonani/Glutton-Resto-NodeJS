import {
    View,
    StatusBar,
    Platform
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './SplashScreen.Hooks';
import { SplashScreenIntroVideo } from '../../constants/Assets';
import Video from 'react-native-video'
import { styles } from './styles';

const SplashScreen = (props) => {

    const { } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                backgroundColor={COLOR.TRANSPARANT}
                translucent={true}
                barStyle={'dark-content'}
                hidden={Platform.OS == 'ios'}
            />
            <Video
                style={styles.Container}
                source={SplashScreenIntroVideo}
                resizeMode='contain'
                muted
                shutterColor={COLOR.PRIMARYCOLOR}
            />
        </View>
    )
}

export default SplashScreen