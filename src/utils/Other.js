import {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, Easing, LayoutAnimation, Platform, StatusBar,} from 'react-native';

import moment from 'moment'
import Marker from 'react-native-image-marker'
import {COMMON} from "@/constants";
import {DialogBoxService} from "@/components";

const RNFS = require('react-native-fs');

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 780 || dimen.width === 780)
            || (dimen.height === 812 || dimen.width === 812)
            || (dimen.height === 844 || dimen.width === 844)
            || (dimen.height === 896 || dimen.width === 896)
            || (dimen.height === 926 || dimen.width === 926))
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}

export const getBase64Image = async (data, _callback) => {
    try {
        if (!data.uri) {
            return;
        }
        let day = new Date();
        if (data.timestamp) {
            day = moment.unix(Math.round(data.timestamp))
        }
        let dateImageString = moment(day).format(COMMON.DATE_FORMAT8);

        Marker.markText({
            src: data.uri,
            text: dateImageString,
            color: '#FF0000',
            fontName: 'Arial-BoldItalicMT',
            fontSize: 40,
            scale: 1,
            position: 'topLeft',
            quality: 100,
            saveFormat: 'jpg',
            x: 30,
            y: 30
        }).then(async (result) => {
            try {
                const base64 = await RNFS.readFile(result, 'base64');
                _callback(base64)
            } catch (e) {
                DialogBoxService.alert("Có lỗi xảy ra khi chụp ảnh")
            }
        }).catch((err) => {
            DialogBoxService.alert("Có lỗi xảy ra khi chụp ảnh")
        });
    } catch (e) {
        DialogBoxService.alert("Có lỗi xảy ra khi chụp ảnh")
    }
};

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


export function useAnimatedBottom(show) {
    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (show) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 100,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start()
        }
    }, [show])

    return animatedValue
}

export function useAnimatedHeightBottom(show, height) {
    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (show) {
            Animated.timing(animatedValue, {
                toValue: height,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start()
        }
    }, [show])

    return animatedValue
}

// three dot if width <414
export function threeDotString(width, string) {
    if (width < 414) {
        return `${string.substring(0, 7)}...`
    }
}

export default function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );

    return debouncedValue;
}

export const loadAnimated = (duration = 200) => {
    LayoutAnimation.configureNext(
        LayoutAnimation.create(
            duration,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity
        ));
}