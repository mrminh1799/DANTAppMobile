import React, {useEffect, useState} from 'react';
import {Box, Icon, Image, Text, useTheme} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Input} from '@/components';
import {registerScreen} from '@/navigators/utils';
import {Keyboard, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import {useTranslation} from "react-i18next";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Logo from '../../assets/icons/iconSVG/Untitled-1.svg'
import {useDispatch} from "react-redux";
import {useLogin} from "@/services/Login";
import Storage from "@/utils/Storage";
import {useAuth} from "@/contexts";

/*created init*/
const Name = 'Login';

const ScreenOptions = {
    headerTitle: 'Login',
    headerShown: false,
};

const Login = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch()
    const {setUserInfo} = useAuth()
    const {colors} = useTheme();
    const {t, i18n} = useTranslation(['Login'], {i18n});
    const {height} = useWindowDimensions();

    useEffect(() => {
        Storage.get('userData').then((res) => {
            if (res) {
                setUserInfo(res)
            }
        })
    }, [])

    const [inputValue, setInputValue] = useState({
        username: '',
        password: ''
    })

    const handleLoginWithPhone = () => {
        dispatch(useLogin(inputValue, (res) => {
            Storage.save('userData', res)
            setUserInfo(res)
        }))
    };

    const onChangeText = (value, type = 'username') => {
        console.log(type, value)
        setInputValue({
            ...inputValue,
            [type]: value
        })
    }

    const byPassLogin = () => {
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Box flex={1} bg={colors.background} style={{paddingBottom: insets.bottom}}>
                <Box
                    position={'relative'}
                    w={'100%'}
                    h={'auto'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    paddingTop={height > 750 ? 200 : '80px'}
                >
                    <Box
                        position={'absolute'}
                        right={0}
                        top={30}
                        cursor={'pointer'}
                        width={'auto'}
                        height={'auto'}
                        padding={5}>
                        <TouchableWithoutFeedback onPress={byPassLogin}>
                            <Image alt={'close'} style={{height: 20, width: 20}}
                                   source={require('../../assets/images/icon-close.png')}/>
                        </TouchableWithoutFeedback>
                    </Box>
                    <Box mb={'15px'}>
                        <Logo width={340} height={80}/>
                    </Box>
                    <Box alignItems={'center'} mb={5} mx={'28px'}>
                        <Input
                            mt={2}
                            mb={0}
                            value={inputValue.username}
                            InputLeftElement={
                                <Icon
                                    as={<Feather name="user"/>}
                                    size={5}
                                    ml="2"
                                    color={'black'}
                                />
                            }
                            onChangeText={(text) => onChangeText(text)}
                            name={'account'}
                            placeholder={'Tài khoản'}
                        />
                        <Input
                            type={'password'}
                            mt={2}
                            mb={0}
                            value={inputValue.password}
                            InputLeftElement={
                                <Icon
                                    as={<Feather name="lock"/>}
                                    size={5}
                                    ml="2"
                                    color={'black'}
                                />
                            }
                            onChangeText={(text) => onChangeText(text, 'password')}
                            name={'password'}
                            maxLength={11}
                            placeholder={'Mật khẩu'}
                        />
                    </Box>
                </Box>
                <Box mx={'24px'}>
                    <Button onPress={handleLoginWithPhone}
                            borderRadius={26}
                            paddingVertical={16}
                            _text={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
                            width={'100%'}
                            backgroundColor={colors.splash}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                            Đăng nhập
                        </Text>
                    </Button>
                </Box>
            </Box>
        </TouchableWithoutFeedback>
    );
};

export default registerScreen(Name, Login, ScreenOptions);
