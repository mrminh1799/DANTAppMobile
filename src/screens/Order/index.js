import React, {useEffect, useRef, useState} from "react";
import {registerScreen} from "@/navigators/utils";
import {Box, Icon, Text} from "native-base";
import {Header} from "@/components";
import {useDispatch} from "react-redux";
import {useAuth} from "@/contexts";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/styles/Colors";
import {getOrder} from "@/services/Order";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import Feather from "react-native-vector-icons/Feather";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import _ from "lodash";

const Name = "Order"

const ScreenOptions = {
    headerShown: false,
};

const DEFAULT_IMAGE = 'https://mcdn.nhanh.vn/store/2071/ps/20220329/tp618_51958658872_oa.jpg'
const Order = ({route}) => {

    const {params} = route

    const {width, height} = useWindowDimensions()

    const insets = useSafeAreaInsets();

    const dispatch = useDispatch()

    const {userInfo, setUserInfo} = useAuth()

    const [order, setOrder] = useState({})

    const [tab, setTab] = useState(0)

    const ref = useRef()

    useEffect(() => {
        setTab(params.tab)
        ref?.current?.toTabView(params?.tab ? params?.tab : 0)
    }, [params?.tab])

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
            }, (res) => {
                res.map(item => {
                    temp?.[item?.status]?.push(item)
                })
                setOrder(temp)
            }))
            params.setRefreshing(true)
        }
    }, [userInfo])

    const renderItem = (item) => {

        return <Box bg={"white"} py={4} w={width} flexDir={'row'} px={'15px'} borderBottomWidth={1}
                    borderBottomColor={Colors.light.lightShade}>
            <Box flexDir={'row'} h={80 / 300 * 400} alignItems={'center'}>
                <FastImageAnimated
                    style={{
                        width: 80,
                        height: 80 / 300 * 400,
                        borderRadius: 0,
                    }}
                    thumb={item?.image ? item?.image : DEFAULT_IMAGE }/>
            </Box>
            <Box pl={'10px'} flex={1}>
                <Text fontWeight={700} fontSize={15}>{item?.nameProduct.trim()}</Text>
                <Box flexDir={'row'} justifyContent={'space-between'}>
                    <Text>Phân loại: {item?.colorName} - {item?.sizeName}</Text>
                    <Text>x{item.quantity}</Text>
                </Box>
                <Box alignItems={'flex-end'}>
                    <Text mt={1} color={Colors.light.danger}>{item?.price}<Text
                        fontSize={15}
                        textDecorationLine={'underline'}>đ</Text></Text>
                </Box>
            </Box>
        </Box>
    }

    const OrderList = (type = 0) => {

        return <Box pb={insets.bottom}>
            {
                order?.[type]?.length > 0 ?
                order?.[type]?.map(item => {

                    const total = item?.listOrderDetailDTO?.length <= 1 ? (item?.listOrderDetailDTO?.[0]?.quantity * item?.listOrderDetailDTO?.[0]?.price) : item?.listOrderDetailDTO?.reduce((prev, next) => {
                        if (_.isObject(prev)) {
                            return (next?.quantity * next?.price) + (prev?.quantity * prev?.price)
                        } else {
                            return prev + (next?.quantity * next?.price)
                        }
                    })

                    return <Box mt={'10px'} bg={'white'}>
                        <Box alignItems={'center'} justifyContent={'space-between'} py={2} px={'15px'} flexDir={'row'}
                             borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                            <Box flexDir={'row'} alignItems={'center'}>
                                <Icon as={<Feather name={'box'}/>} size={5} color={Colors.light.darkTint}/>
                                <Text pl={'10px'} fontWeight={700} fontSize={15}>Mã ĐH: {item.orderId}</Text>
                            </Box>
                        </Box>
                        {
                            item?.listOrderDetailDTO.map(item => renderItem(item))
                        }
                        <Box py={2} px={'15px'} justifyContent={'space-between'} flexDir={'row'}>
                            <Text>{item?.listOrderDetailDTO?.length} sản phẩm</Text>
                            <Text>Thành tiền: <Text color={Colors.light.danger}>{total.toString()}<Text
                                fontSize={15}
                                textDecorationLine={'underline'}>đ</Text></Text></Text>
                        </Box>
                    </Box>
                })
                    :
                    <Box height={'50%'} justifyContent={'center'} alignItems={'center'}>
                        <Text>Chưa có đơn nào!</Text>
                    </Box>
            }
        </Box>
    }

    return (
        <Box flex={1} bg={'#eee'}>
            <Header title={'Đơn mua'} isBack/>
            <ScrollableTabView
                ref={scrollRef => ref.current = scrollRef}
                onBeforeEndReached={()=>{
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
                    }, (res) => {
                        res.map(item => {
                            temp?.[item?.status]?.push(item)
                        })
                        setOrder(temp)
                    }))
                    params.setRefreshing(true)
                }}
                tabsStyle={{
                    height: 40,
                    backgroundColor: 'white',
                }}
                tabStyle={{
                    backgroundColor: 'white',
                    width: width / 4,
                }}
                tabUnderlineStyle={{
                    backgroundColor: Colors.light.redBase,
                    top: 37,
                    height: 3,
                }}
                textStyle={{
                    color: "#787a84",
                    fontSize: 14,
                }}
                textActiveStyle={{
                    color: "#0a0a0a",
                }}
                firstIndex={0}
                useScroll={true}
                tabsEnableAnimatedUnderlineWidth={50}
                tabsEnableAnimated={true}
                stacks={[
                    {
                        screen: () => OrderList(1),
                        tabLabel: "Chờ xác nhận",
                    },
                    {
                        screen: () => OrderList(2),
                        tabLabel: "Đã xử lý",
                    },
                    {
                        screen: () => OrderList(3),
                        tabLabel: "Hoàn thành",
                    },
                    {
                        screen: () => OrderList(5),
                        tabLabel: "Đã đổi trả",
                    },
                    {
                        screen: () => OrderList(0),
                        tabLabel: "Thất bại",
                    },
                ]}/>
        </Box>
    )
}

export default registerScreen(Name, Order, ScreenOptions);
