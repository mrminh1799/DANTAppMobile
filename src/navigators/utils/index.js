import React from 'react'
import throttle from 'lodash.throttle'
import {CommonActions, useNavigation} from "@react-navigation/core";

/**
 * @author ANHVTN11
 * 01/11/2019
 * */

const navigateSafe = (navigate, time = 200) =>
    throttle(navigate, time, {trailing: false})

export const navigatorRef = React.createRef()

export const drawerRef = React.createRef();

export const tabBarRef = React.createRef();

export function goBack() {
    navigatorRef?.current?.goBack();
}

export function navigate(routeName, params) {
    navigatorRef?.current?.navigate(routeName, params)
}

export default function useResetProfileStackNavigator() {
    const navigation = useNavigation();

    return () => {
        const bottomTabNavigator = navigation
            .getState()
            ?.routes?.find(({ name }) => name === "Home");

        const profileTab = bottomTabNavigator?.state?.routes?.find(
            ({ name }) => name === "HomeStack"
        );

        const { key: target, routes } = profileTab?.state ?? {};

        if (!target || routes?.length <= 1) return;

        routes.length = 1; // popToTop()

        navigation.dispatch({
            ...CommonActions.reset({ routes }),
            target,
        });
    };
}

export function push(routeName, params) {
    navigatorRef?.current?.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                {name: 'Home'},
                {
                    name: routeName,
                    params: params,
                },
            ],
        })
    );
}

export const getCurrentRoute = () => {
    return navigatorRef?.current?.getCurrentRoute()
}

export const registerScreen = (name, Comp, options, initialParams = {}) => {
    return {
        screen: {
            name,
            component: Comp,
            options,
            initialParams,
        },
        present: (navigation, params) => {
            navigateSafe(navigation.navigate({name, params: params}))
        },
    }
}
