import {createPost} from "@/services/utils";

export const useLogin = (params, _callback, _onError) => async dispatch => {
    await createPost(dispatch, 'login', 'authenticate', params, _callback, _onError);
}