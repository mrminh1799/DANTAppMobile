import React, {useEffect, useState} from "react";
import {Actionsheet, Box, Image, Input, Modal, Pressable, Text} from "native-base";
import {Keyboard, KeyboardAvoidingView, useWindowDimensions} from "react-native";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import Storage from "@/utils/Storage";
import {COMMON} from "@/constants";
import _ from "lodash";
import {addCart, addToCart} from "@/services/Cart";
import {useDispatch} from "react-redux";
import {useAuth} from "@/contexts";
import ToastMessageService from "@/components/ToastAlert/ToastMessageService";
import ToastMessage from "@/components/ToastAlert/ToastMessage";
import {navigate} from "@/navigators/utils";

const ShowProductDetail = ({product, listImage, openChoose, setOpenChoose}) => {

    const {userInfo} = useAuth()

    const dispatch = useDispatch()
    const {height, width} = useWindowDimensions();
    const [selectColor, setSelectColor] = useState(null)
    const [selectSize, setSelectSize] = useState(null)
    const [listColor, setListColor] = useState([])
    const [listSize, setListSize] = useState([])
    const [quantity, setQuantity] = useState('1')

    const currentImage = product?.listDetailProduct.filter(item => (item?.color?.id === selectColor) && (item?.size?.id === selectSize))

    const sumQuantity = product?.listDetailProduct?.length <= 1 ? product?.listDetailProduct?.[0].quantity : product?.listDetailProduct?.reduce((prev, next) => {
        if (_.isObject(prev)) {
            return Number(prev?.quantity) + Number(next.quantity)
        } else {
            return Number(prev) + Number(next.quantity)
        }
    })

    useEffect(() => {
        setListColor(listImage)
        setListSize(product?.listSize)
    }, [])

    useEffect(() => {
        if (!openChoose) {
            setSelectSize(null)
            setSelectColor(null)
            setListColor(listImage.map(item => {
                item.status = false
                return item
            }))
            setListSize(product?.listSize.map(item => {
                item.status = false
                return item
            }))
        }
    }, [openChoose])

    useEffect(() => {
        setQuantity('1')
    }, [listSize, listColor])

    const chooseColor = (id) => {
        setSelectColor(id === selectColor ? null : id)
        if (id === selectColor) {
            setListSize(product?.listSize.map(item => {
                item.status = false
                return item
            }))
        } else {
            let temp = []
            let temp2 = []
            product?.listDetailProduct?.map(item => {
                if ((item.color.id === id)) {
                    temp.push(item)
                }
            })
            temp2 = product?.listSize?.map(item => {
                item.status = true
                temp.map(value => {
                    if (value?.size.id === item.idSize) {
                        item.status = false
                    }
                })
                return item
            })
            setListSize(temp2)
        }
    }
    const chooseSize = (id) => {
        setSelectSize(id === selectSize ? null : id)
        if (id === selectSize) {
            setListColor(listImage.map(item => {
                item.status = false
                return item
            }))
        } else {
            let temp = []
            let temp2 = []
            temp = product?.listDetailProduct?.filter((item) => item.size.id === id)
            temp2 = listImage?.filter((item, index) => index > 0).map((item, index) => {
                item.status = true
                temp.map(value => {
                    if ((value?.color.id === item.color.id)) {
                        item.status = false
                    }
                })
                return item
            })
            temp2.unshift(product)
            setListColor(temp2)
        }
    }

    const onChangeText = (text) => {
        (Number(text) > 0 && text) && (Number(text) <= currentImage?.[0].quantity) && setQuantity(text)
    }

    const handleChangeQuantity = (type = 'minus') => {
        if (type === 'minus') {
            Number(quantity) > 1 && setQuantity(String(Number(quantity) - 1))
        }
        if (type === 'plus') {
            Number(quantity) + 1 <= currentImage?.[0].quantity && setQuantity(String(Number(quantity) + 1))
        }
    }

    const addToCart = () => {
        // let currentData = product.listDetailProduct.find(item => (item.color.id === selectColor) && (item.size.id === selectSize))
        // await Storage.get(COMMON.CART_LIST).then(data => {
        //     if (data.find(item => item.id === product.id)) {
        //         let exist = data.map(item => {
        //             if (item.id === product.id) {
        //                 let check = true
        //                 item.listCart = item?.listCart.map(value => {
        //                     if (value.id === currentData.id) {
        //                         value.cartQuantity = quantity
        //                         check = false
        //                     }
        //                     return value
        //                 })
        //                 check && item.listCart.unshift({
        //                     ...currentData,
        //                     cartQuantity: quantity
        //                 })
        //             }
        //             return item
        //         })
        //         Storage.save(COMMON.CART_LIST, exist)
        //     } else {
        //         Storage.save(COMMON.CART_LIST, [{
        //             ...product,
        //             listCart: [
        //                 {
        //                     ...currentData,
        //                     cartQuantity: quantity
        //                 }
        //             ]
        //         }])
        //     }
        // })
        let currentData = product.listDetailProduct.find(item => (item.color.id === selectColor) && (item.size.id === selectSize))
        dispatch(addCart({
            idAccount: userInfo.id,
            idProductDetail: currentData.id,
            quantity: quantity
        }))
        ToastMessageService._openMessage('Đã thêm vào giỏ hàng')
    }

    const toCheckout = () =>{
        setOpenChoose(false)
        let currentData = product.listDetailProduct.find(item => (item.color.id === selectColor) && (item.size.id === selectSize))
        currentData.idProduct = currentData.id
        currentData.price = product.price
        currentData.colorName = currentData.color.colorName
        currentData.sizeName = currentData.size.size_name
        currentData.quantity = quantity
        currentData.productName = product.name
        currentData.colorImage = currentData.image
        navigate('Checkout', {
            cart: [currentData],
            total: currentData.price * currentData.quantity,
            isKeep: true
        })
    }

    return <Actionsheet isOpen={openChoose} onClose={() => setOpenChoose(false)}>
        <KeyboardAvoidingView behavior={'position'}>
            <Actionsheet.Content alignItems={'flex-start'} borderTopRadius={5} p={0} color={'white'}>
                <Modal.CloseButton/>
                <Pressable mt={'-8px'} onPress={Keyboard.dismiss}>
                    <Box flexDir={'row'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade} w={width}
                         pb={'10px'}>
                        <FastImageAnimated
                            dadStyle={{flexGrow: 0}}
                            style={{
                                width: 80,
                                height: 80 / 300 * 400,
                                borderRadius: 0,
                                borderWidth: 1,
                                borderColor: Colors.light.lightShade,
                                marginLeft: 10,
                                flexGrow: 0
                            }} thumb={currentImage.length > 0 ? currentImage?.[0]?.image : listImage?.[0]?.image}/>
                        <Box justifyContent={'flex-end'} pl={'10px'}>
                            <Text fontSize={16} mt={1} color={Colors.light.danger}>{product?.price}<Text
                                fontSize={16}
                                textDecorationLine={'underline'}>đ</Text></Text>
                            <Text
                                color={Colors.light.mediumShade}>Kho: {currentImage.length > 0 ? currentImage?.[0]?.quantity : sumQuantity}</Text>
                        </Box>
                    </Box>
                    <Box px={'10px'} pt={'15px'} pb={'5px'} borderBottomWidth={1}
                         borderBottomColor={Colors.light.lightShade}>
                        <Text pb={'5px'} fontSize={15}>Màu</Text>
                        <Box flexDir={'row'} flexWrap={'wrap'}>
                            {
                                listColor?.map((item, index) => index > 0 &&
                                    <Pressable isDisabled={item.status} _disabled={{
                                        opacity: 0.5
                                    }} flexDir={'row'} rounded={2} px={'10px'}
                                               bg={item?.color?.id === selectColor ? "white" : '#ececec'} py={'3px'}
                                               borderWidth={1}
                                               borderColor={item?.color?.id === selectColor ? Colors.light.primary : '#ececec'}
                                               mr={index > 0 ? '10px' : 0} mb={'10px'} alignItems={'center'}
                                               onPress={() => chooseColor(item.color.id)}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25 / 300 * 400,
                                                borderRadius: 0,
                                                borderWidth: 1,
                                                borderColor: Colors.light.lightShade,
                                            }} source={{uri: item.image}}/>
                                        <Text pl={'5px'} fontSize={13}
                                              color={item?.color?.id === selectColor ? Colors.light.primary : "black"}>{item.colorName}</Text>
                                    </Pressable>)
                            }
                        </Box>
                    </Box>
                    <Box px={'10px'} pt={'15px'} pb={'5px'} borderBottomWidth={1}
                         borderBottomColor={Colors.light.lightShade}>
                        <Text pb={'5px'} fontSize={15}>Kích thước</Text>
                        <Box flexDir={'row'} flexWrap={'wrap'}>
                            {
                                listSize?.filter(item => item.isSelected).map((item, index) =>
                                    <Pressable isDisabled={item.status} _disabled={{
                                        opacity: 0.5
                                    }} flexDir={'row'} rounded={2} px={'20px'}
                                               bg={item?.idSize === selectSize ? "white" : '#ececec'} py={'3px'}
                                               borderWidth={1}
                                               borderColor={item?.idSize === selectSize ? Colors.light.primary : '#ececec'}
                                               mr={'10px'} mb={'10px'} alignItems={'center'}
                                               onPress={() => chooseSize(item.idSize)}>
                                        <Text fontSize={13}
                                              color={item?.idSize === selectSize ? Colors.light.primary : "black"}>{item.nameSize}</Text>
                                    </Pressable>)
                            }
                        </Box>
                    </Box>
                    <Box px={'10px'} pt={'15px'} pb={'5px'} justifyContent={'space-between'} flexDir={'row'}>
                        <Text pb={'5px'} fontSize={15}>Số lượng</Text>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Pressable
                                isDisabled={!selectSize || !selectColor}
                                _disabled={{
                                    opacity: 0.5
                                }}
                                onPress={() => handleChangeQuantity()}>
                                {({
                                      isPressed
                                  }) => {
                                    return <Box style={{
                                        opacity: isPressed ? 0.3 : 1,
                                        borderColor: '#e5e5e5',
                                        borderWidth: 1,
                                    }}>
                                        <Text mx={'10px'} py={'5px'}>-</Text>
                                    </Box>
                                }}
                            </Pressable>
                            <Input
                                isDisabled={!selectSize || !selectColor}
                                _disabled={{
                                    opacity: 0.5
                                }}
                                onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                                value={quantity} keyboardType="numeric" textAlign={'center'} borderRadius={0}
                                px={'15px'}/>
                            <Pressable
                                isDisabled={!selectSize || !selectColor}
                                _disabled={{
                                    opacity: 0.5
                                }}
                                onPress={() => handleChangeQuantity('plus')}>
                                {({
                                      isPressed
                                  }) => {
                                    return <Box style={{
                                        opacity: isPressed ? 0.3 : 1,
                                        borderColor: '#e5e5e5',
                                        borderWidth: 1,
                                    }}>
                                        <Text mx={'10px'} py={'5px'}>+</Text>
                                    </Box>
                                }}
                            </Pressable>
                        </Box>
                    </Box>
                    <Box flexDir={'row'} py={'10px'} bg={'white'} shadow={4} mt={2}>
                        <Pressable flex={1}
                                   onPress={addToCart}
                                   isDisabled={!selectSize || !selectColor}
                                   _disabled={{
                                       opacity: 0.5
                                   }}>
                            {({
                                  isPressed
                              }) => {
                                return <Box style={{
                                    opacity: isPressed ? 0.6 : 1,
                                    paddingVertical: 13,
                                    backgroundColor: '#01BFA5',
                                    marginLeft: 10,
                                    marginRight: 5
                                }}>
                                    <Text textAlign={'center'} color={'white'}>Thêm vào giỏ hàng</Text>
                                </Box>
                            }}
                        </Pressable>
                        <Pressable flex={1}
                                   onPress={toCheckout}
                                   isDisabled={!selectSize || !selectColor}
                                   _disabled={{
                                       opacity: 0.5
                                   }}>
                            {({
                                  isPressed
                              }) => {
                                return <Box style={{
                                    opacity: isPressed ? 0.6 : 1,
                                    paddingVertical: 13,
                                    backgroundColor: Colors.light.danger,
                                    marginRight: 10,
                                    marginLeft: 5
                                }}>
                                    <Text textAlign={'center'} color={'white'}>Mua ngay</Text>
                                </Box>
                            }}
                        </Pressable>
                    </Box>
                    <ToastMessage/>
                </Pressable>
            </Actionsheet.Content>
        </KeyboardAvoidingView>
    </Actionsheet>
}

export default ShowProductDetail