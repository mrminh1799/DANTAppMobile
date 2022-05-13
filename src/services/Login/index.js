import {createGet, createPost} from "@/services/utils";

export const useLogin = (params, _callback, _onError) => async dispatch => {
    await createPost(dispatch, 'login', 'authenticate', params, _callback, _onError);
}
export const changePassword = (params, _callback, _onError) => async dispatch => {
    await createGet(dispatch, 'change_pass', 'test/changePassword/'+params.id + "/" + params.password, params, _callback, _onError);
}