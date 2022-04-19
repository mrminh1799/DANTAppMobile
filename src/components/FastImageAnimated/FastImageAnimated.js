import React, {useRef, useState } from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Skeleton} from 'native-base';
import PropTypes from 'prop-types';
import FastImage from "react-native-fast-image";

const FastImageAnimated = ({thumb, style, dadStyle}) => {
    const [isLoading, setLoading] = useState(false)

    const fadeAnim = useRef(new Animated.Value(0)).current;

    return (
        <>
            <Animated.View style={[{
                flexGrow: 1,
            }, {opacity: fadeAnim}, dadStyle]}>
                <FastImage
                    style={[{
                        zIndex: 999,
                        flexGrow: 1,
                        borderRadius: 8
                    }, style]}
                    onLoad={()=>{
                        setLoading(true)
                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 1000
                        }).start();
                    }}
                    source={{uri: thumb, priority: FastImage.priority.high}}/>
            </Animated.View>
            {
                !isLoading && (
                    <Skeleton style={[StyleSheet.absoluteFill]} flex={1} h={'100%'} rounded={8}/>
                )
            }
        </>
    );
};

FastImageAnimated.propTypes = {
    thumb: PropTypes.any
};

FastImageAnimated.defaultProps = {
    tree: false
}
export default FastImageAnimated;
