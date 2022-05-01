import {createGet} from "@/services/utils";


export const useCart = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'cart', 'cart/findByIdAcount2/' + params.id, params, _callback);
}
export const getImage = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'image', 'productDetail/findImage/' + params.idProduct + '/' + params.idColor, params, _callback);
}