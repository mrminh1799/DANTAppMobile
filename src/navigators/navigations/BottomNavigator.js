/*Import Library*/
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/*Import component*/
import {registerScreen} from '../utils';
import {TabBar, TabBarIcon} from '../components';


/*Import routes*/
import CoopHome from '@/screens/Home';
import Settings from '@/screens/Settings';
import Cart from '@/screens/Cart';
import User from '@/screens/User';
import {tabBarRef} from "@/navigators/utils";
import {useAuth} from "@/contexts";
import {useTranslation} from "react-i18next";
import {Icon} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";


/*Create & init*/
const Tab = createBottomTabNavigator();

/*icons*/


const Name = 'Home';
const HomeParams = {};


const getTabBarVisible = (route) => {
    const params = route.params;
    if (params) {
        if (params.tabBarVisible === false) {
            return false;
        }
    }
    return false;
};
const Home = () => {
    const {t, i18n} = useTranslation(['HomePage', 'Settings'], {i18n});
    const {userInfo, setUserInfo} = useAuth()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                style: {paddingTop: 8},
            }}
            tabBar={(props) => <TabBar ref={tabBarRef} {...props} />}
        >
            <Tab.Screen
                {...CoopHome.screen}
                options={(route) => ({
                    tabBarVisible: getTabBarVisible(route),
                    tabBarLabel: `${t('Home', {ns: "HomePage"})}`,
                    tabBarIcon: (props) => (
                        <TabBarIcon {...props} source={require('@/assets/icons/Tabs/home.png')}/>
                    ),
                })}
            />
            {/*<Tab.Screen*/}
            {/*    {...Cart.screen}*/}
            {/*    options={{*/}
            {/*        tabBarLabel: `Giỏ hàng`,*/}
            {/*        tabBarIcon: (props) => (*/}
            {/*            <Icon as={<AntDesign name="shoppingcart"/>} color={props.color} size={5} mt={'18px'}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                {...User.screen}
                options={{
                    tabBarLabel: `Cá nhân`,
                    tabBarIcon: (props) => (
                        <Icon as={<Feather name={'user'}/>} color={props.color} size={5} mt={'18px'}/>
                    ),
                }}
            />
            {/*<Tab.Screen*/}
            {/*    {...Settings.screen}*/}
            {/*    options={{*/}
            {/*        onPress: () => toThongTinThueBao(),*/}
            {/*        tabBarLabel: `${t('account', {ns: "HomePage"})}`,*/}
            {/*        tabBarIcon: (props) => (*/}
            {/*            <TabBarIcon {...props} source={require('@/assets/icons/Tabs/account.png')}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                {...Settings.screen}
                options={(route) => ({
                    isMenu: true,
                    onPress: () => route.navigation.openDrawer(),
                    tabBarLabel: 'Menu',
                    tabBarIcon: (props) => (
                        <TabBarIcon {...props} source={require('@/assets/icons/icon-menu.png')}/>
                    ),
                })}
            />
        </Tab.Navigator>
    );
};

export default registerScreen(Name, Home, HomeParams);
