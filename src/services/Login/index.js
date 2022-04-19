import {createPost} from "@/services/utils";

export const useLogin = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'login', 'authenticate', params, _callback);
}