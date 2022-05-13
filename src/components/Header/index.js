import React, {useState} from 'react';
import {HStack, Button, ChevronLeftIcon, Text, Box, useTheme} from 'native-base'
import PropsType from "prop-types";
// import trans from "translations/trans";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {goBack} from "@/navigators/utils";
import {useWindowDimensions, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {isIphoneX} from "@/utils/Other";

const HeaderComponent = ({check, title, defaultTitle, isBack = true, backPress, icon, optionRight, optionPress, ...props}) => {

    const {width} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const {t, i18n} = useTranslation(['HomePage'], {i18n});

    return (
        <HStack
            {...props}
            px={0}
            py={4}
            style={{paddingTop: isIphoneX() ? insets.top : 10}}
            w={'100%'}
            bg={check ? 'white' : 'redBase'}
            alignItems={'center'}
            justifyContent={'center'}
            shadow={6}
        >
            {
                isBack && <Box position={'absolute'} style={{top: isIphoneX() ? insets.top : 10}} left={'5px'}>
                    <TouchableOpacity onPress={() => {
                        backPress ? backPress() : goBack()
                    }} bg="transparent">
                        <ChevronLeftIcon color={check ? '#151522' : 'white'} size="8"/>
                    </TouchableOpacity>
                </Box>
            }
            <Box alignItems={'center'} flexDir={'row'} justifyContent={"center"}>
                {
                    !!icon &&
                    icon
                }
                <Text
                    ml={icon ? '5px' : 0}
                    textAlign={"center"}
                    fontSize={18}
                    color={check ? '#151522' : 'white'}
                    lineHeight={22} maxW={width * 0.7}
                    fontWeight={"700"}>
                    {title ? t(title) : defaultTitle}
                </Text>
            </Box>
            {
                optionRight && <Box position={'absolute'} style={{top: isIphoneX() ? insets.top : 10}} right={'5px'}>
                    <TouchableOpacity onPress={optionPress} bg="transparent">
                        {optionRight}
                    </TouchableOpacity>
                </Box>
            }
        </HStack>
    )
}

HeaderComponent.propTypes = {
    backPress: PropsType.func,
    title: PropsType.string.isRequired,
    isBack: PropsType.bool.isRequired,
    defaultTitle: PropsType.string,
    optionRight: PropsType.any,
    optionPress: PropsType.func
}

export default React.memo(HeaderComponent)
