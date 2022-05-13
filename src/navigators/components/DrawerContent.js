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


const DrawerContent = ({navigation}) => {
    const {t, i18n} = useTranslation(['Settings'], {i18n});
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);//mục quản lý tài khoản
    const [openLanguage, setLanguage] = useState(false)//mục đổi ngôn ngữ
    const {userInfo, setUserInfo} = useAuth();


    const logOutApp = async () => {
        navigation.closeDrawer();
        await Keychain.resetGenericPassword()
        Storage.delete('userData')
        setUserInfo(null)
    }


    return (
        <Center flex={1} bg={'#222428'}>
            <ScrollView h='100%' w='88%' style={{marginTop: insets.top}} showsVerticalScrollIndicator={false}>
                <VStack py={'10px'}>
                    <TouchableOpacity onPress={() => setOpen(!open)}>
                        <HStack my={2} alignItems={'center'}>
                            <Center w={'25px'} h={'25px'}>
                                <IconQLTK/>
                            </Center>
                            <Text color={'white'} ml={'20px'} fontSize={14}>{t('AccountMng')}</Text>
                            <Icon as={open ? <AntDesign name="up"/> : <AntDesign name="down"/>} size={'4'}
                                  color={'white'}
                                  position={'absolute'} right={"0"}/>
                        </HStack>
                    </TouchableOpacity>

                    {open && <VStack py={'5px'}>
                        <TouchableOpacity>
                            <HStack my={2} pl={'15px'} alignItems={'center'}>
                                <Icon as={<AntDesign name="user"/>} size={'20px'} color={'white'}/>
                                <Text color={'white'} ml={'20px'} fontSize={14}>{t('MobileInfo')}</Text>
                            </HStack>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <HStack my={2} pl={'15px'} alignItems={'center'}>
                                <Icon as={<AntDesign name="user"/>} size={'20px'} color={'white'}/>
                                <Text color={'white'} ml={'20px'} fontSize={14}>{t('AccInfo')}</Text>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>}
                </VStack>
                <TouchableOpacity onPress={logOutApp}>
                    <HStack my={2} alignItems={'center'}>
                        <Center w={'25px'} h={'25px'}>
                            <IconLogout/>
                        </Center>
                        <Text color={'white'} ml={'20px'} fontSize={14}>{t('LogOut')}</Text>
                    </HStack>
                </TouchableOpacity>
                <Text color={'white'} mt={'25px'}
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
