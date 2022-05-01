import React from 'react';
import {Box, HStack, Icon} from "native-base";
import {TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import {navigate} from "@/navigators/utils";
import {useAuth} from "@/contexts";
import SocialNetwork from "@/screens/Home/ItemAfterLogin/SocialNetwork";
import Guest from "@/screens/Home/ItemAfterLogin/Guest";
import PropTypes from "prop-types";

import IconBell from "../../../assets/icons/iconSVG/bell.svg"
import IconMenu from "../../../assets/icons/iconSVG/menu.svg"
import {Colors} from "@/styles/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

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
        <Box bg={Colors.light.redBase}>
            <HStack justifyContent={'space-between'} mx={17}>
                <Box>
                    <TouchableOpacity onPress={openDrawer}
                                      style={{padding: 5, borderRadius: 100}}>
                        <IconMenu/>
                    </TouchableOpacity>
                </Box>
                <Box>
                    <TouchableOpacity onPress={toNotification}
                                      style={{padding: 5, borderRadius: 100}}>
                        <Icon as={<AntDesign name="shoppingcart"/>} size={'24px'} color={'white'}/>
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
