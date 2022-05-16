import React, {useState} from 'react'
import {navigatorRef, registerScreen} from "@/navigators/utils";
import {Box, FormControl, Input, Text, WarningOutlineIcon} from "native-base";
import {DialogBoxService, Header} from "@/components";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import {FlatList, StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";
import {useAuth} from "@/contexts";
import {useDispatch} from "react-redux";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {newOrder} from "@/services/Order";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import _ from "lodash";
import {CommonActions} from "@react-navigation/core";
import {deleteAllCart} from "@/services/Cart";

const Name = 'Checkout'

const ScreenOptions = {
    headerShown: false,
};
const DEFAULT_IMAGE = 'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'

const Checkout = ({route}) => {

    const {params} = route

    const insets = useSafeAreaInsets()

    const {width, height} = useWindowDimensions()

    const {userInfo} = useAuth()

    const dispatch = useDispatch()

    const [order, setOrder] = useState({
        fullName: userInfo.fullname,
        idAcount: userInfo.id,
        address: '',
        detailAddress: '',
        phoneNumber: userInfo.username
    })

    const renderItem = ({item, index}) => {
        return <Box bg={"white"} py={4} w={width} flexDir={'row'} px={'15px'} borderBottomWidth={1}
                    borderBottomColor={Colors.light.lightShade}>
            <Box flexDir={'row'} alignItems={'center'} shadow={4}>
                <FastImageAnimated
                    style={{
                        width: 60,
                        height: 60 / 300 * 400,
                        borderRadius: 0,
                    }}
                    thumb={item?.colorImage ? item?.colorImage : DEFAULT_IMAGE}/>
            </Box>
            <Box pl={'10px'} flex={1}>
                <Text fontWeight={700} fontSize={15}>{item?.productName?.trim()}</Text>
                <Box flexDir={'row'} justifyContent={'space-between'}>
                    <Text>Phân loại: {item?.colorName} - {item?.sizeName}</Text>
                    <Text>x{item?.quantity}</Text>
                </Box>
                <Box alignItems={'flex-end'}>
                    <Text mt={1} color={Colors.light.danger}>{item?.price}<Text
                        fontSize={15}
                        textDecorationLine={'underline'}>đ</Text></Text>
                </Box>
            </Box>
        </Box>
    }

    const handleChangeText = (text, name) => {
        setOrder({
            ...order,
            [name]: text
        })
    }

    const handleOrder = () => {
        if (_.isEmpty(order.fullName) || _.isEmpty(order.address) || _.isEmpty(order.detailAddress) || _.isEmpty(order.phoneNumber)) return
        dispatch(newOrder({
            ...order,
            listOrderProductDetailDTO: params.cart.map(item => ({
                idProductDetail: item.idProduct,
                quantity: item.quantity
            }))
        }, () => {
            dispatch(deleteAllCart({
                idAccount: userInfo.id
            }))
            DialogBoxService.alert('Đặt hàng thành công', () => navigatorRef.current.dispatch((routes) => {
                return CommonActions.reset({
                    ...routes,
                    index: 0,
                    routes: [routes?.routes?.[0]]
                })
            }))
        }))
    }

    const renderFooter = () => {
        return <Box px={'15px'}>
            <Text py={2} fontSize={16} fontWeight={700}>Địa chỉ nhận hàng</Text>
            <NativeBaseProvider>
                <FormControl isInvalid={_.isEmpty(order.fullName)}>
                    <FormControl.Label isRequired>Họ và tên</FormControl.Label>
                    <Input value={order?.fullName} onChangeText={text => handleChangeText(text, 'fullName')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Không được bỏ trống trường này
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={_.isEmpty(order.phoneNumber)}>
                    <FormControl.Label isRequired>Số điện thoại</FormControl.Label>
                    <Input value={order?.phoneNumber} onChangeText={text => handleChangeText(text, 'phoneNumber')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Không được bỏ trống trường này
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={_.isEmpty(order.address)}>
                    <FormControl.Label isRequired>Địa chỉ</FormControl.Label>
                    <Input value={order?.address} onChangeText={text => handleChangeText(text, 'address')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Không được bỏ trống trường này
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={_.isEmpty(order?.detailAddress)}>
                    <FormControl.Label isRequired>Địa chỉ chi tiết</FormControl.Label>
                    <Input value={order?.detailAddress} onChangeText={text => handleChangeText(text, 'detailAddress')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Không được bỏ trống trường này
                    </FormControl.ErrorMessage>
                </FormControl>
            </NativeBaseProvider>
        </Box>
    }

    return (
        <Box flex={1} bg={'white'}>
            <Header title={'Thanh toán'} isBack={true}/>
            <FlatList ListHeaderComponent={<Text mt={2} fontSize={17} fontWeight={600} pl={'15px'}>Sản phẩm</Text>}
                      ListFooterComponent={renderFooter()}
                      data={params?.cart} renderItem={renderItem}/>
            <Box shadow={6} bg={'white'} pb={insets.bottom} flexDir={'row'} alignItems={'center'}
                 justifyContent={'flex-end'}>
                <Box py={1} alignItems={'flex-end'}>
                    <Text>Tổng thanh toán</Text>
                    <Text color={Colors.light.redBase} fontSize={15} fontWeight={600}>{params.total}<Text
                        fontSize={12}
                        textDecorationLine={'underline'}>đ</Text></Text>
                </Box>
                <TouchableOpacity onPress={handleOrder} activeOpacity={0.7}>
                    <Box py={3} px={'20px'} bg={Colors.light.danger} ml={'14px'} justifyContent={'center'}>
                        <Text color={'white'} fontSize={16} fontWeight={600}>Đặt hàng</Text>
                    </Box>
                </TouchableOpacity>
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
        marginBottom: 12,
    },
    backRightBtnRight: {
        backgroundColor: '#FEF4F4',
        right: 0,
    },
});

export default registerScreen(Name, Checkout, ScreenOptions);