import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, HStack, Image, Text} from "native-base";
import {FlatList, Platform, RefreshControl, ScrollView, TouchableOpacity, useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
/*Import component*/
import {registerScreen, tabBarRef} from '@/navigators/utils';
import ItemAfterLogin from "@/screens/Home/ItemAfterLogin/index";
import PropTypes from "prop-types";
import ProductCard from "@/screens/Product/ProductCard";
import {useGetTopBuy, useGetTopTen} from "@/services/Product";
import {useDispatch, useSelector} from "react-redux";
import {Colors} from "@/styles/Colors";
import IconCNTTB from '../../assets/icons/iconSVG/cnttb.svg'
import {useGetCategoryNav} from "@/services/Category";


const Name = 'CoopHome';

const ScreenOptions = {
    headerTitle: 'CoopHome',
    headerShown: false,
};

const CoopHome = ({navigation}) => {
    const {width, height} = useWindowDimensions()
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation(['Footer', 'ServicePage', 'Settings'], {i18n});
    const [oldOffset, setOldOffset] = useState(null)
    //refresh api when scroll down
    const [refreshing, setRefreshing] = React.useState(false);
    const allProducts = useSelector(state => state.globalReducer.top_ten)
    const allProductsBuy = useSelector(state => state.globalReducer.top_buy)
    const categoryNav = useSelector(state => state.globalReducer.cate_nav)

    useEffect(() => {
        dispatch(useGetTopTen())
        dispatch(useGetTopBuy())
        dispatch(useGetCategoryNav())
    }, [])

    //callback when reload success
    const onRefresh = React.useCallback(() => {
        setRefreshing(false);
    }, []);

    //check thue bao blacklist


    const openDrawer = () => {
        tabBarRef.current.hideTabBar();
        navigation.openDrawer();
    }

    const renderOptions = useMemo(() => {
        return (
            <HStack style={{
                backgroundColor: 'white',
                marginBottom: 20,
                borderRadius: 8,
                marginRight: 10,
                marginLeft: 10,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 1,
            }} width={width - 20}>
                <ScrollView
                    contentContainerStyle={{
                        // flex: 1,
                        zIndex: 1000000,
                        justifyContent: "space-around",
                        paddingHorizontal: 20
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {
                        categoryNav?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[{marginBottom: 10, marginTop: 10}, index > 0 && {marginLeft: 20}]}
                                    key={index}
                                    onPress={item.navigate}>
                                    <Box w={(width - 40 - 80) / 4} flexDirection={'column'} alignItems={'center'}>
                                        <Box color={'white'}>
                                            <IconCNTTB width={50} height={50}/>
                                        </Box>
                                        <Text mt={11} fontWeight={'700'} textAlign={"center"}
                                              fontSize={12}>{item.nameCategory}</Text>
                                    </Box>
                                </TouchableOpacity>)
                        })
                    }
                </ScrollView>
            </HStack>
        )
    }, [categoryNav])

    return (
        <Box flex={1} pt={Platform.OS === "ios" ? 10 : 0} bg={Colors.dark.redBase}>
            <ItemAfterLogin
                openDrawer={openDrawer}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsHorizontalScrollIndicator={false}
            >
                <Box flex={1} bg={'white'}>
                    <Box mb={insets.bottom + 40}>
                        <Box p={'5px'} shadow={1} mb={3}>
                            <Image style={{height: 150, borderRadius: 8}}
                                   source={{uri: "https://lh4.googleusercontent.com/-qW3mCh8EuAg/YUNWrZEC8tI/AAAAAAAAAt0/zheiI52e8DIXUYI1ggoeiIHYRCekpMdCwCLcBGAsYHQ/s0/BANNER%2BWEB.11112.1.jpg"}}/>
                        </Box>
                        <Text textAlign={'center'} fontWeight={700} fontSize={16}>Danh mục</Text>
                        {renderOptions}
                        <Box>
                            <HStack justifyContent={'space-between'} mx={4} alignItems={'center'}>
                                <TouchableOpacity>
                                    <HStack alignItems={'center'}>
                                        <Text fontWeight={'900'} fontSize={17}
                                              lineHeight={28.13}>SẢN PHẨM YÊU THÍCH</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={allProducts}
                                renderItem={(item) => <ProductCard
                                    value={item}
                                />}
                                keyExtractor={(item, index) => index}/>
                        </Box>
                        <Box>
                            <HStack justifyContent={'space-between'} mx={4} alignItems={'center'}>
                                <TouchableOpacity>
                                    <HStack alignItems={'center'}>
                                        <Text fontWeight={'900'} fontSize={17}
                                              lineHeight={28.13}>SẢN PHẨM BÁN CHẠY</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={allProductsBuy}
                                renderItem={(item) => <ProductCard
                                    value={item}
                                />}
                                keyExtractor={(item, index) => index}/>
                        </Box>

                    </Box>
                </Box>

            </ScrollView>
        </Box>
    );
};
CoopHome.propTypes = {
    navigation: PropTypes.any
}
export default registerScreen(Name, CoopHome, ScreenOptions);
