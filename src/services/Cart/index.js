import {createDelete, createGet, createPost} from "@/services/utils";


export const useCart = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'cart', 'cart/findByIdAcount2/' + params.id, params, _callback);
}
export const getImage = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'image', 'productDetail/findImage/' + params.idProduct + '/' + params.idColor, params, _callback);
}
export const addCart = (params, _callback) => async dispatch => {
    await createPost(dispatch, 'addToCart', 'cart/createForAcount/' + params.idAccount + "/" + params.idProductDetail + '/' + params.quantity, params, _callback);
}
export const updateCart = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'updateCart', 'cart/updateQuantity/' + params.idAccount + "/" + params.idProductDetail + '/' + params.quantity, params, _callback);
}
export const deleteCart = (params, _callback) => async dispatch => {
    await createDelete(dispatch, 'deleteCart', 'cart/deleteByidProduct/' + params.idAccount + "/" + params.idProductDetail, params, _callback);
}