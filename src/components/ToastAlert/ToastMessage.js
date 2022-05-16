import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native'
import {Pressable, Text} from 'native-base'
import Event from '../../utils/EventRegister'
import {Colors} from "@/styles/Colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const ToastMessage = () => {
    const insets = useSafeAreaInsets();
    const fadeAnim = useRef(new Animated.Value(0)).current
    const [state, setState] = useState('')
    let timeOut = null
    useEffect(() => {
        //Add event modal select
        Event.on("toastOpen", ({text}) => {
            setState(text)
            Animated.timing(fadeAnim, {
                toValue: 1,
                timing: 1000
            }).start()
            timeOut = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    timing: 1000
                }).start()
                clearTimeout(timeOut)
            }, 2000)
        })
        return () => {
            //remove event modal select
            Event.off("toastOpen")
        }
    }, [])

    const endAnimation = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            timing: 1000
        }).start()
    }

    const animatedStyle = {
        opacity: fadeAnim
    }

    return (
        <Pressable style={{bottom: insets.bottom + 10}} onPress={endAnimation}>
            <Animated.View style={[styles.animatedBox, animatedStyle]}>
                <Text style={styles.textStyle}>{state}</Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    animatedBox:
        {
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: 8,
            bottom: 20,
            paddingHorizontal: 18,
            paddingVertical: 8,
            alignSelf: 'center',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.15,
            shadowRadius: 5,
            elevation: 1,
            zIndex: 9999999999999,
        },
    textStyle:
        {
            color: 'black',
        },
});

export default ToastMessage
