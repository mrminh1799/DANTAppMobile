import {createGet} from "@/services/utils";


export const useGetCategoryNav = (params, _callback) => async dispatch => {
    await createGet(dispatch, 'cate_nav', 'Category/getNavBar', params, _callback);
}