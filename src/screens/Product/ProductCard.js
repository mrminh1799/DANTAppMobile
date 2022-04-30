import React from 'react';
import {Box, Button, HStack, Icon, Text} from "native-base";
import {useWindowDimensions} from "react-native";
import {navigate} from "@/navigators/utils";
import {useGetDetailProduct} from "@/services/Product";
import {Colors} from "@/styles/Colors";
import FastImageAnimated from "@/components/FastImageAnimated/FastImageAnimated";
import AntDesign from "react-native-vector-icons/AntDesign";

const ProductCard = ({value}) => {

    const {index, item} = value

    const {width, height} = useWindowDimensions()

    const getDetailProduct = useGetDetailProduct({
        id: item?.id,
    })


    const toDetailProduct = () => {
        getDetailProduct.refetch().then(res => {
            if (res) {
                navigate('ProductDetail', {
                    data: res
                })
            }
        })
    }

    return (
        <Button
            onPress={toDetailProduct}
            p={0}
            bg={'white'}
            rounded={4}
            ml={index === 0 ? '16px' : 0}
            mt={'0px'}
            mr={'16px'}
            mb={'26px'}
            style={{
                flex: 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 13,
                },
                shadowOpacity: 0.05,
                shadowRadius: 6.00,
                elevation: 8
            }}>
            <FastImageAnimated
                style={{
                    minHeight: height / 8.5,
                    minWidth: 156,
                    borderRadius: 4,
                    backgroundColor: !item?.image ? Colors.dark.lightShade : 'white',
                }}
                thumb={item?.image}/>
            <Box mt={1} mx={2}>
                <Text fontWeight={'700'} maxW={150} fontSize={14} lineHeight={16.41}
                      numberOfLines={2}>
                    {item?.name}
                </Text>
            </Box>
            <HStack mt={"4px"} alignItems={'center'} mb={2}>
                <Box ml={3}>
                    <Icon as={<AntDesign name="wallet"/>} size={'20px'}
                          color={Colors.light.redBase}/>
                </Box>
                <Box ml={2}>
                    <HStack alignItems={'center'}>
                        <Text color={'redBase'} fontWeight={'700'} fontSize={14}
                              ml={1}>{item?.price}đ</Text>
                    </HStack>
                </Box>

            </HStack>
        </Button>
    )
}
export default ProductCard
