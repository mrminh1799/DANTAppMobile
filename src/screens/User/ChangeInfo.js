import React, {useEffect, useState} from "react";
import {goBack, navigatorRef, registerScreen} from "@/navigators/utils";
import {Box, Button, Input} from "native-base";
import {DialogBoxService, Header} from "@/components";
import {Colors} from "@/styles/Colors";
import {useDispatch} from "react-redux";
import {useAuth} from "@/contexts";
import {CommonActions} from "@react-navigation/core";
import {changeInformation} from "@/services/Order";

const Name = "ChangeInfo"

const ScreenOptions = {
    headerShown: false,
};
const ChangeInfo = ({route}) => {

    const {params} = route

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const dispatch = useDispatch()

    const {userInfo, setUserInfo} = useAuth()

    useEffect(()=>{
        if(userInfo){
            setFormData({
                name: userInfo?.fullname,
                phone: userInfo?.username,
                email: userInfo?.email
            })
        }
    },[userInfo])

    const onChangeCur = (text, type = 'name') => {
        setFormData({
            ...formData,
            [type]: text
        })
    }

    const handleChangePass = () => {
        if(!formData?.name){
            DialogBoxService.alert('Không được bỏ trống tên')
            return
        }
        if(!formData?.phone){
            DialogBoxService.alert('Không được bỏ trống số điện thoại')
            return
        }
        if(!formData?.email){
            DialogBoxService.alert('Không được bỏ trống emailß')
            return
        }
        dispatch(changeInformation({
            id: userInfo?.id,
            phoneNumber: formData?.phone,
            fullName: formData?.name,
            email: formData?.email,
            photo: "123wwwd"
        },()=>{
            DialogBoxService.alert('Cập nhật thông tin thành công',()=>{
                goBack()
            })
        }))
    }

    return (
        <Box flex={1} bg={'#eee'}>
            <Header title={'Cập nhật thông tin'} isBack backPress={() => navigatorRef.current.dispatch((routes) => {
                return CommonActions.reset({
                    ...routes,
                    index: 0,
                    routes: [routes?.routes?.[0]]
                })
            })}/>
            <Box m={'10px'} pt={'10px'}>
                <Input type={'text'} borderWidth={0} value={formData?.name} py={'13px'} onChangeText={onChangeCur}
                       fontSize={14} fontWeight={300} color={'black'} bg={'white'} placeholder={'Họ và tên'}/>

                <Input mt={'10px'} type={'text'} borderWidth={0} value={formData?.phone} py={'13px'}
                       onChangeText={(text) => onChangeCur(text, 'phone')} fontSize={14} fontWeight={300}
                       color={'black'} bg={'white'}
                       placeholder={'Số điện thoại'}/>
                <Input
                    mt={'10px'} type={'text'} value={formData?.email} borderWidth={0} py={'13px'}
                    onChangeText={(text) => onChangeCur(text, 'email')} fontSize={14} fontWeight={300} color={'black'}
                    bg={'white'} placeholder={'Email'}/>
            </Box>
            <Box mt={'10px'} px={'10px'}>
                <Button onPress={handleChangePass} bg={Colors.light.redBase}
                        isDisabled={!formData?.email || !formData?.phone || !formData?.name}>
                    Xác nhận
                </Button>
            </Box>
        </Box>
    )
}

export default registerScreen(Name, ChangeInfo, ScreenOptions);
