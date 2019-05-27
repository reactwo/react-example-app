import { i18n } from "app/i18n";
export enum ValidityUnit {
    MINUTE = "MINUTE",
    HOUR = "HOUR",
    SECOND = "SECOND",
    DAY = "DAY",
    MONTH = "MONTH",
    YEAR = "YEAR",
}

export enum MessageStatus {
    NEW = "new",
    DELIVERED = "delivered",
}

export enum TicketStatus {
    ORDERED = "ordered",
    PROCESSED = "processed",
    DELIVERED = "delivered",
    READ = "read",
    ERROR = "error",
    REVOKED = "revoked",
}

export enum ProductType {
    TICKET = "Ticket",
    BUNDLE = "Bundle",
    BUNDLE_TYPE = "BundleType",
}

export const validityToText: { [index: string]: string; } = {
    [ValidityUnit.MINUTE]: i18n.t("minutes"),
    [ValidityUnit.DAY]: i18n.t("days"),
    [ValidityUnit.MONTH]: i18n.t("months"),
    [ValidityUnit.YEAR]: i18n.t("years"),
};
