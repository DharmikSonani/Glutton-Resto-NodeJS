import { Dimensions, View, StyleSheet, } from 'react-native'
import React from 'react'
import TabButton from './TabButton';
import { headerBackgroundContainerStyle } from '../../constants/Styles';
import { useDispatch } from 'react-redux';
import { setBottomTabHeightInRedux } from '../../redux/BottomTabHeight/BottomTabHeightAction';

const ScreenWidth = Dimensions.get("window").width;

export const TabBar = (props) => {

    const TabButtonWidth = (ScreenWidth - 20) / props.state.routes.length;
    const dispatch = useDispatch();

    return (
        <View
            style={[styles.TabBarContainer, headerBackgroundContainerStyle]}
            onLayout={(layout) => dispatch(setBottomTabHeightInRedux(layout.nativeEvent.layout.height))}
        >
            {
                props.state.routes.map((route, i) => {

                    const { options } = props.descriptors[route.key];
                    const focused = props.state.index === i;

                    const onPress = () => {
                        const event = props.navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!focused && !event.defaultPrevented) {
                            props.navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TabButton
                            key={i}
                            Data={options?.params}
                            focused={focused}
                            onPress={onPress}
                            buttonSize={TabButtonWidth}
                        />
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    TabBarContainer: {
        width: ScreenWidth,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
})