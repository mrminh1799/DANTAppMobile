import React, {useState} from 'react';
//UI + Component
import {Center, Text, useTheme} from 'native-base';
import {Colors} from "@/styles/Colors";
//Utils
import {useTranslation} from "react-i18next";
import {registerScreen} from '@/navigators/utils';

const Name = 'Settings';
const ScreenOptions = {
    headerTitle: 'Settings',
    headerShown: false,
};
const dataArray = [
    {title: "First Element", content: "Lorem ipsum dolor sit amet"},
    {title: "Second Element", content: "Lorem ipsum dolor sit amet"},
    {title: "Third Element", content: "Lorem ipsum dolor sit amet"}
];
const Settings = () => {
    const {t, i18n} = useTranslation(['Settings'], {i18n});
    const {colors} = useTheme();
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        <Center flex={1} bg={Colors.light.lightBlue}>
            <Text>Không có gì đâu</Text>
        </Center>
    )
}
export default registerScreen(Name, Settings, ScreenOptions)
