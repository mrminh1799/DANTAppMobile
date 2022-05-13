import React, {useState} from "react";
import {navigate, registerScreen} from "@/navigators/utils";
import {Box, Button, Input, Text} from "native-base";
import {DialogBoxService, Header} from "@/components";
import {Colors} from "@/styles/Colors";
import _ from "lodash";
import {useLogin} from "@/services/Login";
import Storage from "@/utils/Storage";
import {useDispatch} from "react-redux";
import {useAuth} from "@/contexts";

const  Name= "ConfirmPass"

const ScreenOptions = {
    headerShown: false,
};
const ConfirmPass = () => {

    const [currentPass, setCurrentPass] = useState('')

    const dispatch = useDispatch()

    const {userInfo, setUserInfo} = useAuth()

    const onChangeCur = (text) => {
      setCurrentPass(text)
    }

    const handleCheckPass = () => {
        DialogBoxService.showLoading()
        dispatch(useLogin({
            username: userInfo.username,
            password: currentPass
        }, (res) => {
            navigate('ChangePass', {
                currentPass: currentPass
            })
            DialogBoxService.hideLoading()
        },(err)=>{
            if(err.statusCode === '401'){
                DialogBoxService.hideLoading()
                DialogBoxService.alert('Mật khẩu không chính xác')
            }
        }))
    }

    return(
        <Box flex={1} bg={'#eee'}>
            <Header title={'Xác nhận mật khẩu'} isBack/>
            <Box>
                <Text m={'10px'} fontSize={13} color={Colors.light.darkTint}>
                    Để đảm bảo tài khoản của bạn luôn an toàn, vui lòng nhập mật khẩu của bạn để tiếp tục.
                </Text>
                <Input type={'password'} value={currentPass} py={'13px'} onChangeText={onChangeCur} fontSize={14} fontWeight={300} color={'black'} bg={'white'} placeholder={'Mật khẩu hiện tại'}/>
            </Box>
            <Box mt={'10px'} px={'10px'}>
                <Button onPress={handleCheckPass} bg={Colors.light.redBase} isDisabled={_.isEmpty(currentPass)} _disabled={{
                    backgroundColor: Colors.light.mediumTint
                }}>
                    Tiếp tục
                </Button>
            </Box>
        </Box>
    )
}

export default registerScreen(Name, ConfirmPass, ScreenOptions);
