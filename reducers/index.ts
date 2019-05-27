import { combineReducers } from "redux";

import {
    SELECT_BUNDLE,
    SelectBundleAction,
} from "app/bus/actions/bundle";

import {
    SELECT_PRODUCT_TYPE,
    SelectProductTypeAction,
} from "app/bus/actions/product-type";

import {
    SELECT_BUNDLE_TYPE,
    SelectBundleTypeAction,
} from "app/bus/actions/bundle-type";

import {
    SELECT_TICKET_TYPE,
    SelectTicketTypeAction,
} from "app/bus/actions/ticket-type";

import api from "app/bus/reducers/api";

function selectedTicketType(
    state: number | null = null,
    action: (
        SelectTicketTypeAction
    ),
): number | null {
    switch (action.type) {
        case SELECT_TICKET_TYPE:
            return action.id;
        default:
            return state;
    }
}

function selectedBundle(
    state: number | null = null,
    action: (
        SelectBundleAction
    ),
): number | null {
    switch (action.type) {
        case SELECT_BUNDLE:
           return action.id;
        default:
            return state;
    }
}

function selectedBundleType(
    state: number | null = null,
    action: (
        SelectBundleTypeAction
    ),
): number | null {
    switch (action.type) {
        case SELECT_BUNDLE_TYPE:
            return action.id;
        default:
            return state;
    }
}

function selectedProductType(
    state: string | null = null,
    action: (
        SelectProductTypeAction
    ),
): string | null {
    switch (action.type) {
        case SELECT_PRODUCT_TYPE:
            return action.productType;
        default:
            return state;
    }
}

export default combineReducers({
    api,
    selectedBundle,
    selectedBundleType,
    selectedProductType,
    selectedTicketType,
});
