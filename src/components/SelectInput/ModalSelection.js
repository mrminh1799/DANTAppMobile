import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Dimensions, Easing,
    Keyboard,
    KeyboardAvoidingView, Platform,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native'
import {Actionsheet, Box, Input, Modal, Pressable, ScrollView, Text} from 'native-base'
import Event from '../../utils/EventRegister'

import FormatText from "../FormatText/index";
import {Colors} from "@/styles/Colors";
import {useTranslation} from "react-i18next";

const ModalSelection = () => {
    const [isVisible, setVisible] = useState(false)
    const [state, setState] = useState({})
    const [textSearch, setTextSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const {width, height} = useWindowDimensions()
    const ref = useRef();
    const refAni = useRef(new Animated.Value(16)).current
    const {t, i18n} = useTranslation(['Common', 'HomePage'], {i18n});


    useEffect(() => {
        //Add event modal select
        Event.on("modalOpen", ({visible, data, onChange, value, search, isObject}) => {
            setVisible(visible)
            ref?.current?.snapTo(1)
            setSearchData(data?.lstData)
            setTextSearch('')
            setState({
                lstData: data?.lstData,
                labelKey: data?.labelKey,
                valueKey: data?.valueKey,
                onChange: onChange,
                value: value,
                isObject: isObject,
                headerName: data?.headerName ? data?.headerName : "Chọn",
                search: search ? search : ''
            })
        })
        return () => {
            //remove event modal select
            Event.off("modalOpen")
            setVisible(false)
        }
    }, []);

    const handleChange = (item) => {
        state.onChange(item)
        setVisible(!isVisible)
        ref?.current?.snapTo(0)
    }

    const handleChangeSearch = (text) => {
        let formatText = FormatText(text)
        let data = []
        if(state.isObject){
            data = state?.lstData?.filter(item => Object.keys(item).some(key => {
                return FormatText(String(item[key])).includes(formatText)
            }))
        }else{
            data = state?.lstData?.filter(item => FormatText(String(item).includes(formatText)))
        }
        setSearchData(data)
        setTextSearch(text)
    }

    function onKeyboardDidShow(e: KeyboardEvent) { // Remove type here if not using TypeScript
        Animated.timing(refAni, {
            toValue: e.endCoordinates.height,
            duration: 100,
        }).start()
    }

    function onKeyboardDidHide() {
        Animated.timing(refAni, {
            toValue: 0,
            duration: 100,
        }).start()
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    // eslint-disable-next-line react/prop-types
    const renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => handleChange(item)}>
                <Box borderBottomWidth={1} px={'16px'} borderColor={'#ededef'} flexDir={'row'}>
                    <Text
                        m={'14px'}
                        color={'black'}
                        fontSize={16}
                        lineHeight={18}
                    >
                        {state.isObject ? item[state.labelKey] : item}
                    </Text>
                </Box>
            </TouchableOpacity>
        )
    }

    const renderContent = () => {
        return <Pressable onPress={() => Keyboard.dismiss()}>
            <Actionsheet.Content bg={'white'}>
                <Box mt={'-4px'}>
                    <Actionsheet.Header pt={'4px'} pb={3} borderBottomWidth={1} borderColor={Colors.light.smoke}
                                        width={width}>
                        <Text textAlign={'center'} fontWeight={600} fontSize={16}
                              lineHeight={20}>Tuỳ chọn</Text>
                    </Actionsheet.Header>
                    <Modal.CloseButton top={0}/>
                </Box>
                <Animated.View style={{
                    width: width,
                    marginBottom: Platform.OS === 'ios' ? refAni : 0,
                    paddingTop: 10
                }}>
                    <Input
                        mx={'16px'}
                        p={'12px'}
                        rounded={12}
                        fontSize={14}
                        value={textSearch}
                        borderWidth={0}
                        onChangeText={(text) => handleChangeSearch(text)}
                        bg={'gray'}
                        placeholder={"Tìm kiếm"}
                    />
                    <Box style={styles.containerView} mt={'16px'}>
                        <ScrollView style={styles.list}>
                            {searchData && searchData?.map(item => renderItem(item))}
                        </ScrollView>
                    </Box>
                </Animated.View>
            </Actionsheet.Content>
        </Pressable>
    }

    return (
        <Actionsheet isOpen={isVisible} onClose={() => setVisible(false)}>
            {renderContent()}
        </Actionsheet>
    )
}


const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    containerView: {
        backgroundColor: 'white',
    },
    list: {
        flexGrow: 1,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // justifyContent: 'flex-start',
        maxHeight: height / 3.5,
        minHeight: 150,
    },
    touches: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        // shadowOffset: {width: 0, height: 2},
        // shadowColor: 'black',
        // shadowOpacity: 0.3,
        // elevation: 5,
        // shadowRadius: 6,
    },
    item: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        borderRadius: 10,
    }
})

export default ModalSelection
