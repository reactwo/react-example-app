import { Action } from "redux";

import { ApiError } from "app/api/errors";
import { ResultList, SetResultListAction } from "app/api/types";
import { BundleType } from "app/bus/types";

/* Action types */

export const GET_BUNDLE_TYPE_LIST = "bus.GET_BUNDLE_TYPE_LIST";
export const SELECT_BUNDLE_TYPE = "bus.SELECT_BUNDLE_TYPE";
export const SET_BUNDLE_TYPE_LIST = "bus.SET_BUNDLE_TYPE_LIST";
export const SET_BUNDLE_TYPE_LIST_ERROR = "bus.SET_BUNDLE_TYPE_LIST_ERROR";

type GET_BUNDLE_TYPE_LIST = typeof GET_BUNDLE_TYPE_LIST;
type SELECT_BUNDLE_TYPE = typeof SELECT_BUNDLE_TYPE;
type SET_BUNDLE_TYPE_LIST = typeof SET_BUNDLE_TYPE_LIST;
type SET_BUNDLE_TYPE_LIST_ERROR = typeof SET_BUNDLE_TYPE_LIST_ERROR;

/* Actions */

export interface GetBundleTypeListAction extends Action<
    GET_BUNDLE_TYPE_LIST
> {}

export interface SelectBundleTypeAction extends Action<SELECT_BUNDLE_TYPE> {
    id: number;
}

export interface SetBundleTypeListAction extends SetResultListAction<
    BundleType,
    SET_BUNDLE_TYPE_LIST
> {}

export interface SetBundleTypeListErrorAction extends Action<
    SET_BUNDLE_TYPE_LIST_ERROR
> {
    code: string;
    message: string;
}

/* Action Creators */

export function getBundleTypeList(): GetBundleTypeListAction {
    return {
        type: GET_BUNDLE_TYPE_LIST,
    };
}

export function selectBundleType(
    bundleType: BundleType,
): SelectBundleTypeAction {
    return {
        type: SELECT_BUNDLE_TYPE,

        id: bundleType.id,
    };
}

export function setBundleTypeList(
    ticketTypeList: ResultList<BundleType>,
): SetBundleTypeListAction {
    return {
        type: SET_BUNDLE_TYPE_LIST,

        data: ticketTypeList,
    };
}

export function setBundleTypeListError(
    error: Error | ApiError,
): SetBundleTypeListErrorAction {
    return {
        type: SET_BUNDLE_TYPE_LIST_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        message: error.toString(),
    };
}
