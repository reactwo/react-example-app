import {
    postData,
    requestData,
} from "app/api/client";
import { parseResultList } from "app/api/parse";
import {
    parseBundleTicketType,
    parseBundleType,
} from "app/bus/api/bundle-type";
import { Bundle } from "app/bus/types";
import { ActivatedTicketBundle } from "app/bus/types/activated-bundle";
import { objKeysToCamelCase } from "app/utils";

export function parseBundle(raw: any) {
    raw = objKeysToCamelCase(raw);
    if (raw.subscription) {
        raw.subscriptionId = raw.subscription;
        delete raw.subscription;
    }
    if (raw.orderTime) {
        raw.orderTime = new Date(raw.orderTime);
    }
    raw.bundleType = parseBundleType(raw.bundleType);
    if (raw.bundleValidityStart) {
        raw.bundleValidityStart = new Date(raw.bundleValidityStart);
    }
    if (raw.bundleValidityEnd) {
        raw.bundleValidityEnd = new Date(raw.bundleValidityEnd);
    }
    return objKeysToCamelCase(raw) as Bundle;
}

export function parseActivatedBundleTicket(raw: any) {
    raw = objKeysToCamelCase(raw);

    if (raw.lastUpdated) {
        raw.lastUpdated = new Date(raw.lastUpdated);
    }
    if (raw.validFrom) {
        raw.validFrom = new Date(raw.validFrom);
    }
    if (raw.orderTime) {
        raw.orderTime = new Date(raw.orderTime);
    }
    if (raw.readTime) {
        raw.readTime = new Date(raw.readTime);
    }
    if (raw.deliveryTime) {
        raw.deliveryTime = new Date(raw.deliveryTime);
    }
    if (raw.ticketValidityEnd) {
        raw.ticketValidityEnd = new Date(raw.ticketValidityEnd);
    }
    if (raw.ticketValidityStart) {
        raw.ticketValidityStart = new Date(raw.ticketValidityStart);
    }

    raw.ticketType = parseBundleTicketType(raw.ticketType);
    return raw as ActivatedTicketBundle;
}

export function parseBundleList(raw: any[]) {
    return parseResultList(parseBundle, raw);
}

export async function requestBundleList() {
    const data = await requestData("/user/bus/bundles");
    return parseBundleList(data);
}

export async function requestBundle(id: number) {
    const data = await requestData(`/user/bus/bundles/${id}`);
    return parseBundle(data);
}
export interface OrderBundleOptions {
    subscriptionId: number;
    bundleTypeId: number;
    msisdn: string;
    acceptTermsAndConditions: boolean;
}

export async function orderBundle(options: OrderBundleOptions) {
    const data = await postData("/user/bus/bundles/order", {}, {
        accept_terms_and_conditions: options.acceptTermsAndConditions,
        bundle_type: options.bundleTypeId,
        msisdn: options.msisdn,
        subscription: options.subscriptionId,
    });
    return parseBundle(data);
}
