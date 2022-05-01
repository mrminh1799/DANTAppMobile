import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './BottomNavigator';
import {registerScreen} from '../utils';
import messaging from '@react-native-firebase/messaging';
import {useAuth} from '@/contexts';
import ProductDetail from "@/screens/Product/ProductDetail";
import Cart from "@/screens/Cart";
import User from "@/screens/User";
import ChangePassword from "@/screens/User/ChangePassword";


const HomeStack = createNativeStackNavigator();


const Name = 'HomeStack';
const HomeParams = {
    headerTitle: 'HomeStack',
    headerStyle: {backgroundColor: 'white'},
    headerShown: false,
};
const HomeNavigator = () => {
    const {userInfo} = useAuth();
    useEffect(() => {
        let topic = userInfo?.userData?.user?.userId.toString() ?? '';
        messaging().subscribeToTopic(topic);
        // subscribe theo userId
        return () => messaging().unsubscribeFromTopic(topic)
    }, []);
    return (
        <HomeStack.Navigator initialRouteName="Home"
                             screenOptions={{
                                 headerTitle: '',
                                 headerShown: false,

                             }}>
            <HomeStack.Screen {...Home.screen} />
            <HomeStack.Screen {...ProductDetail.screen} />
            <HomeStack.Screen {...Cart.screen} />
            <HomeStack.Screen {...User.screen} />
            <HomeStack.Screen {...ChangePassword.screen} />
        </HomeStack.Navigator>
    );
};


export default registerScreen(Name, HomeNavigator, HomeParams);
