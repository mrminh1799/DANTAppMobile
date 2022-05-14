import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View
} from 'react-native';
import {Input, ChevronDownIcon, Box, Icon} from 'native-base';
import { useController, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import Event from "../../utils/EventRegister";
import {Colors} from "@/styles/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

const SelectField = (props) => {
    const {
        width,
        label,
        style,
        name,
        defaultValue,
        rules,
        suffix,
        prefix,
        onChange,
        data,
        tree,
        multiple,
        disable,
        required,
        search,
        isObject = true,
        InputRightElement,
        ...restOfProps
    } = props;
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef(null);

    const focusAnim = useRef(new Animated.Value(0)).current;

    const formContext = useFormContext();

    const {control, errors} = formContext;

    const {field} = useController({name, rules, defaultValue, control});

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!field.value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }, [focusAnim, isFocused, field.value]);


    const _openSelect = () => {
        Event.emitEvent("modalOpen", {
            visible: true,
            data: data,
            onChange: onChange ? onChange : field.onChange,
            value: field.value,
            search: search ? search : true,
            isObject: isObject
        })
    };

    return (
        <TouchableWithoutFeedback onPress={disable ? () => {
        } : _openSelect}>
            <View
                borderWidth={1}
                style={[{
                    flexGrow: 1,
                    borderRadius: 4,
                    borderColor: Colors.dark.lightShade
                }, style]}
            >
                {
                    !disable ?
                        <Input
                            width={width}
                            borderWidth={0}
                            textAlignVertical={'bottom'}
                            editable={false}
                            pointerEvents="none"
                            color={'black'}
                            py={0}
                            fontSize={14}
                            lineHeight={22}
                            minH={12}
                            ref={inputRef}
                            {...restOfProps}
                            onChangeText={field.onChange}
                            value={field?.value[data?.labelKey]}
                            onBlur={(event) => {
                                setIsFocused(false);
                                field.onBlur?.(event);
                            }}
                            InputRightElement={
                                <ChevronDownIcon alignSelf={'center'} mr={1}
                                                 color={Colors.dark.greyTint} {...restOfProps} size="6"/>
                            }
                        />
                        :
                        <Box backgroundColor={'#f5f5f5'} rounded={4} opacity={0.8} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} p={'12px'}>
                            <Text
                                style={{borderRadius: 4, lineHeight: 19, marginRight: 22,width:'80%'}}>
                                {field?.value[data?.labelKey]}
                            </Text>
                            {!!InputRightElement && InputRightElement}
                        </Box>
                }
                <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.labelContainer,
                            {
                                transform: [
                                    {
                                        scale: focusAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.75],
                                        }),
                                    },
                                    {
                                        translateY: focusAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [10, -3],
                                        }),
                                    },
                                    {
                                        translateX: focusAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [14, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.label,
                                {...restOfProps}
                            ]}
                        >
                            {label}
                            {required && (<Text style={{color: 'red'}}>*</Text>)}
                        </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    label: {
        marginTop: 5,
        color: 'black',
        fontSize: 14,
        lineHeight: 18,
    },
    error: {
        fontSize: 12,
        color: '#B00020',
    },
});
SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.object.isRequired,
    rules: PropTypes.object,
    data: PropTypes.object,
    suffix: PropTypes.any,
    prefix: PropTypes.any,
    onChange: PropTypes.func

};

SelectField.defaultProps = {
    tree: false
}
export default SelectField;
