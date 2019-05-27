import { Action } from "redux";

import { ApiError } from "app/api/errors";
import {
    InstanceAction,
    ResultList,
    SetErrorAction,
    SetInstanceAction,
    SetInstanceErrorAction,
    SetResultListAction,
} from "app/api/types";
import { Bundle } from "app/bus/types";

/* GetBundleListAction */

export const GET_BUNDLE_LIST = "bus.GET_BUNDLE_LIST";
export type GET_BUNDLE_LIST = typeof GET_BUNDLE_LIST;

export interface GetBundleListAction extends Action<
    GET_BUNDLE_LIST
> {}

export function getBundleList(): GetBundleListAction {
    return {
        type: GET_BUNDLE_LIST,
    };
}

/* SelectBundleAction */

export const SELECT_BUNDLE = "bus.SELECT_BUNDLE";
type SELECT_BUNDLE = typeof SELECT_BUNDLE;

export interface SelectBundleAction extends Action<
    SELECT_BUNDLE
> {
    id: number;
}

export function selectBundle(
    bundle: Bundle,
): SelectBundleAction {
    return {
        type: SELECT_BUNDLE,

        id: bundle.id,
    };
}

/* SetBundleListAction */

export const SET_BUNDLE_LIST = "bus.SET_BUNDLE_LIST";
export type SET_BUNDLE_LIST = typeof SET_BUNDLE_LIST;

export interface SetBundleListAction extends SetResultListAction<
    Bundle,
    SET_BUNDLE_LIST
> {}

export function setBundleList(
    bundleList: ResultList<Bundle>,
): SetBundleListAction {
    return {
        type: SET_BUNDLE_LIST,

        data: bundleList,
    };
}

/* SetBundleListErrorAction */

export const SET_BUNDLE_LIST_ERROR = "bus.SET_BUNDLE_LIST_ERROR";
export type SET_BUNDLE_LIST_ERROR = typeof SET_BUNDLE_LIST_ERROR;

export interface SetBundleListErrorAction extends SetErrorAction<
    SET_BUNDLE_LIST_ERROR
> {}

export function setBundleListError(
    error: Error | ApiError,
): SetBundleListErrorAction {
    return {
        type: SET_BUNDLE_LIST_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        message: error.toString(),
    };
}

/* GetBundleAction */

export const GET_BUNDLE = "bus.GET_BUNDLE";
export type GET_BUNDLE = typeof GET_BUNDLE;

export interface GetBundleAction extends InstanceAction<
    GET_BUNDLE
> {}

export function getBundle(
    id: number,
): GetBundleAction {
    return {
        type: GET_BUNDLE,

        id,
    };
}

/* SetBundleAction */

export const SET_BUNDLE = "bus.SET_BUNDLE";
export type SET_BUNDLE = typeof SET_BUNDLE;

export interface SetBundleAction extends SetInstanceAction<
    Bundle, SET_BUNDLE
> {}

export function setBundle(
    bundle: Bundle,
): SetBundleAction {
    return {
        type: SET_BUNDLE,

        data: bundle,
        id: bundle.id,
    };
}

/* SetBundleErrorAction */

export const SET_BUNDLE_ERROR = "bus.SET_BUNDLE_ERROR";
export type SET_BUNDLE_ERROR = typeof SET_BUNDLE_ERROR;

export interface SetBundleErrorAction extends SetInstanceErrorAction<
    SET_BUNDLE_ERROR
> {}

export function setBundleError(
    id: number,
    error: Error | ApiError,
): SetBundleErrorAction {
    return {
        type: SET_BUNDLE_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        id,
        message: error.toString(),
    };
}

/* OrderBundleAction */

export const ORDER_BUNDLE = "bus.ORDER_BUNDLE";
export type ORDER_BUNDLE = typeof ORDER_BUNDLE;

export interface OrderBundleAction extends Action<
    ORDER_BUNDLE
> {
    bundleTypeId: number;
    msisdn: string;
    acceptTermsAndConditions: boolean;
}

export function orderBundle(
    bundleTypeId: number,
    msisdn: string,
    acceptTermsAndConditions: boolean = false,
): OrderBundleAction {
    return {
        type: ORDER_BUNDLE,

        acceptTermsAndConditions,
        bundleTypeId,
        msisdn,
    };
}

/* SetOrderBundleSuccesfulAction */

export const SET_ORDER_BUNDLE_SUCCESFUL = "bus.SET_ORDER_BUNDLE_SUCCESFUL";
export type SET_ORDER_BUNDLE_SUCCESFUL = typeof SET_ORDER_BUNDLE_SUCCESFUL;
export interface SetOrderBundleSuccesfulAction extends SetInstanceAction<
    Bundle,
    SET_ORDER_BUNDLE_SUCCESFUL
> {}

export function setOrderBundleSuccesful(
    bundle: Bundle,
): SetOrderBundleSuccesfulAction {
    return {
        type: SET_ORDER_BUNDLE_SUCCESFUL,

        data: bundle,
        id: bundle.id,
    };
}

/* SetOrderBundleErrorAction */

export const SET_ORDER_BUNDLE_ERROR = "bus.SET_ORDER_BUNDLE_ERROR";
type SET_ORDER_BUNDLE_ERROR = typeof SET_ORDER_BUNDLE_ERROR;

export interface SetOrderBundleErrorAction extends SetErrorAction<
    SET_ORDER_BUNDLE_ERROR
> {}

export function setOrderBundleError(
    error: Error | ApiError,
): SetOrderBundleErrorAction {
    return {
        type: SET_ORDER_BUNDLE_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        message: error.toString(),
    };
}
