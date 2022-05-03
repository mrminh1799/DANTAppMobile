import {createGet} from "@/services/utils";

export const getOrder = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'order', 'Order/findByAcountId/' + params.id, params, _callback);
}
