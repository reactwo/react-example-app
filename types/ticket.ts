import { ModelInstance } from "app/api/types";

import { MessageStatus, TicketStatus } from "./enums";
import { TicketType } from "./ticket-type";

export { MessageStatus, TicketStatus };

/* Models */

export interface Message extends ModelInstance {
    readonly id: number;
    readonly serviceRecord: number;
    readonly status: MessageStatus;
    readonly createdTime: Date;
    readonly msgId: string;
    readonly message: string;
    readonly messageType: string;
    readonly originatingAddress: string;
    readonly deliveryTime: Date | null;
}

export interface Ticket extends ModelInstance {
    readonly subscription: number;
    readonly msisdn: string;
    readonly errorCode: string | null;
    readonly errorDescription: string | null;
    readonly status: TicketStatus;
    readonly orderTime: Date;
    readonly deliveryTime: Date | null;
    readonly readTime: Date | null;
    readonly priceExcl: number;
    readonly priceIncl: number;
    readonly vat: number;
    readonly currency: string;
    readonly ticketType: TicketType;
    readonly ticketMsgId: string;
    readonly ticketValidityStart: Date;
    readonly ticketValidityEnd: Date | null;
    readonly ticketMessage: string;
    readonly ticketSerial: string;
    readonly ticketChecksum: string;
    readonly ticketQuickChecksum: string;
    readonly ticketOriginatingAddress: string;
    readonly ticketDaycode: string;
    readonly bundleSerial: string;
    readonly bundleId: number;
    readonly messages: Message[];
}

/* Methods */

/**
 * Returns true if the ticket is still being ordered.
 */
export const isPending = (ticket: Ticket) => {
    switch (ticket.status) {
        case TicketStatus.ORDERED:
        case TicketStatus.PROCESSED:
            return true;
        default:
            return false;
    }
};

/**
 * Returns true if the ticket has been ordered succesfully.
 */
export const isValidated = (ticket: Ticket) => {
    switch (ticket.status) {
        case TicketStatus.DELIVERED:
        case TicketStatus.READ:
            return true;
        default:
            return false;
    }
};

/**
 * Returns true if the ticket is currently valid.
 */
export const isValid = (ticket: Ticket) => {
    return isValidated(ticket) && (
        ticket.ticketValidityEnd === null
        || new Date() < ticket.ticketValidityEnd
    );
};

/**
 * Returns true if the ticket has been ordered unsuccesfully.
 */
export const isError = (ticket: Ticket) => {
    switch (ticket.status) {
        case TicketStatus.ERROR:
            return true;
        default:
            return false;
    }
};

/**
 * Returns true if the ticket is currently considered 'active'
 * (i.e. currently valid or pending).
 */
export const isActive = (ticket: Ticket) => {
    return isValid(ticket) || isPending(ticket);
};
