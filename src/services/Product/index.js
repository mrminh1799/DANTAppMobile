import {useQuery, useQueryClient, useMutation} from 'react-query';
import {_custom, _delete, _get, _post, _put} from '@/modules/api';
import {createGet} from "@/services/utils";

//lay tat ca sp
export const useGetAllProducts = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_all_product', params], () => _get('product/findByTop'));
    return {
        status, error, data, refetch
    }
}

export const useGetTopTen = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'top_ten', 'product/findByTop', params, _callback);
}

export const useGetTopBuy = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'top_buy', 'product/findBySumTop', params, _callback);
}

//lay chi tiet sp
export const useGetDetailProduct = (params) => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(['get_detail_product', params], () => _get('product/findById/' + params?.id),{enabled:false});
    return {
        status, error, data, refetch
    }
}
