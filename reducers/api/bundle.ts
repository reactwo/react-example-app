import { combineReducers } from "redux";

import { LOGOUT } from "app/api/actions";
import {
    apiCallReducer,
    modelApiCallReducer,
    modelDataReducer,
 } from "app/api/reducers";
import * as actions from "app/bus/actions/bundle";
import { Bundle } from "app/bus/types/bundle";

export default combineReducers({
    data: modelDataReducer<
        Bundle,
        actions.SetBundleListAction,
        actions.SetBundleAction | actions.SetOrderBundleSuccesfulAction
    >(
        [actions.SET_BUNDLE_LIST],
        [actions.SET_BUNDLE, actions.SET_ORDER_BUNDLE_SUCCESFUL],
        [LOGOUT],
    ),
    orderBundle: combineReducers({
        api: apiCallReducer<
            actions.OrderBundleAction,
            actions.SetOrderBundleSuccesfulAction,
            actions.SetOrderBundleErrorAction
        >(
            actions.ORDER_BUNDLE,
            actions.SET_ORDER_BUNDLE_SUCCESFUL,
            actions.SET_ORDER_BUNDLE_ERROR,
        ),
        id: (
            state: number | null = null,
            action: actions.OrderBundleAction | actions.SetOrderBundleSuccesfulAction,
        ) => {
            switch (action.type) {
                case actions.ORDER_BUNDLE:
                    return null;
                case actions.SET_ORDER_BUNDLE_SUCCESFUL:
                    return action.id;
                default:
                    return state;
            }
        },
    }),

    requestBundle: modelApiCallReducer<
        actions.GetBundleAction,
        actions.SetBundleAction,
        actions.SetBundleErrorAction
    >(
        actions.GET_BUNDLE,
        actions.SET_BUNDLE,
        actions.SET_BUNDLE_ERROR,
    ),

    requestBundleList: apiCallReducer<
        actions.GetBundleListAction,
        actions.SetBundleListAction,
        actions.SetBundleListErrorAction
    >(
        actions.GET_BUNDLE_LIST,
        actions.SET_BUNDLE_LIST,
        actions.SET_BUNDLE_LIST_ERROR,
    ),
});
