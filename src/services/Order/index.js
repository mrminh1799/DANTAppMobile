import {createGet, createPost} from "@/services/utils";

export const getOrder = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'order', 'Order/findByAcountId/' + params.id, params, _callback);
}
export const newOrder = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'newOrder', 'Order/newOrder', params, _callback);
}
export const changeInformation = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'changeInformation', 'test/updateAcount', params, _callback);
}