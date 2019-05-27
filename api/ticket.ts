import { postData, requestData } from "app/api/client";
import { parseResultList } from "app/api/parse";
import { parseTicketType } from "app/bus/api/ticket-type";
import { Message, Ticket } from "app/bus/types";
import { objKeysToCamelCase } from "app/utils";

export function parseMessage(raw: any) {
    raw = objKeysToCamelCase(raw);
    raw.createdTime = new Date(raw.createdTime);
    if (raw.deliveryTime) {
        raw.deliveryTime = new Date(raw.deliveryTime);
    }
    return raw as Message;
}

export function parseTicket(raw: any) {
    raw = objKeysToCamelCase(raw);
    raw.messages = raw.messages.map(parseMessage);
    raw.ticketType = parseTicketType(raw.ticketType);

    raw.orderTime = new Date(raw.orderTime);
    if (raw.deliveryTime) {
        raw.deliveryTime = new Date(raw.deliveryTime);
    }
    if (raw.readTime) {
        raw.readTime = new Date(raw.readTime);
    }
    if (raw.ticketValidityStart) {
        raw.ticketValidityStart = new Date(raw.ticketValidityStart);
    }
    if (raw.ticketValidityEnd) {
        raw.ticketValidityEnd = new Date(raw.ticketValidityEnd);
    }
    return objKeysToCamelCase(raw) as Ticket;
}

export function parseTicketList(raw: any) {
    return parseResultList(parseTicket, raw);
}

export async function requestTicketList() {
    const data = await requestData("/user/bus/tickets");
    return parseTicketList(data);
}

export async function requestTicket(id: number) {
    const data = await requestData(`/user/bus/tickets/${id}`);
    return parseTicket(data);
}

export interface OrderTicketOptions {
    subscriptionId: number;
    ticketTypeId: number;
    msisdn: string;
    acceptTermsAndConditions: boolean;
}

export async function orderTicket(options: OrderTicketOptions) {
    const data = await postData("/user/bus/tickets/order", {}, {
        accept_terms_and_conditions: options.acceptTermsAndConditions,
        msisdn: options.msisdn,
        subscription: options.subscriptionId,
        ticket_type: options.ticketTypeId,
    });
    return parseTicket(data);
}

export async function requestActivateBundleTicket(id: number) {
    const data = await postData(`user/bus/bundles/${id}/order_ticket`);
    return parseTicket(data);
}

export async function markTicketDelivered(id: number) {
    const data = await postData(`/user/bus/tickets/${id}/mark_delivered`);
    return parseTicket(data);
}

export async function markTicketRead(id: number) {
    const data = await postData(`/user/bus/tickets/${id}/mark_read`);
    return parseTicket(data);
}
