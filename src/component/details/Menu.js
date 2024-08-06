import { StyleSheet, Text, View, Animated, } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import MenuCard from '../MenuCard';
import { COLOR } from '../../constants/Colors';
import { headerStyle } from '../../constants/Styles';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { getMenuByRestIDAPI } from '../../api/utils';

const Menu = ({ restId, height, width, }) => {

    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const AnimatedValue = useRef(new Animated.Value(0)).current;
    const reactiveAnimated = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {
        try {
            const res = await getMenuByRestIDAPI(restId);
            res?.data && setData(res?.data?.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const handleAnimation = () => {
            Animated.timing(AnimatedValue, {
                toValue: reactiveAnimated,
                duration: 350,
                useNativeDriver: true,
            }).start();
        };

        requestAnimationFrame(handleAnimation);
    }, [activeIndex])

    const setActiveSlide = (newIndex) => {
        if (newIndex == data.length) {
            setActiveIndex(0);
            reactiveAnimated.setValue(0);
        } else {
            setActiveIndex(newIndex);
            reactiveAnimated.setValue(newIndex);
        }
    }

    const flingUp = Gesture
        .Fling()
        .direction(Directions.UP)
        .onStart(() => {
            if (activeIndex > 0) {
                setActiveSlide(activeIndex - 1);
            }
        });

    const flingDown = Gesture
        .Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
            if (activeIndex < data.length) {
                setActiveSlide(activeIndex + 1);
            }
        });

    return (
        (data && data.length > 0) ?
            <GestureHandlerRootView style={{ width: width, height: height, }}>
                <GestureDetector gesture={Gesture.Simultaneous(flingUp, flingDown)}>
                    <View style={[styles.Container]}>
                        {
                            data.map((item, index) => {
                                const inputRange = [index - 1, index, index + 1];
                                return (
                                    <MenuCard
                                        key={index}
                                        data={item}
                                        zIndex={data.length - index}
                                        AnimatedValue={AnimatedValue}
                                        inputRange={inputRange}
                                        height={height}
                                    />
                                )
                            })
                        }
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
            :
            <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', paddingBottom: headerStyle.height / 2, }}>
                <Text style={{ color: COLOR.BLACK_30 }}>Menu Not Found</Text>
            </View>

    )
}

export default Menu

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})