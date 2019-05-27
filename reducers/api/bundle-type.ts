import { combineReducers } from "redux";

import { LOGOUT } from "app/api/actions";
import { apiCallReducer, modelDataReducer } from "app/api/reducers";
import {
    GET_BUNDLE_TYPE_LIST,
    GetBundleTypeListAction,
    SET_BUNDLE_TYPE_LIST,
    SET_BUNDLE_TYPE_LIST_ERROR,
    SetBundleTypeListAction,
    SetBundleTypeListErrorAction,
} from "app/bus/actions/bundle-type";
import { BundleType } from "app/bus/types";

export default combineReducers({
    data: modelDataReducer<BundleType, SetBundleTypeListAction, any>(
        [SET_BUNDLE_TYPE_LIST],
        [],
        [LOGOUT],
    ),
    requestBundleTypeList: apiCallReducer<
        GetBundleTypeListAction,
        SetBundleTypeListAction,
        SetBundleTypeListErrorAction
    >(
        GET_BUNDLE_TYPE_LIST,
        SET_BUNDLE_TYPE_LIST,
        SET_BUNDLE_TYPE_LIST_ERROR,
    ),
});
