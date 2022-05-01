import React, {useState} from "react";
import {navigatorRef, push, registerScreen} from "@/navigators/utils";
import {Box, Button, Icon, Input, Text} from "native-base";
import {DialogBoxService, Header} from "@/components";
import {Colors} from "@/styles/Colors";
import _ from "lodash";
import {changePassword, useLogin} from "@/services/Login";
import Storage from "@/utils/Storage";
import {useDispatch} from "react-redux";
import {useAuth} from "@/contexts";
import {CommonActions} from "@react-navigation/core";
import AntDesign from "react-native-vector-icons/AntDesign";

const  Name= "ChangePass"

const ScreenOptions = {
    headerShown: false,
};
const ChangePass = ({route}) => {

    const {params} = route

    const [newPass, setNewPass] = useState({
        new: '',
        confirm: ''
    })

    const dispatch = useDispatch()

    const {userInfo, setUserInfo} = useAuth()

    const onChangeCur = (text, type = 'new') => {
        if(type === 'new'){
            setNewPass({
                ...newPass,
                new: text
            })
        }else{
            setNewPass({
                ...newPass,
                confirm: text
            })
        }
    }

    const handleChangePass = () => {
        console.log(params)
        if(params.currentPass === newPass.confirm){
            DialogBoxService.alert('Mật khẩu mới không được trùng với mật khẩu cũ')
            return
        }
        dispatch(changePassword({
            id: userInfo.id,
            password: newPass.confirm
        },()=>{
            DialogBoxService.alert('Đổi thành công', ()=>{
                navigatorRef.current.dispatch((routes)=>{
                    return CommonActions.reset({
                        ...routes,
                        index: 0,
                        routes: [routes?.routes?.[0]]
                    })
                })
            })
        }))
    }

    return(
        <Box flex={1} bg={'#eee'}>
            <Header title={'Thay đổi mật khẩu'} isBack backPress={()=>navigatorRef.current.dispatch((routes)=>{
                return CommonActions.reset({
                    ...routes,
                    index: 0,
                    routes: [routes?.routes?.[0]]
                })
            })}/>
            <Box m={'10px'} pt={'10px'}>
                <Text mb={'10px'} fontSize={13} color={Colors.light.darkTint}>
                    Nhập mật khẩu mới có độ dài từ 6-12 ký tự và không trùng với mật khẩu cũ
                </Text>
                <Input
                    rightElement={<Icon as={<AntDesign name="checkcircleo"/>}
                                        size={'20px'}
                                        color={(6 <= newPass.new.length && newPass.new.length <= 12) ? Colors.light.redBase : Colors.light.mediumTint} right={3}/>}
                    type={'password'} borderWidth={0} value={newPass.new} py={'13px'} onChangeText={onChangeCur} fontSize={14} fontWeight={300} color={'black'} bg={'white'} placeholder={'Mật khẩu mới'}/>
                <Input
                    rightElement={<Icon as={<AntDesign name="checkcircleo"/>}
                                            size={'20px'}
                                            color={(6 <= newPass.confirm.length && newPass.confirm.length <= 12 && newPass.confirm === newPass.new) ? Colors.light.redBase : Colors.light.mediumTint} right={3}/>}
                    mt={'10px'} type={'password'} value={newPass.confirm} borderWidth={0} py={'13px'} onChangeText={(text)=>onChangeCur(text,'cf')} fontSize={14} fontWeight={300} color={'black'} bg={'white'} placeholder={'Nhập lại mật khẩu mới'}/>
            </Box>
            <Box mt={'10px'} px={'10px'}>
                <Button onPress={handleChangePass} bg={Colors.light.redBase} isDisabled={!(6 <= newPass.confirm.length && newPass.confirm.length <= 12) || newPass.confirm !== newPass.new || !(6 <= newPass.new.length && newPass.new.length <= 12)} _disabled={{
                    backgroundColor: Colors.light.mediumTint
                }}>
                    Xác nhận
                </Button>
            </Box>
        </Box>
    )
}

export default registerScreen(Name, ChangePass, ScreenOptions);
