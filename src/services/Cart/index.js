import {createGet} from "@/services/utils";


export const useGetTopBuy = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'top_buy', 'product/findBySumTop', params, _callback);
}