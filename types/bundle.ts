import { ModelInstance } from "app/api/types";
import { BundleType } from "./bundle-type";
import { TicketStatus } from "./enums";
export { TicketStatus };

/* Models */
export interface Bundle extends ModelInstance {
    readonly subscriptionId: number;
    readonly msisdn: string;
    readonly errorCode: string | null;
    readonly errorDescription: string | null;
    readonly status: TicketStatus;
    readonly orderTime: Date;
    readonly bundleType: BundleType;
    readonly ticketsUsed: number;
    readonly ticketsLeft: number;
    readonly priceExcl: number;
    readonly priceIncl: number;
    readonly vat: number;
    readonly currency: string;
    readonly bundleValidityStart: Date | null;
    readonly bundleValidityEnd: Date | null;
    readonly bundleSerial: string;
}

/* Methods */

/**
 * Returns true if the bundle still has tickets.
 */
export const hasTickets = (bundle: Bundle) => {
    return bundle.ticketsLeft > 0;
};

/**
 * Returns true if the bundle has been ordered succesfully.
 */
export const isValidated = (bundle: Bundle) => {
    return bundle.status === TicketStatus.ORDERED;
};

/**
 * Returns true if the bundle has been ordered unsuccesfully.
 */
export const isError = (bundle: Bundle) => {
    return bundle.status === TicketStatus.ERROR;
};

/**
 * Returns true if the bundle is currently valid.
 */
export const isValid = (bundle: Bundle) => {
    return isValidated(bundle) && (
        bundle.bundleValidityEnd === null
        || new Date() < bundle.bundleValidityEnd
    );
};

/**
 * Returns true if the bundle is currently considered 'active'
 * (i.e. currently valid and has tickets).
 */
export const isActive = (bundle: Bundle) => {
    return isValid(bundle) && hasTickets(bundle);
};
