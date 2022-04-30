import React from 'react';
import {Box, HStack} from "native-base";
import {TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {navigate} from "@/navigators/utils";
import {useAuth} from "@/contexts";
import SocialNetwork from "@/screens/Home/ItemAfterLogin/SocialNetwork";
import Guest from "@/screens/Home/ItemAfterLogin/Guest";
import PropTypes from "prop-types";

import IconBell from "../../../assets/icons/iconSVG/bell.svg"
import IconMenu from "../../../assets/icons/iconSVG/menu.svg"

const ItemAfterLogin = ({currentPackage, getUserInfor, getSubscriberAccount, openDrawer}) => {
    const {userInfo} = useAuth();
    const {t, i18n} = useTranslation(['HomePage', ['ServicePage'], 'Common', 'TopUp'], {i18n});


    const toNewsItel = () => {
        navigate('NewsItel')
    }
    const toNotification = () => {
        navigate('Notification')
    }

    return (
        <Box>
            <HStack justifyContent={'space-between'} mx={17}>
                <Box>
                    <TouchableOpacity onPress={toNotification}
                                      style={{padding: 5, borderRadius: 100}}>
                        <IconBell/>
                    </TouchableOpacity>
                </Box>
                <Box>
                    <TouchableOpacity onPress={openDrawer}
                                      style={{padding: 5, borderRadius: 100}}>
                        <IconMenu/>
                    </TouchableOpacity>
                </Box>
            </HStack>
            {
                (userInfo) ?
                    <SocialNetwork/> : <Guest/>
            }
        </Box>

    )
}
ItemAfterLogin.PropTypes =
    {
        getUserInfor: PropTypes.object,
        getSubscriberAccount: PropTypes.object
    }
export default ItemAfterLogin
