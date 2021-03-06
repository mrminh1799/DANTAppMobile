import React, {useEffect, useState} from 'react'
import {navigate, registerScreen} from "@/navigators/utils";
import {Box, Icon, Pressable, Text} from "native-base";
import {DialogBoxService} from "@/components";
import Entypo from "react-native-vector-icons/Entypo";
import {Colors} from "@/styles/Colors";
import {
    Image,
    Linking,
    Platform,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {useAuth} from "@/contexts";
import {useDispatch, useSelector} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Storage from "@/utils/Storage";
import {getOrder} from "@/services/Order";

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

    const [order, setOrder] = useState({})

    const localOrder = useSelector(state => state.globalReducer.order)

    //refresh api when scroll down
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        if (localOrder) {
            let temp = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
            }
            localOrder.map(item => {
                temp?.[item?.status]?.push(item)
            })
            setOrder(temp)
        }
    }, [localOrder])

    useEffect(() => {
        if (userInfo) {
            let temp = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
            }
            dispatch(getOrder({
                id: userInfo.id
            }))
        }
    }, [userInfo, refreshing])

    //callback when reload success
    const onRefresh = React.useCallback(() => {
        dispatch(getOrder({
            id: userInfo.id
        }))
    }, []);

    const changePassword = () => {
        navigate('ConfirmPass')
    }

    const toChangeInfo = () => {
        navigate('ChangeInfo')
    }

    useEffect(() => {
        if (refreshing) setRefreshing(false)
    }, [refreshing])

    const handleCall = () => {
        let phoneNumber = '';
        return Linking.openURL(`telprompt:0877087087`);
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${'0877087087'}`;
        } else {
            phoneNumber = `tel:${'0877087087'}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                console.log(supported)
                if (!supported) {
                    DialogBoxService.alert('S??? ??i???n tho???i kh??ng kh??? d???ng vui l??ng th??? l???i')
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    }

    const handleToOrder = (tab = 0) => {
        navigate('Order', {
            tab: tab
        })
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
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Box mt={'10px'} bg={'white'}>
                    <Pressable onPress={handleToOrder} py={3} px={'10px'} flexDir={'row'} alignItems={'center'}
                               justifyContent={'space-between'}
                               borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'clipboard'}/>} size={5}/>
                            <Text fontSize={15} ml={'13px'}>????n Mua</Text>
                        </Box>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Text fontSize={13}>Xem l???ch s??? mua h??ng</Text>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                    </Pressable>
                    <Box flexDir={'row'} py={'18px'}>
                        <Pressable onPress={() => handleToOrder(0)} flex={1} alignItems={'center'}>
                            <Box>
                                {
                                    order?.[1]?.length > 0 &&
                                    <Box position={'absolute'} borderWidth={1} borderColor={'white'} zIndex={999}
                                         right={-10} top={-3} px={'6px'} rounded={'full'}
                                         bg={Colors.light.redBase}>
                                        <Text fontSize={13} color={'white'}>{order[1].length}</Text>
                                    </Box>
                                }
                                <Icon as={<MaterialIcons name={'support-agent'}/>}/>
                            </Box>
                            <Text fontSize={12} mt={2}>Ch??? x??c nh???n</Text>
                        </Pressable>
                        <Pressable onPress={() => handleToOrder(1)} flex={1} alignItems={'center'}>
                            <Box>
                                {
                                    order?.[2]?.length > 0 &&
                                    <Box position={'absolute'} borderWidth={1} borderColor={'white'} zIndex={999}
                                         right={-10} top={-3} px={'6px'} rounded={'full'}
                                         bg={Colors.light.redBase}>
                                        <Text fontSize={13} color={'white'}>{order[2].length}</Text>
                                    </Box>
                                }
                                <Icon as={<MaterialCommunityIcons name={'wallet-outline'}/>}/>
                            </Box>
                            <Text fontSize={12} mt={2}>???? x??? l??</Text>
                        </Pressable>
                        <Pressable onPress={() => handleToOrder(2)} flex={1} alignItems={'center'}>
                            <Box>
                                {
                                    order?.[3]?.length > 0 &&
                                    <Box position={'absolute'} borderWidth={1} borderColor={'white'} zIndex={999}
                                         right={-10} top={-3} px={'6px'} rounded={'full'}
                                         bg={Colors.light.redBase}>
                                        <Text fontSize={13} color={'white'}>{order[3].length}</Text>
                                    </Box>
                                }
                                <Icon as={<MaterialCommunityIcons name={'archive-check-outline'}/>}/>
                            </Box>
                            <Text fontSize={12} mt={2}>Ho??n th??nh</Text>
                        </Pressable>
                        <Pressable onPress={() => handleToOrder(4)} flex={1} alignItems={'center'}>
                            <Box>
                                {
                                    order?.[0]?.length > 0 &&
                                    <Box position={'absolute'} borderWidth={1} borderColor={'white'} zIndex={999}
                                         right={-10} top={-3} px={'6px'} rounded={'full'}
                                         bg={Colors.light.redBase}>
                                        <Text fontSize={13} color={'white'}>{order[0].length}</Text>
                                    </Box>
                                }
                                <Icon as={<MaterialCommunityIcons name={'archive-cancel-outline'}/>}/>
                            </Box>
                            <Text fontSize={12} mt={2}>Th???t b???i</Text>
                        </Pressable>
                    </Box>
                </Box>
                <Box mt={'10px'} bg={'white'}>
                    <Pressable onPress={toChangeInfo} py={3} px={'10px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}
                               borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'user'}/>} size={5}/>
                            <Text fontSize={15} ml={'13px'}>C???p nh???t th??ng tin</Text>
                        </Box>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                    </Pressable>
                    <Pressable onPress={changePassword} py={3} px={'10px'} flexDir={'row'} alignItems={'center'}
                               justifyContent={'space-between'} borderBottomWidth={1}
                               borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'lock'}/>} size={5}/>
                            <Text fontSize={15} ml={'13px'}>?????i m???t kh???u</Text>
                        </Box>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                    </Pressable>
                    <Pressable onPress={handleCall} py={3} px={'10px'} flexDir={'row'} alignItems={'center'}
                               justifyContent={'space-between'} borderBottomWidth={1}
                               borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'phone-call'}/>} size={5}/>
                            <Text fontSize={15} ml={'13px'}>Li??n h??? c???a h??ng</Text>
                        </Box>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                    </Pressable>
                    <Pressable onPress={logout} py={3} px={'10px'} flexDir={'row'} alignItems={'center'}
                               justifyContent={'space-between'} borderBottomWidth={1}
                               borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'log-out'}/>} size={5}/>
                            <Text fontSize={15} ml={'13px'}>????ng xu???t</Text>
                        </Box>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                    </Pressable>
                </Box>
            </ScrollView>
        </Box>
    )
}

export default registerScreen(Name, User, ScreenOptions);