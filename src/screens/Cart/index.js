import React, {useEffect} from 'react'
import {registerScreen} from "@/navigators/utils";
import {Box, Icon, Input, Pressable, ScrollView, Text} from "native-base";
import {Header} from "@/components";
import Entypo from "react-native-vector-icons/Entypo";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import {StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {SwipeListView} from "react-native-swipe-list-view";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useAuth} from "@/contexts";
import {useDispatch} from "react-redux";

const Name = 'Cart'

const ScreenOptions = {
    headerTitle: 'CoopHome',
    headerShown: false,
};
const Cart = () => {

    const {width, height} = useWindowDimensions()

    const {userInfo} = useAuth()

    const dispatch = useDispatch()

    console.log(userInfo)

    useEffect(() => {
        if (userInfo) {
            // dispatch()
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

    return (
        <Box flex={1} bg={'#eeeeee'}>
            <Header title={'Giỏ hàng'} isBack={true}/>
            <ScrollView flex={1} zIndex={-1}>
                <Box mb={4} bg={'white'} w={width}>
                    <Box alignItems={'center'} justifyContent={'space-between'} py={4} px={'15px'} flexDir={'row'}
                         borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'box'}/>} size={5} color={Colors.light.darkTint}/>
                            <Text pl={'10px'} fontWeight={700} fontSize={16}>Test 123 123</Text>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                        <Text fontSize={15}>
                            Xoá
                        </Text>
                    </Box>
                    <SwipeListView
                        data={test}
                        rightOpenValue={-75}
                        renderItem={() => <Box bg={"white"} py={4} w={width} flexDir={'row'} px={'15px'}>
                            <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>
                                <FastImageAnimated
                                    style={{
                                        width: 80,
                                        height: 80 / 300 * 400,
                                        borderRadius: 0,
                                        marginLeft: 10
                                    }}
                                    thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>
                            </Box>
                            <Box pl={'10px'} flexShrink={1}>
                                <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>
                                    <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf
                                        jdkfgjfd dfjglldfg</Text>
                                    <Box flexShrink={3}>
                                        <Icon as={<Entypo name={'chevron-down'}/>} size={5}
                                              color={Colors.light.darkTint}/>
                                    </Box>
                                </Box>
                                <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text
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
                                                    <Text mx={'10px'} py={'4px'}>-</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                        <Input
                                            // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                                            value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}
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
                                                    <Text mx={'10px'} py={'4px'}>+</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>}
                        renderHiddenItem={() =>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                            >
                                <Icon size={5} as={<FontAwesome5 name={'trash'}/>} color={'redBase'}/>
                                <Text mt={7.7} style={styles.backTextWhite}>Xóa</Text>
                            </TouchableOpacity>}
                    />
                    {/*<Box>*/}
                    {/*    <Box py={4} w={width} flexDir={'row'} px={'15px'}>*/}
                    {/*        <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>*/}
                    {/*            <FastImageAnimated*/}
                    {/*                style={{*/}
                    {/*                    width: 80,*/}
                    {/*                    height: 80 / 300 * 400,*/}
                    {/*                    borderRadius: 0,*/}
                    {/*                    marginLeft: 10*/}
                    {/*                }}*/}
                    {/*                thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>*/}
                    {/*        </Box>*/}
                    {/*        <Box pl={'10px'} flexShrink={1}>*/}
                    {/*            <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>*/}
                    {/*                <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf jdkfgjfd dfjglldfg</Text>*/}
                    {/*                <Box flexShrink={3}>*/}
                    {/*                    <Icon as={<Entypo name={'chevron-down'}/>} size={5} color={Colors.light.darkTint}/>*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*            <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text*/}
                    {/*                fontSize={15}*/}
                    {/*                textDecorationLine={'underline'}>đ</Text></Text>*/}
                    {/*            <Box pt={'15px'} pb={'5px'} justifyContent={'space-between'} flexDir={'row'}>*/}
                    {/*                <Box flexDir={'row'} alignItems={'center'}>*/}
                    {/*                    <Pressable>*/}
                    {/*                        {({*/}
                    {/*                              isPressed*/}
                    {/*                          }) => {*/}
                    {/*                            return <Box style={{*/}
                    {/*                                opacity: isPressed ? 0.3 : 1,*/}
                    {/*                                borderColor: '#e5e5e5',*/}
                    {/*                                borderWidth: 1,*/}
                    {/*                            }}>*/}
                    {/*                                <Text mx={'10px'} py={'4px'}>-</Text>*/}
                    {/*                            </Box>*/}
                    {/*                        }}*/}
                    {/*                    </Pressable>*/}
                    {/*                    <Input*/}
                    {/*                        // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}*/}
                    {/*                        value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}*/}
                    {/*                        px={'25px'}/>*/}
                    {/*                    <Pressable>*/}
                    {/*                        {({*/}
                    {/*                              isPressed*/}
                    {/*                          }) => {*/}
                    {/*                            return <Box style={{*/}
                    {/*                                opacity: isPressed ? 0.3 : 1,*/}
                    {/*                                borderColor: '#e5e5e5',*/}
                    {/*                                borderWidth: 1,*/}
                    {/*                            }}>*/}
                    {/*                                <Text mx={'10px'} py={'4px'}>+</Text>*/}
                    {/*                            </Box>*/}
                    {/*                        }}*/}
                    {/*                    </Pressable>*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}
                    {/*    <Box py={4} w={width} flexDir={'row'} px={'15px'}>*/}
                    {/*        <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>*/}
                    {/*            <FastImageAnimated*/}
                    {/*                style={{*/}
                    {/*                    width: 80,*/}
                    {/*                    height: 80 / 300 * 400,*/}
                    {/*                    borderRadius: 0,*/}
                    {/*                    marginLeft: 10*/}
                    {/*                }}*/}
                    {/*                thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>*/}
                    {/*        </Box>*/}
                    {/*        <Box pl={'10px'} flexShrink={1}>*/}
                    {/*            <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>*/}
                    {/*                <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf jdkfgjfd dfjglldfg</Text>*/}
                    {/*                <Box flexShrink={3}>*/}
                    {/*                    <Icon as={<Entypo name={'chevron-down'}/>} size={5} color={Colors.light.darkTint}/>*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*            <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text*/}
                    {/*                fontSize={15}*/}
                    {/*                textDecorationLine={'underline'}>đ</Text></Text>*/}
                    {/*            <Box pt={'15px'} pb={'5px'} justifyContent={'space-between'} flexDir={'row'}>*/}
                    {/*                <Box flexDir={'row'} alignItems={'center'}>*/}
                    {/*                    <Pressable>*/}
                    {/*                        {({*/}
                    {/*                              isPressed*/}
                    {/*                          }) => {*/}
                    {/*                            return <Box style={{*/}
                    {/*                                opacity: isPressed ? 0.3 : 1,*/}
                    {/*                                borderColor: '#e5e5e5',*/}
                    {/*                                borderWidth: 1,*/}
                    {/*                            }}>*/}
                    {/*                                <Text mx={'10px'} py={'4px'}>-</Text>*/}
                    {/*                            </Box>*/}
                    {/*                        }}*/}
                    {/*                    </Pressable>*/}
                    {/*                    <Input*/}
                    {/*                        // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}*/}
                    {/*                        value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}*/}
                    {/*                        px={'25px'}/>*/}
                    {/*                    <Pressable>*/}
                    {/*                        {({*/}
                    {/*                              isPressed*/}
                    {/*                          }) => {*/}
                    {/*                            return <Box style={{*/}
                    {/*                                opacity: isPressed ? 0.3 : 1,*/}
                    {/*                                borderColor: '#e5e5e5',*/}
                    {/*                                borderWidth: 1,*/}
                    {/*                            }}>*/}
                    {/*                                <Text mx={'10px'} py={'4px'}>+</Text>*/}
                    {/*                            </Box>*/}
                    {/*                        }}*/}
                    {/*                    </Pressable>*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}
                    {/*    <Box py={4} w={width} flexDir={'row'} px={'15px'}>*/}
                    {/*        <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>*/}
                    {/*            <FastImageAnimated*/}
                    {/*                style={{*/}
                    {/*                    width: 80,*/}
                    {/*                    height: 80 / 300 * 400,*/}
                    {/*                    borderRadius: 0,*/}
                    {/*                    marginLeft: 10*/}
                    {/*                }}*/}
                    {/*                thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>*/}
                    {/*        </Box>*/}
                    {/*        <Box pl={'10px'} flexShrink={1}>*/}
                    {/*            <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>*/}
                    {/*                <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf jdkfgjfd dfjglldfg</Text>*/}
                    {/*                <Box flexShrink={3}>*/}
                    {/*                    <Icon as={<Entypo name={'chevron-down'}/>} size={5} color={Colors.light.darkTint}/>*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*            <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text*/}
                    {/*                fontSize={15}*/}
                    {/*                textDecorationLine={'underline'}>đ</Text></Text>*/}
                    {/*            <Box pt={'15px'} pb={'5px'} justifyContent={'space-between'} flexDir={'row'}>*/}
                    {/*                <Box flexDir={'row'} alignItems={'center'}>*/}
                    {/*                    <Pressable>*/}
                    {/*                        {({*/}
                    {/*                              isPressed*/}
                    {/*                          }) => {*/}
                    {/*                            return <Box style={{*/}
                    {/*                                opacity: isPressed ? 0.3 : 1,*/}
                    {/*                                borderColor: '#e5e5e5',*/}
                    {/*                                borderWidth: 1,*/}
                    {/*                            }}>*/}
                    {/*                                <Text mx={'10px'} py={'4px'}>-</Text>*/}
                    {/*                            </Box>*/}
                    {/*                        }}*/}
                    {/*                    </Pressable>*/}
                    {/*                    <Input*/}
                    {/*                        // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}*/}
                    {/*                        value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}*/}
                    {/*                        px={'25px'}/>*/}
                    {/*                    <Pressable>*/}
                    {/*                        {({*/}
                    {/*                              isPressed*/}
                    {/*                          }) => {*/}
                    {/*                            return <Box style={{*/}
                    {/*                                opacity: isPressed ? 0.3 : 1,*/}
                    {/*                                borderColor: '#e5e5e5',*/}
                    {/*                                borderWidth: 1,*/}
                    {/*                            }}>*/}
                    {/*                                <Text mx={'10px'} py={'4px'}>+</Text>*/}
                    {/*                            </Box>*/}
                    {/*                        }}*/}
                    {/*                    </Pressable>*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}
                </Box>
                <Box mb={4} bg={'white'} w={width}>
                    <Box alignItems={'center'} justifyContent={'space-between'} py={4} px={'15px'} flexDir={'row'}
                         borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                        <Box flexDir={'row'} alignItems={'center'}>
                            <Icon as={<Feather name={'box'}/>} size={5} color={Colors.light.darkTint}/>
                            <Text pl={'10px'} fontWeight={700} fontSize={16}>Test 123 123</Text>
                            <Icon as={<Entypo name={'chevron-thin-right'}/>} ml={'5px'} size={4}
                                  color={Colors.light.darkTint}/>
                        </Box>
                        <Text fontSize={15}>
                            Xoá
                        </Text>
                    </Box>
                    <Box>
                        <Box py={4} w={width} flexDir={'row'} px={'15px'}>
                            <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>
                                <FastImageAnimated
                                    style={{
                                        width: 80,
                                        height: 80 / 300 * 400,
                                        borderRadius: 0,
                                        marginLeft: 10
                                    }}
                                    thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>
                            </Box>
                            <Box pl={'10px'} flexShrink={1}>
                                <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>
                                    <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf
                                        jdkfgjfd dfjglldfg</Text>
                                    <Box flexShrink={3}>
                                        <Icon as={<Entypo name={'chevron-down'}/>} size={5}
                                              color={Colors.light.darkTint}/>
                                    </Box>
                                </Box>
                                <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text
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
                                                    <Text mx={'10px'} py={'4px'}>-</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                        <Input
                                            // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                                            value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}
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
                                                    <Text mx={'10px'} py={'4px'}>+</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box py={4} w={width} flexDir={'row'} px={'15px'}>
                            <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>
                                <FastImageAnimated
                                    style={{
                                        width: 80,
                                        height: 80 / 300 * 400,
                                        borderRadius: 0,
                                        marginLeft: 10
                                    }}
                                    thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>
                            </Box>
                            <Box pl={'10px'} flexShrink={1}>
                                <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>
                                    <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf
                                        jdkfgjfd dfjglldfg</Text>
                                    <Box flexShrink={3}>
                                        <Icon as={<Entypo name={'chevron-down'}/>} size={5}
                                              color={Colors.light.darkTint}/>
                                    </Box>
                                </Box>
                                <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text
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
                                                    <Text mx={'10px'} py={'4px'}>-</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                        <Input
                                            // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                                            value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}
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
                                                    <Text mx={'10px'} py={'4px'}>+</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box py={4} w={width} flexDir={'row'} px={'15px'}>
                            <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>
                                <FastImageAnimated
                                    style={{
                                        width: 80,
                                        height: 80 / 300 * 400,
                                        borderRadius: 0,
                                        marginLeft: 10
                                    }}
                                    thumb={'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'}/>
                            </Box>
                            <Box pl={'10px'} flexShrink={1}>
                                <Box p={'8px'} bg={'#eeeeee'} flexDir={'row'}>
                                    <Text fontWeight={300} flexShrink={7}>Phân loại: fádfkj fdsgj dfjgldf dfj gdf
                                        jdkfgjfd dfjglldfg</Text>
                                    <Box flexShrink={3}>
                                        <Icon as={<Entypo name={'chevron-down'}/>} size={5}
                                              color={Colors.light.darkTint}/>
                                    </Box>
                                </Box>
                                <Text fontWeight={700} fontSize={16} mt={1} color={Colors.light.danger}>123<Text
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
                                                    <Text mx={'10px'} py={'4px'}>-</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                        <Input
                                            // onChangeText={(text) => onChangeText(text?.replace(/[^\d]/g, ''))}
                                            value={'1'} keyboardType="numeric" textAlign={'center'} borderRadius={0}
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
                                                    <Text mx={'10px'} py={'4px'}>+</Text>
                                                </Box>
                                            }}
                                        </Pressable>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
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