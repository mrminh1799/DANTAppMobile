import {apiCallErrorAction, beginCallApi, endCallApi} from "@/stores/common/actions/ApiCallAction";
import {_delete, _get, _post, _put} from "../modules/api/index";

export const createPost = async (dispatch, key, _url, _params, _callback = () => {
}, _onError = () => {
}) => {
    dispatch(beginCallApi(_url, _params))
    try {
        let response = await _post(_url, _params)
        dispatch(endCallApi(key, response)).then(()=>{
            _callback(response);
        })
    } catch (err) {
        _onError(err)
        dispatch(apiCallErrorAction(err))
    }
}

export const createGet = async (dispatch, key, _url, _params, _callback = () => {
}, _onError = () => {
}) => {
    dispatch(beginCallApi(_url, _params))
    try {
        let response = await _get(_url, _params)
        console.log('123',response)
        dispatch(endCallApi(key, response)).then(()=>{
            _callback(response);
        })
    } catch (err) {
        _onError(err)
        dispatch(apiCallErrorAction(err))
    }
}

export const createDelete = async (dispatch, key, _url, _params, _callback = () => {
}, _onError = () => {
}) => {
    dispatch(beginCallApi(_url, _params))
    try {
        let response = await _delete(_url, _params)
        console.log('123',response)
        dispatch(endCallApi(key, response)).then(()=>{
            _callback(response);
        })
    } catch (err) {
        _onError(err)
        dispatch(apiCallErrorAction(err))
    }
}

export const createPut = async (dispatch, key, _url, _params, _callback = () => {
}, _onError = () => {
}) => {
    dispatch(beginCallApi(_url, _params))
    try {
        let response = await _put(_url, _params)
        console.log('123',response)
        dispatch(endCallApi(key, response)).then(()=>{
            _callback(response);
        })
    } catch (err) {
        _onError(err)
        dispatch(apiCallErrorAction(err))
    }
}