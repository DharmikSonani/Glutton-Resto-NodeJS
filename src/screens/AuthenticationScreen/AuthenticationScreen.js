import {
    Animated,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import useScreenHooks from './AuthenticationScreen.Hooks';
import { COLOR } from '../../constants/Colors';
import { styles } from './styles';
import { GoogleIcon, SignupBackgroundImage } from '../../constants/Assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Circle, ClipPath, Image, Svg } from 'react-native-svg';
import LoginScreen from './AuthScreens/LoginScreen';
import SignupScreen from './AuthScreens/SignupScreen';
import PhoneAuthScreen from './AuthScreens/PhoneAuthScreen';
import AuthButton from '../../component/button/AuthButton';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LoadingModal from '../../component/modal/LoadingModal';

const AuthenticationScreen = (props) => {

    const {
        navigation,
        animation,
        animationDuration,
        width, height,

        translateY, setTranslateY,
        activeView, setActiveView,
        loading, setLoading,

        onAnimate,
        onGooglePress,
        onSuccess,

    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                hidden={Platform.OS == 'ios'}
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <Animated.View
                style={[styles.BackgroundContainer, {
                    transform: [{
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, -translateY]
                        })
                    }]
                }]}
            >
                <Svg height={height} width={width}>
                    <ClipPath id='clip'>
                        <Circle r={height} cx={width / 2} />
                    </ClipPath>
                    <Image
                        height={height}
                        width={width}
                        href={SignupBackgroundImage}
                        preserveAspectRatio='xMidYMid slice'
                        clipPath='url(#clip)'
                    />
                </Svg>

                <Animated.View
                    style={[styles.CloseButtonContainer, {
                        opacity: animation.interpolate({
                            inputRange: [0.5, 0.75, 1],
                            outputRange: [0, 0, 1]
                        }),
                    }]}
                >
                    <TouchableOpacity
                        style={[styles.CloseButton, {
                            transform: [
                                {
                                    rotate: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['90deg', '0deg']
                                    })
                                },
                            ],
                        }]}
                        onPress={() => onAnimate(0, true)}
                    >
                        <Ionicons name='close' size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            <Animated.View
                style={[styles.BottomContentContainer, {
                    opacity: animation.interpolate({
                        inputRange: [0, 0.5],
                        outputRange: [1, 0]
                    }),
                    transform: [{
                        translateY: animation.interpolate({
                            inputRange: [0, 0.9, 1],
                            outputRange: [0, 100, 1000]
                        })
                    }],
                }]}
            >
                <AuthButton
                    text={'Continue with Google'}
                    onPress={onGooglePress}
                    icon={<FastImage source={GoogleIcon} style={{ height: '100%', aspectRatio: 1 / 1, }} resizeMode='contain' />}
                />

                <AuthButton
                    text={'Continue with Phone'}
                    onPress={() => setActiveView(1)}
                    icon={<FontAwesome color={COLOR.BLACK} name='phone' size={25} style={{ top: 1 }} />}
                    style={{ marginBottom: 0 }}
                />

                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: COLOR.WHITE,
                    marginVertical: 20,
                    borderRadius: 20,
                }} />

                <AuthButton
                    text={'Sign in with Email'}
                    onPress={() => setActiveView(2)}
                    icon={<Fontisto color={COLOR.BLACK} name='email' size={25} />}
                />

                <TouchableOpacity
                    style={styles.RegisterButton}
                    onPress={() => setActiveView(3)}
                >
                    <Text style={styles.RegisterButtonText}>Register with Email</Text>
                </TouchableOpacity>
            </Animated.View>

            {
                activeView == 1 &&
                <PhoneAuthScreen
                    navigation={navigation}
                    onLayout={(e) => {
                        setTranslateY(e.nativeEvent.layout.height);
                        onAnimate(1);
                    }}
                    onScreenChange={(value) => onAnimate(value)}
                    duration={animationDuration}
                    setLoading={setLoading}
                    onSuccess={onSuccess}
                />
            }

            {
                activeView == 2 &&
                <LoginScreen
                    navigation={navigation}
                    onLayout={(e) => {
                        setTranslateY(e.nativeEvent.layout.height);
                        onAnimate(1);
                    }}
                    onScreenChange={(value) => onAnimate(value)}
                    duration={animationDuration}
                    setLoading={setLoading}
                    onSuccess={onSuccess}
                />
            }

            {
                activeView == 3 &&
                <SignupScreen
                    navigation={navigation}
                    onLayout={(e) => {
                        setTranslateY(e.nativeEvent.layout.height);
                        onAnimate(1);
                    }}
                    setLoading={setLoading}
                    onSuccess={onSuccess}
                    duration={animationDuration}
                    onScreenChange={(value) => onAnimate(value)}
                />
            }

            <LoadingModal visible={loading} />

        </View >
    )
}

export default AuthenticationScreen