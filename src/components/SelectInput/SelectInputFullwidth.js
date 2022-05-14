import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {Box, ChevronDownIcon, Pressable, Text} from 'native-base';
import {useController, useFormContext} from 'react-hook-form';
import PropTypes from 'prop-types';
import Event from "../../utils/EventRegister";
import {Colors} from "@/styles/Colors";

const SelectInputFull = (props) => {
    const {
        label,
        showLabel,
        style,
        name,
        defaultValue,
        rules,
        onChange,
        data,
        disable,
        search,
        onDisable,
        isObject = true,
        ...restOfProps
    } = props;

    const formContext = useFormContext();

    const {control} = formContext;

    const {field} = useController({name, rules, defaultValue, control});


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
        <TouchableWithoutFeedback
            onPress={disable ? (onDisable ? onDisable : () => {
            }) : _openSelect}>
            <View
                borderWidth={1}
                style={[{
                    borderRadius: 8,
                    borderColor: Colors.dark.lightShade
                }, style, disable && {
                    backgroundColor: Colors.light.mediumTint,
                    borderColor: Colors.dark.mediumTint
                }]}
            >
                <Box flex={1} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Text style={!!style?.width && {width: style?.width - 30}} noOfLines={1}
                          pl={'16px'} {...restOfProps}>{(showLabel && field.value) && `${label}: `}{!field.value ? label : (isObject ? field?.value[data?.labelKey] : field?.value)}</Text>
                    <ChevronDownIcon alignSelf={'center'} mr={1} color={Colors.dark.greyTint} {...restOfProps}
                                     size="6"/>
                </Box>
            </View>
        </TouchableWithoutFeedback>
    );
};
SelectInputFull.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.object.isRequired,
    data: PropTypes.object,
    onChange: PropTypes.func,
    showLabel: PropTypes.bool,
    isObject: PropTypes.bool,
    onDisable: PropTypes.func

};

SelectInputFull.defaultProps = {
    tree: false
}
export default SelectInputFull;
