import React, {useEffect} from 'react'
import {registerScreen} from "@/navigators/utils";
import {Box, Icon, Input, Pressable, Text} from "native-base";
import {Header} from "@/components";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import {StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";
import {SwipeListView} from "react-native-swipe-list-view";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useAuth} from "@/contexts";
import {useDispatch, useSelector} from "react-redux";
import {useCart} from "@/services/Cart";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import _ from "lodash";

const Name = 'Cart'

const ScreenOptions = {
    headerTitle: 'CoopHome',
    headerShown: false,
};
const Cart = () => {

    const insets = useSafeAreaInsets()

    const {width, height} = useWindowDimensions()

    const {userInfo} = useAuth()

    const dispatch = useDispatch()

    const listCart = useSelector(state => state.globalReducer.cart)

    useEffect(() => {
        if (userInfo) {
            dispatch(useCart({
                id: userInfo.id
            }))
        }
    }, [userInfo])

    const test = [
        {
            cate: 'fdsfgdsgjsfg dfghjdfo  drhdọ johd ohjo',
            price: '123',
            quantity: '3123123'
        },
        {
            cate: 'fdsfgdsgjsfg dfghjdfo  drhdọ johd ohjo',
            price: '123',
            quantity: '3123123'
        },
        {
            cate: 'fdsfgdsgjsfg dfghjdfo  drhdọ johd ohjo',
            price: '123',
            quantity: '3123123'
        },
        {
            cate: 'fdsfgdsgjsfg dfghjdfo  drhdọ johd ohjo',
            price: '123',
            quantity: '3123123'
        },
        {
            cate: 'fdsfgdsgjsfg dfghjdfo  drhdọ johd ohjo',
            price: '123',
            quantity: '3123123'
        },
    ]

    const total = listCart?.length <= 1 ? listCart?.[0]?.quantity * listCart?.[0]?.price : listCart?.reduce((prev, next)=>{
        if(_.isObject(prev)){
            return prev.quantity * prev.price + next.quantity * next.price
        }else{
            return prev + next.quantity * next.price
        }
    })

    const renderHidden = ({item}) => <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Icon size={5} as={<FontAwesome5 name={'trash'}/>} color={'redBase'}/>
        <Text mt={7.7} style={styles.backTextWhite}>Xóa</Text>
    </TouchableOpacity>

    const renderItem = ({item, index}) => {
        return <Box mb={3} bg={"white"} py={4} w={width} flexDir={'row'} px={'15px'}>
            <Box bg={'white'} h={80 / 300 * 400} rounded={8} shadow={3}>
                <Box>
                    <FastImageAnimated
                        style={{
                            width: 80,
                            height: 80 / 300 * 400,
                        }}
                        thumb={item?.colorImage}/>
                </Box>
            </Box>
            <Box pl={'10px'} flexGrow={1}>
                <Text fontWeight={700} fontSize={16}>{item?.productName.trim()}</Text>
                <Text mt={1}>Phân loại: {item.colorName} - {item.sizeName}</Text>
                <Box flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontWeight={700} fontSize={17} mt={2} color={Colors.light.danger}>{item.price}<Text
                        fontSize={15}
                        textDecorationLine={'underline'}>đ</Text></Text>
                    <Box pt={'15px'} pb={'5px'} justifyContent={'space-between'} flexDir={'row'}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Pressable>
                                {({
                                      isPressed
                                  }) => {
                                    return <Box style={{
                                        opacity: isPressed ? 0.3 : 1,
                                        borderColor: '#e5e5e5',
                                        borderWidth: 1,
                                    }}>
                                        <Text mx={'10px'} py={'2px'}>-</Text>
                                    </Box>
                                }}
                            </Pressable>
                            <Input
                                // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                                value={item?.quantity.toString()} keyboardType="numeric" textAlign={'center'}
                                borderRadius={0} py={'5px'}
                                px={'25px'}/>
                            <Pressable>
                                {({
                                      isPressed
                                  }) => {
                                    return <Box style={{
                                        opacity: isPressed ? 0.3 : 1,
                                        borderColor: '#e5e5e5',
                                        borderWidth: 1,
                                    }}>
                                        <Text mx={'10px'} py={'2px'}>+</Text>
                                    </Box>
                                }}
                            </Pressable>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    }

    return (
        <Box flex={1} bg={'#eeeeee'}>
            <Header title={'Giỏ hàng'} isBack={true}/>
            <Box w={width} flex={1}>
                {
                    listCart?.length > 0 &&
                    <SwipeListView
                        data={listCart}
                        rightOpenValue={-75}
                        renderItem={renderItem}
                        renderHiddenItem={renderHidden}
                    />
                }
                <Box shadow={5} bg={'white'} px={'20px'} pt={'15px'} pb={insets.bottom}>
                    <Box flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontWeight={700} fontSize={16}>
                            Tổng thanh toán:
                        </Text>
                        <Text fontWeight={700} fontSize={16} mt={2} color={Colors.light.danger}>{!!total ? total : 0}<Text
                            fontSize={15}
                            textDecorationLine={'underline'}>đ</Text></Text>
                    </Box>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.light.redBase,
                        borderRadius: 18,
                        paddingVertical: 12,
                        marginTop: 16
                    }} activeOpacity={0.6}>
                        <Text fontWeight={700} color={'white'} fontSize={17} textAlign={'center'}>Mua hàng</Text>
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: 'red',
    },
    rowFront: {
        backgroundColor: 'white',
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        marginBottom: 24
    },
    backRightBtnRight: {
        backgroundColor: '#FEF4F4',
        right: 0,
    },
});

export default registerScreen(Name, Cart, ScreenOptions);