import React, {useState} from 'react';
//UI + Component
import {TouchableOpacity} from 'react-native';
import {Box, Center, HStack, Icon, ScrollView, Text, VStack} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DeviceInfo from "react-native-device-info";
//Utils
import {useTranslation} from "react-i18next";
import Keychain from "react-native-keychain";
import {useAuth} from "@/contexts";
import PropTypes from "prop-types";
import Storage from "@/utils/Storage";

import IconQLTK from "../../assets/icons/iconSVG/perm_identity_24px.svg"
import IconLogout from "../../assets/icons/iconSVG/logout.svg"
import {navigate} from "@/navigators/utils";
import Feather from "react-native-vector-icons/Feather";


const DrawerContent = ({navigation}) => {
    const {t, i18n} = useTranslation(['Settings'], {i18n});
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);//mục quản lý tài khoản
    const {userInfo, setUserInfo} = useAuth();


    const changePassword = () => {
        navigate('ConfirmPass')
    }

    const toChangeInfo = () => {
        navigate('ChangeInfo')
    }

    const logOutApp = async () => {
        navigation.closeDrawer();
        await Keychain.resetGenericPassword()
        Storage.delete('userData')
        setUserInfo(null)
    }
    const handleToOrder = (tab = 0) => {
        navigate('Order', {
            tab: tab
        })
    }


    return (
        <Center flex={1} bg={'#222428'}>
            <ScrollView h='100%' w='88%' style={{marginTop: insets.top}} showsVerticalScrollIndicator={false}>
                <VStack py={'10px'}>
                    <TouchableOpacity onPress={handleToOrder}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <Icon as={<Feather name={'clipboard'}/>} size={5} color={'white'}/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>Lịch sử mua hàng</Text>
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toChangeInfo}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <Icon as={<Feather name={'user'}/>} size={5} color={'white'}/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>Cập nhật thông tin</Text>
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changePassword}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <Icon as={<Feather name={'lock'}/>} size={5} color={'white'}/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>Đổi mật khẩu</Text>
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logOutApp}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <IconLogout/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>{t('LogOut')}</Text>
                        </HStack>
                    </TouchableOpacity>
                </VStack>
                <Text color={'white'} mt={'10px'}
                      fontSize={14}>{t('Version') + ":  " + DeviceInfo.getVersion()}</Text>
                <Box h={'20px'}/>
            </ScrollView>
        </Center>
    )
}
DrawerContent.propTypes = {
    navigation: PropTypes.func
}
export default DrawerContent
