import React, {useMemo, useRef, useState} from 'react';
import {Box, Icon, Pressable, ScrollView, Text} from "native-base";
import {goBack, navigate, registerScreen} from "@/navigators/utils";
import Swiper from "react-native-swiper";
import {TouchableOpacity, useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Colors} from "@/styles/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ShowProductDetail from "@/screens/Product/ShowProductDetail";

const Name = 'ProductDetail';

const ScreenOptions = {
    headerTitle: 'CoopHome',
    headerShown: false,
};
const ProductDetail = ({route}) => {
    const {params} = route
    const ref = useRef()
    const insets = useSafeAreaInsets();
    const {height, width} = useWindowDimensions();
    const [indexImage, setIndexImage] = useState(0)
    const [openChoose, setOpenChoose] = useState(false)
    const product = params?.data?.data

    function getUnique(array, key) {
        if(array.length <= 0) return array
        array = array.map(item => {
            return {
                ...item.size,
                ...item.color,
                ...item
            }
        })
        if (typeof key !== 'function') {
            const property = key;
            key = function (item) {
                return item[property];
            };
        }
        return Array.from(array.reduce(function (map, item) {
            const k = key(item);
            if (!map.has(k)) map.set(k, item);
            return map;
        }, new Map()).values());
    }

    let listImage = useMemo(() => getUnique(product?.listDetailProduct, 'colorName'), [product])
    useMemo(() => listImage.unshift(product), [listImage])

    const renderSwiper = () => {
        return <Box height={width / 300 * 400}>
            <Box zIndex={99} bottom={'10px'} right={'10px'} position={'absolute'} bg={Colors.light.lightTint}
                 px={'8px'} py={'2px'} rounded={'13'} opacity={0.7}>
                <Text fontSize={15}>{indexImage + 1}/{listImage?.length}</Text>
            </Box>
            {listImage[indexImage].colorName &&
            <Box zIndex={99} bottom={'10px'} left={'10px'} position={'absolute'} bg={'black'}
                 px={'8px'} py={'2px'} rounded={'13'} opacity={0.7}>
                <Text fontSize={15} color={'white'}>{listImage[indexImage].colorName}</Text>
            </Box>}
            <Swiper height={width / 300 * 400} horizontal loop={false} ref={ref}
                    onIndexChanged={(index) => setIndexImage(index)}>
                {
                    listImage?.map(item => {
                        return <Box>
                            <FastImageAnimated style={{
                                width: width,
                                height: width / 300 * 400,
                                borderRadius: 0,
                            }} thumb={item.image}/>
                        </Box>
                    })
                }
            </Swiper>
        </Box>
    }

    const renderChoose = () => {

        return <Pressable bg={'white'} px={'14px'} py={3} mb={4} onPress={() => setOpenChoose(true)}>
            <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontWeight={600}>Chọn loại hàng <Text fontWeight={400}
                                                            color={Colors.light.mediumShade}>({product?.listColor?.filter(item => item.isSelected).length} Màu
                    sắc, {product?.listSize?.filter(item => item.isSelected).length} Kích cỡ)</Text></Text>
                <Icon as={<MaterialIcons name="keyboard-arrow-right"/>} size={'25px'}/>
            </Box>
            <ScrollView mt={3} horizontal>
                {
                    listImage?.map((item, index) => {
                        return index > 0 && <Box>
                            <FastImageAnimated
                                style={{
                                    width: 50,
                                    height: 50 / 300 * 400,
                                    borderRadius: 0,
                                    borderWidth: 1,
                                    borderColor: Colors.light.lightShade,
                                    marginRight: 10
                                }} thumb={item.image}/>
                        </Box>
                    })
                }
            </ScrollView>
        </Pressable>
    }

    const x = () => {

    }

    return (
        <Box flex={1} mb={insets.bottom} bg={'#eeeeee'}>
            <Box mx={'10px'} style={{marginTop: insets.top}} position={'absolute'} zIndex={999} w={width - 20}
                 opacity={0.8} flexDir={'row'} justifyContent={'space-between'}>
                <TouchableOpacity style={{padding: 6, backgroundColor: 'gray', borderRadius: 100}}
                                  onPress={() => goBack()}>
                    <Icon as={<Ionicons name="arrow-back-outline"/>} size={'25px'} color={'white'}/>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 6, backgroundColor: 'gray', borderRadius: 100, marginLeft: 10}}
                                  onPress={() => navigate('Cart')}>
                    <Icon as={<AntDesign name="shoppingcart"/>} size={'25px'} color={'white'}/>
                </TouchableOpacity>
            </Box>
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                {renderSwiper()}
                <Box mb={4} py={3} px={'14px'} bg={'white'}>
                    <Text fontWeight={'500'} fontSize={19}>{product?.name.trim()}</Text>
                    <Text fontSize={18} mt={1} color={Colors.light.danger}>{product?.price}<Text fontSize={16}
                                                                                                 textDecorationLine={'underline'}>đ</Text></Text>
                </Box>
                {renderChoose()}
                <Box mb={4} bg={'white'} py={3}>
                    <Box px={'14px'} borderBottomWidth={1} borderBottomColor={Colors.light.lightShade}>
                        <Text pb={3} fontWeight={600}>Chi tiết sản phẩm</Text>
                    </Box>
                    <Text mx={'14px'} mt={3} fontWeight={300}>
                        {product.description}
                    </Text>
                </Box>
            </ScrollView>
            <ShowProductDetail product={product} listImage={listImage} openChoose={openChoose}
                               setOpenChoose={setOpenChoose}/>
            <Box flexDir={'row'}>
                <TouchableOpacity style={{flex: 1, paddingVertical: 13, backgroundColor: '#01BFA5'}}>
                    <Text textAlign={'center'} color={'white'}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, paddingVertical: 13, backgroundColor: Colors.light.danger}}>
                    <Text textAlign={'center'} color={'white'}>Mua ngay</Text>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}
export default registerScreen(Name, ProductDetail, ScreenOptions);
