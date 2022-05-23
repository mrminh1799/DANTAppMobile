import React, {useEffect, useMemo, useState} from "react";
import {goBack, navigate, registerScreen} from "@/navigators/utils";
import {Box, Icon, Input, KeyboardAvoidingView, Pressable, Text} from "native-base";
import {FlatList, useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import {Colors} from "@/styles/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useDispatch, useSelector} from "react-redux";
import {useGetDetailProduct, useGetProductCate, useGetProductParent} from "@/services/Product";
import {loadAnimated} from "@/utils/Other";
import FormatText from "../../components/FormatText";
import _ from "lodash";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";


const Name = "Category"

const ScreenOptions = {
    headerShown: false,
};
const DEFAULT_IMAGE = 'https://mcdn.nhanh.vn/store/2071/ps/20220416/TP200.jpg'
const Category = ({route}) => {

    const {params} = route

    const {width, height} = useWindowDimensions()

    const insets = useSafeAreaInsets()

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    const [curCate, setCurCate] = useState({})

    const [lstProduct, setLstProduct] = useState([])

    const productParent = useSelector(state => state.globalReducer.product_by_cateParent)

    const productChild = useSelector(state => state.globalReducer.product_by_cate)

    useEffect(() => {
        if (params?.lstChild && params?.idParent) {
            loadAnimated()
            setCurCate({
                "idCategory": params?.idParent,
                "nameCategory": "Tất cả",
                "isParent": true
            })
        }
    }, [params?.lstChild, params?.idParent])

    useEffect(() => {
        if (curCate && curCate?.idCategory) {
            if (curCate?.isParent) {
                dispatch(useGetProductParent({
                    id: curCate?.idCategory
                }, (res) => {
                    if (res) {
                        loadAnimated()
                        setLstProduct(res)
                    }
                }))
            } else {
                dispatch(useGetProductCate({
                    id: curCate?.idCategory
                }, (res) => {
                    if (res) {
                        loadAnimated()
                        setLstProduct(res)
                    }
                }))
            }
        }
    }, [curCate])

    const handleSearch = (text) => {
        if (curCate?.isParent) {
            setLstProduct(productParent.filter(item => FormatText(item.name).includes(FormatText(text))))
        } else {
            setLstProduct(productChild.filter(item => FormatText(item.name).includes(FormatText(text))))
        }
    }

    const renderCateChild = ({item, index}) => {
        const check = item.idCategory == curCate.idCategory
        const style = check ? {
                backgroundColor: 'black',
                borderColor: 'black',
            }
            :
            {
                backgroundColor: 'white',
                borderColor: Colors.light.smoke,
            }
        return (<Pressable onPress={() => {
            loadAnimated()
            setCurCate(item)
            setSearch('')
        }} ml={index === 0 ? '25px' : 0} p={'13px'} py={'11px'} borderWidth={1} mr={3} rounded={8} style={[style]}>
            <Text fontWeight={600} color={check ? 'white' : 'black'}>{item?.nameCategory}</Text>
        </Pressable>)
    }

    const RenderProduct = ({item, index}) => {

        const getDetailProduct = useGetDetailProduct({
            id: item?.id,
        })

        const toDetailProduct = () => {
            getDetailProduct.refetch().then(res => {
                if (res) {
                    console.log(res)
                    navigate('ProductDetail', {
                        data: res
                    })
                }
            })
        }

        return (<Pressable style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9.11,

            elevation: 14,
        }} bg={'white'} rounded={8} mb={'20px'} pb={'5px'} w={(width - 70) / 2} onPress={toDetailProduct} ml={index % 2 !== 0 ? '20px' : 0}>
            <FastImageAnimated
                thumb={item?.image ? item.image : DEFAULT_IMAGE}
                style={{
                    width: (width - 70) / 2,
                    height: ((width - 70) / 2) / 275 * 413
                }}
                width={(width - 70) / 2}
                height={((width - 70) / 2) / 275 * 413}
            />
            <Text px={'10px'} pt={'10px'} fontWeight={700} noOfLines={1}>
                {item?.name}
            </Text>
            <Text px={'10px'} color={Colors.light.redBase} fontWeight={600}>
                {item?.price}đ
            </Text>
        </Pressable>)
    }

    const renderHeader = useMemo(() => {
        return <Box mb={'15px'} px={'25px'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Pressable onPress={goBack}>
                <Icon as={<Ionicons name="arrow-back-outline"/>} size={'25px'} color={'black'}/>
            </Pressable>
            <Box flex={1} ml={'10px'}>
                <Input
                    onChangeText={text => {
                        setSearch(text)
                        handleSearch(text)
                    }}
                    value={search}
                    leftElement={<Icon as={<Feather name={'search'}/>} ml={'10px'} size={6}
                                       color={Colors.light.mediumContrast}/>}
                    fontSize={14} bg={'#f1f0f0'} borderWidth={0} px={'10px'}
                    placeholder={'Tìm sản phẩm'} py={'12px'}/>
            </Box>
        </Box>
    }, [search])

    const renderLstCate = useMemo(() => {

        return <Box mb={'15px'}>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={[
                {
                    "idCategory": params?.idParent,
                    "nameCategory": "Tất cả",
                    "isParent": true
                },
                ...params?.lstChild
            ]} renderItem={(value) => renderCateChild(value)}/>
        </Box>
    }, [params?.lstChild, params?.idParent, curCate])

    const renderLstProduct = useMemo(() => {
        return _.isEmpty(lstProduct) ?
            <Box justifyContent={'center'} alignItems={'center'}>
                <Text>Không có sản phẩm nào!</Text>
            </Box>
            :
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    paddingHorizontal: 25,
                    backgroundColor: '#eee',
                    paddingTop: 15,
                    marginBottom: insets.bottom
                }} data={lstProduct} numColumns={2} renderItem={(value) => <RenderProduct {...value}/>}/>
    }, [lstProduct])

    return (
        <KeyboardAvoidingView flex={1} bg={'white'} pt={insets.top}>
            {renderHeader}
            {renderLstCate}
            {renderLstProduct}
        </KeyboardAvoidingView>
    )
}

export default registerScreen(Name, Category, ScreenOptions);