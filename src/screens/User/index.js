import React, {useEffect} from 'react'
import {goBack, navigate, registerScreen} from "@/navigators/utils";
import {Box, Icon, Input, Pressable, ScrollView, Text} from "native-base";
import {DialogBoxService, Header} from "@/components";
import Entypo from "react-native-vector-icons/Entypo";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import {Image, Linking, Platform, StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {SwipeListView} from "react-native-swipe-list-view";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useAuth} from "@/contexts";
import {useDispatch} from "react-redux";
import {useCart} from "@/services/Cart";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Storage from "@/utils/Storage";

const Name = 'User'

const ScreenOptions = {
    headerTitle: 'User',
    headerShown: false,
};
const User = () => {

    const insets = useSafeAreaInsets();

    const {width, height} = useWindowDimensions()

    const {userInfo, setUserInfo} = useAuth()

    const dispatch = useDispatch()

    const changePassword = () => {
      navigate('ConfirmPass')
    }

    const handleCall = () => {
        let phoneNumber = null;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${'0877087087'}`;
        } else {
            phoneNumber = `tel:${'0877087087'}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    DialogBoxService.alert('Số điện thoại không khả dụng vui lòng thử lại')
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    }

    const logout = () => {
        Storage.delete('userData')
        setUserInfo(null)
    }

    return (
        <Box flex={1} bg={'#eeeeee'}>
            <Box style={{marginTop: insets.top}} position={'absolute'} zIndex={999} right={15}>
                <TouchableOpacity onPress={() => navigate('Cart')}>
                    <Icon as={<AntDesign name="shoppingcart"/>} size={'25px'} color={'white'}/>
                </TouchableOpacity>
            </Box>
            <LinearGradient useAngle={true} angle={120} style={{borderRadius: 0, width: width, height: 180}}
                            colors={['#bb4444', '#7a2828']}>
                <Box flex={1} justifyContent={'flex-end'} px={'20px'} py={'15px'}>
                    <Box flexDir={'row'}>
                        <Box>
                            <Image style={{width: 60, height: 60}} source={require('../../assets/icons/iconuser.png')}/>
                        </Box>
                        <Box flex={1} ml={'10px'} justifyContent={'space-around'}>
                            <Text fontWeight={'900'} fontSize={'16'} lineHeight={19}
                                  color='white'>{userInfo?.fullname}</Text>
                            <Text fontSize={'16'} lineHeight={19}
                                  color='white'>{userInfo?.username}</Text>
                            <Text fontSize={'16'} lineHeight={19}
                                  color='white'>{userInfo?.email}</Text>
                        </Box>
                    </Box>
                </Box>
            </LinearGradient>
            <Box mt={'10px'} bg={'white'}>
                <Pressable py={3} px={'10px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Feather name={'clipboard'}/>} size={5}/>
                        <Text fontSize={15} ml={'13px'}>Đơn Mua</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Text fontSize={13}>Xem lịch sử mua hàng</Text>
                        <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                              color={Colors.light.darkTint}/>
                    </Box>
                </Pressable>
                <Box flexDir={'row'} py={'18px'}>
                    <Box flex={1} alignItems={'center'}>
                        <Icon as={<MaterialIcons name={'support-agent'}/>}/>
                        <Text fontSize={12} mt={2}>Chờ xác nhận</Text>
                    </Box>
                    <Box flex={1} alignItems={'center'}>
                        <Icon as={<MaterialCommunityIcons name={'wallet-outline'}/>}/>
                        <Text fontSize={12} mt={2}>Đã xử lý</Text>
                    </Box>
                    <Box flex={1} alignItems={'center'}>
                        <Icon as={<MaterialCommunityIcons name={'archive-check-outline'}/>}/>
                        <Text fontSize={12} mt={2}>Hoàn thành</Text>
                    </Box>
                    <Box flex={1} alignItems={'center'}>
                        <Icon as={<MaterialCommunityIcons name={'archive-cancel-outline'}/>}/>
                        <Text fontSize={12} mt={2}>Thất bại</Text>
                    </Box>
                </Box>
            </Box>
            <Box mt={'10px'} bg={'white'}>
                <Pressable py={3} px={'10px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Feather name={'user'}/>} size={5}/>
                        <Text fontSize={15} ml={'13px'}>Cập nhật thông tin</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                              color={Colors.light.darkTint}/>
                    </Box>
                </Pressable>
                <Pressable onPress={changePassword} py={3} px={'10px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Feather name={'lock'}/>} size={5}/>
                        <Text fontSize={15} ml={'13px'}>Đổi mật khẩu</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                              color={Colors.light.darkTint}/>
                    </Box>
                </Pressable>
                <Pressable onPress={handleCall} py={3} px={'10px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Feather name={'phone-call'}/>} size={5}/>
                        <Text fontSize={15} ml={'13px'}>Liên hệ cửa hàng</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                              color={Colors.light.darkTint}/>
                    </Box>
                </Pressable>
                <Pressable onPress={logout} py={3} px={'10px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Feather name={'log-out'}/>} size={5}/>
                        <Text fontSize={15} ml={'13px'}>Đăng xuất</Text>
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'}>
                        <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                              color={Colors.light.darkTint}/>
                    </Box>
                </Pressable>
            </Box>
        </Box>
    )
}

export default registerScreen(Name, User, ScreenOptions);