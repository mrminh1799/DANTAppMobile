import React, {useEffect, useState} from 'react'
import {navigatorRef, registerScreen} from "@/navigators/utils";
import {Box, FormControl, Input, Text, WarningOutlineIcon} from "native-base";
import {DialogBoxService, Header} from "@/components";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import {FlatList, StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";
import {useAuth} from "@/contexts";
import {useDispatch} from "react-redux";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {getOrder, newOrder} from "@/services/Order";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import _ from "lodash";
import {CommonActions} from "@react-navigation/core";
import {deleteAllCart, findCity} from "@/services/Cart";
import SelectInputFull from "@/components/SelectInput/SelectInputFullwidth";
import {FormProvider, useForm} from "react-hook-form";

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

    const formMethods = useForm()

    const [addressCity, setAddressCity] = useState({
        lstData: [],
        labelKey: 'name',
        valueKey: 'code',
        data: {}
    })
    const [addressQuan, setAddressQuan] = useState({
        lstData: [],
        labelKey: 'name',
        valueKey: 'code',
        data: {}
    })
    const [addressPhuong, setAddressPhuong] = useState({
        lstData: [],
        labelKey: 'name',
        valueKey: 'code',
        data: {}
    })

    const [order, setOrder] = useState({
        fullName: userInfo.fullname,
        idAcount: userInfo.id,
        address: '',
        detailAddress: '',
        phoneNumber: userInfo.username
    })

    useEffect(() => {
        findCity().then(res => {
            setAddressCity({
                ...addressCity,
                lstData: res?.data
            })
        })
    }, [])

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
                    <Text>Ph??n lo???i: {item?.colorName} - {item?.sizeName}</Text>
                    <Text>x{item?.quantity}</Text>
                </Box>
                <Box alignItems={'flex-end'}>
                    <Text mt={1} color={Colors.light.danger}>{item?.price}<Text
                        fontSize={15}
                        textDecorationLine={'underline'}>??</Text></Text>
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
        console.log(_.isEmpty(order.fullName), _.isEmpty(order.detailAddress), _.isEmpty(order.phoneNumber),  _.isEmpty(addressCity.data),  _.isEmpty(addressQuan.data),  _.isEmpty(addressPhuong.data))
        if (_.isEmpty(order.fullName) || _.isEmpty(order.detailAddress) || _.isEmpty(order.phoneNumber) ||  _.isEmpty(addressCity.data) ||  _.isEmpty(addressQuan.data) ||  _.isEmpty(addressPhuong.data)) return
        dispatch(newOrder({
            ...order,
            address: addressCity.data.name + ", " + addressQuan.data.name + ', ' + addressPhuong.data.name,
            listOrderProductDetailDTO: params.cart.map(item => ({
                idProductDetail: item.idProduct,
                quantity: item.quantity
            }))
        }, () => {
            !params?.isKeep && dispatch(deleteAllCart({
                idAccount: userInfo.id
            }))
            dispatch(getOrder({
                id: userInfo.id
            }))
            DialogBoxService.alert('?????t h??ng th??nh c??ng', () => navigatorRef.current.dispatch((routes) => {
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
            <Text py={2} fontSize={16} fontWeight={700}>?????a ch??? nh???n h??ng</Text>
            <NativeBaseProvider>
                <FormControl isInvalid={_.isEmpty(order.fullName)}>
                    <FormControl.Label isRequired>H??? v?? t??n</FormControl.Label>
                    <Input value={order?.fullName} onChangeText={text => handleChangeText(text, 'fullName')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Kh??ng ???????c b??? tr???ng tr?????ng n??y
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={_.isEmpty(order.phoneNumber)}>
                    <FormControl.Label isRequired>S??? ??i???n tho???i</FormControl.Label>
                    <Input value={order?.phoneNumber} onChangeText={text => handleChangeText(text, 'phoneNumber')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Kh??ng ???????c b??? tr???ng tr?????ng n??y
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormProvider {...formMethods}>
                    <FormControl isInvalid={_.isEmpty(addressCity.data)}>
                        <FormControl.Label isRequired>Th??nh ph???</FormControl.Label>
                        <SelectInputFull defaultValue={''} name={'city'} data={addressCity}
                                         style={{
                                             height: 33,
                                             borderRadius: 4
                                         }}
                                         onChange={(value) => {
                                             formMethods.setValue('city', value)
                                             formMethods.setValue('quan', '')
                                             formMethods.setValue('phuong', '')
                                             setAddressCity({
                                                 ...addressCity,
                                                 data: value
                                             })
                                             setAddressQuan({
                                                 ...addressQuan,
                                                 lstData: value?.districts,
                                                 data: {}
                                             })
                                             setAddressPhuong({
                                                 ...addressPhuong,
                                                 data: {}
                                             })
                                         }}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Kh??ng ???????c b??? tr???ng tr?????ng n??y
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={_.isEmpty(addressQuan.data)}>
                        <FormControl.Label isRequired>Qu???n/Huy???n</FormControl.Label>
                        <SelectInputFull defaultValue={''} name={'quan'} data={addressQuan}
                                         style={{
                                             height: 33,
                                             borderRadius: 4
                                         }}
                                         disable={_.isEmpty(addressCity?.data)}
                                         onChange={(value) => {
                                             formMethods.setValue('quan', value)
                                             setAddressQuan({
                                                 ...addressQuan,
                                                 data: value
                                             })
                                             setAddressPhuong({
                                                 ...addressPhuong,
                                                 lstData: value?.wards,
                                                 data: {}
                                             })
                                         }}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Kh??ng ???????c b??? tr???ng tr?????ng n??y
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={_.isEmpty(addressPhuong.data)}>
                        <FormControl.Label isRequired>Ph?????ng/X??</FormControl.Label>
                        <SelectInputFull defaultValue={''} name={'phuong'} data={addressPhuong}
                                         style={{
                                             height: 33,
                                             borderRadius: 4
                                         }}
                                         disable={addressPhuong?.lstData?.length <= 0}
                                         onChange={(value) => {
                                             formMethods.setValue('phuong', value)
                                             setAddressPhuong({
                                                 ...addressPhuong,
                                                 data: value
                                             })
                                         }}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Kh??ng ???????c b??? tr???ng tr?????ng n??y
                        </FormControl.ErrorMessage>
                    </FormControl>
                </FormProvider>
                <FormControl isInvalid={_.isEmpty(order?.detailAddress)}>
                    <FormControl.Label isRequired>?????a ch??? chi ti???t</FormControl.Label>
                    <Input value={order?.detailAddress} onChangeText={text => handleChangeText(text, 'detailAddress')}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        Kh??ng ???????c b??? tr???ng tr?????ng n??y
                    </FormControl.ErrorMessage>
                </FormControl>
            </NativeBaseProvider>
        </Box>
    }

    return (
        <Box flex={1} bg={'white'}>
            <Header title={'Thanh to??n'} isBack={true}/>
            <FlatList ListHeaderComponent={<Text mt={2} fontSize={17} fontWeight={600} pl={'15px'}>S???n ph???m</Text>}
                      ListFooterComponent={renderFooter()}
                      data={params?.cart} renderItem={renderItem}/>
            <Box shadow={6} bg={'white'} pb={insets.bottom} flexDir={'row'} alignItems={'center'}
                 justifyContent={'flex-end'}>
                <Box py={1} alignItems={'flex-end'}>
                    <Text>T???ng thanh to??n</Text>
                    <Text color={Colors.light.redBase} fontSize={15} fontWeight={600}>{params.total}<Text
                        fontSize={12}
                        textDecorationLine={'underline'}>??</Text></Text>
                </Box>
                <TouchableOpacity onPress={handleOrder} activeOpacity={0.7}>
                    <Box py={3} px={'20px'} bg={Colors.light.danger} ml={'14px'} justifyContent={'center'}>
                        <Text color={'white'} fontSize={16} fontWeight={600}>?????t h??ng</Text>
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