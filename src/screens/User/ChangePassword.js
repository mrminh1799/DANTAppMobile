import React, {useState} from "react";
import {registerScreen} from "@/navigators/utils";
import {Box, Button, Input, Text} from "native-base";
import {Header} from "@/components";
import {Colors} from "@/styles/Colors";
import _ from "lodash";

const  Name= "ChangePassword"

const ScreenOptions = {
    headerShown: false,
};
const ChangePassword = () => {

    const [currentPass, setCurrentPass] = useState('')

    const onChangeCur = (text) => {
      setCurrentPass(text)
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
                <Button bg={Colors.light.redBase} isDisabled={_.isEmpty(currentPass)} _disabled={{
                    backgroundColor: Colors.light.mediumTint
                }}>
                    Tiếp tục
                </Button>
            </Box>
        </Box>
    )
}

export default registerScreen(Name, ChangePassword, ScreenOptions);
