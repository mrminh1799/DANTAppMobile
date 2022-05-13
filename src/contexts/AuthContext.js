import React, {createContext, useContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import PropsType from 'prop-types';
import Storage from "@/utils/Storage";
import {COMMON, CONFIG} from "@/constants";
import {useGetAllBanners} from "@/services/Test";
import Keychain from "react-native-keychain";
import auth from "@react-native-firebase/auth";

const AuthContext = createContext(
    'useAuth should be used inside AuthProvider',
);

export const AuthProvider = ({children}) => {
    const loginWhenTokenNotExpired = async () => {
        if (!userInfo) {
            const userData = await Keychain.getGenericPassword();
            if (userData.password) {
                setUserInfo(JSON.parse(userData.password));
            }
        }
    }

    const [splash, setSplash] = useState(Platform.OS === 'android');
    const [userInfo, setUserInfo] = useState(null);
    const [boarding, setBoarding] = useState(true);

    useEffect(() => {
        loginWhenTokenNotExpired();
    }, [])

    // useEffect(() => {
    //     checkOnBoarding();
    // }, [dataBanner])

    const value = {
        splash,
        setSplash,
        userInfo,
        setUserInfo,
        boarding,
        setBoarding,
    };

    return <AuthContext.Provider {...{value, children}} />;
};

AuthProvider.propTypes = {
    children: PropsType.any,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === 'string') {
        throw new Error(context);
    }
    return context;
};
