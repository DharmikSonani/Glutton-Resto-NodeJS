import { StyleSheet, Text, View, Animated, } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import MenuCard from '../MenuCard';
import { COLOR } from '../../constants/Colors';
import { headerStyle } from '../../constants/Styles';
import { CategoryDBFields, CategoryDBPath, RestaurantDBFields, RestaurantDBPath } from '../../constants/Database';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const Menu = ({ restId, height, width, }) => {

    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const AnimatedValue = useRef(new Animated.Value(0)).current;
    const reactiveAnimated = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = () => {
        try {
            RestaurantDBPath
                .doc(restId)
                .collection('Menu')
                .orderBy(RestaurantDBFields.Menu.category, "asc")
                .orderBy(RestaurantDBFields.Menu.itemName, "asc")
                .onSnapshot((querySnap) => {
                    let catList = [];
                    let catDataList = [];
                    querySnap.docs.map(async (doc) => {

                        catDataList.push(doc.data());

                        const { category } = doc.data();
                        !catList.some(o => o == category) && catList.push(category);
                    })
                    if (catList.length > 0) {
                        try {
                            CategoryDBPath
                                .where(CategoryDBFields.catName, 'in', catList)
                                .orderBy(CategoryDBFields.catName, 'asc')
                                .get()
                                .then((querySnap) => {
                                    const list = querySnap.docs.map((doc) => {
                                        return doc.data();
                                    })
                                    setCategories(list);
                                })
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    setData(catDataList);
                })
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
        if (newIndex == categories.length) {
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
            if (activeIndex < categories.length) {
                setActiveSlide(activeIndex + 1);
            }
        });

    return (
        categories.length > 0 ?
            <GestureHandlerRootView style={{ width: width, height: height, }}>
                <GestureDetector gesture={Gesture.Simultaneous(flingUp, flingDown)}>
                    <View style={[styles.Container]}>
                        {
                            categories.map((item, index) => {
                                const inputRange = [index - 1, index, index + 1];
                                return (
                                    <MenuCard
                                        key={index}
                                        data={item}
                                        itemList={data.filter((i) => i[RestaurantDBFields.Menu.category] == item[CategoryDBFields.catName])}
                                        zIndex={categories.length - index}
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
                <Text style={{ color: COLOR.BLACK_30 }}>Menu Items Not Found</Text>
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