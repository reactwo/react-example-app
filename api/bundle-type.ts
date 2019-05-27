import { requestData } from "app/api/client";
import { parseResultList } from "app/api/parse";
import { BundleTicketType, BundleType } from "app/bus/types";
import { objKeysToCamelCase } from "app/utils";

export function parseBundleTicketType(raw: any) {
    raw = objKeysToCamelCase(raw);
    if (raw.lastUpdated) {
        raw.lastUpdated = new Date(raw.lastUpdated);
    }
    if (raw.validFrom) {
        raw.validFrom = new Date(raw.validFrom);
    }
    if (raw.validUntil) {
        raw.validUntil = new Date(raw.validUntil);
    }
    if (raw.service) {
        raw.serviceId = raw.service;
        delete raw.service;
    }
    return raw as BundleTicketType;
}

export function parseBundleType(raw: any) {
    raw = objKeysToCamelCase(raw);
    if (raw.lastUpdated) {
        raw.lastUpdated = new Date(raw.lastUpdated);
    }
    if (raw.validFrom) {
        raw.validFrom = new Date(raw.validFrom);
    }
    if (raw.validUntil) {
        raw.validUntil = new Date(raw.validUntil);
    }
    raw.ticketType = parseBundleTicketType(raw.ticketType);
    if (!raw.bundleTypeCode && raw.ticketType.bundleTypeCode) {
        raw.bundleTypeCode = raw.ticketType.bundleTypeCode;
        delete raw.ticketType.bundleTypeCode;
    }
    if (raw.service) {
        raw.serviceId = raw.service;
        delete raw.service;
    }
    return raw as BundleType;
}

export function parseBundleTypeList(raw: any[]) {
    return parseResultList(parseBundleType, raw);
}

export async function requestBundleTypeList() {
    return parseBundleTypeList(await requestData("/user/bus/bundletypes"));
}
