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

import { Ticket } from "app/bus/types";

/* GetTicketListAction */

export const GET_TICKET_LIST = "bus.GET_TICKET_LIST";
export type GET_TICKET_LIST = typeof GET_TICKET_LIST;

export interface GetTicketListAction extends Action<GET_TICKET_LIST> {}

export function getTicketList(): GetTicketListAction {
    return {
        type: GET_TICKET_LIST,
    };
}

/* SetTicketListAction */

export const SET_TICKET_LIST = "bus.SET_TICKET_LIST";
export type SET_TICKET_LIST = typeof SET_TICKET_LIST;

export interface SetTicketListAction
    extends SetResultListAction<Ticket, SET_TICKET_LIST> {}

export function setTicketList(
    ticketList: ResultList<Ticket>,
): SetTicketListAction {
    return {
        type: SET_TICKET_LIST,

        data: ticketList,
    };
}

/* SetTicketListErrorAction */

export const SET_TICKET_LIST_ERROR = "bus.SET_TICKET_LIST_ERROR";
export type SET_TICKET_LIST_ERROR = typeof SET_TICKET_LIST_ERROR;

export interface SetTicketListErrorAction
    extends SetErrorAction<SET_TICKET_LIST_ERROR> {}

export function setTicketListError(
    error: Error | ApiError,
): SetTicketListErrorAction {
    return {
        type: SET_TICKET_LIST_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        message: error.toString(),
    };
}

/* GetTicketAction */

export const GET_TICKET = "bus.GET_TICKET";
export type GET_TICKET = typeof GET_TICKET;

export interface GetTicketAction extends InstanceAction<GET_TICKET> {}

export function getTicket(
    id: number,
): GetTicketAction {
    return {
        type: GET_TICKET,

        id,
    };
}

/* SetTicketAction */

export const SET_TICKET = "bus.SET_TICKET";
export type SET_TICKET = typeof SET_TICKET;

export interface SetTicketAction
extends SetInstanceAction<Ticket, SET_TICKET> {}

export function setTicket(
    ticket: Ticket,
): SetTicketAction {
    return {
        type: SET_TICKET,

        data: ticket,
        id: ticket.id,
    };
}

/* SetTicketErrorAction */

export const SET_TICKET_ERROR = "bus.SET_TICKET_ERROR";
export type SET_TICKET_ERROR = typeof SET_TICKET_ERROR;

export interface SetTicketErrorAction
    extends SetInstanceErrorAction<SET_TICKET_ERROR> {}

export function setTicketError(
    id: number,
    error: Error | ApiError,
): SetTicketErrorAction {
    return {
        type: SET_TICKET_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        id,
        message: error.toString(),
    };
}

/* OrderTicketAction */

export const ORDER_TICKET = "bus.ORDER_TICKET";
export type ORDER_TICKET = typeof ORDER_TICKET;

export interface OrderTicketAction extends Action<ORDER_TICKET> {
    ticketTypeId: number;
    msisdn: string;
    acceptTermsAndConditions: boolean;
}

export function orderTicket(
    ticketTypeId: number,
    msisdn: string,
    acceptTermsAndConditions: boolean = false,
): OrderTicketAction {
    return {
        type: ORDER_TICKET,

        acceptTermsAndConditions,
        msisdn,
        ticketTypeId,
    };
}

/* SetOrderTicketSuccesfulAction */

export const SET_ORDER_TICKET_SUCCESFUL = "bus.SET_ORDER_TICKET_SUCCESFUL";
export type SET_ORDER_TICKET_SUCCESFUL = typeof SET_ORDER_TICKET_SUCCESFUL;

export interface SetOrderTicketSuccesfulAction
    extends SetInstanceAction<Ticket, SET_ORDER_TICKET_SUCCESFUL> {}

export function setOrderTicketSuccesful(
    ticket: Ticket,
): SetOrderTicketSuccesfulAction {
    return {
        type: SET_ORDER_TICKET_SUCCESFUL,

        data: ticket,
        id: ticket.id,
    };
}

/* SetOrderTicketErrorAction */

export const SET_ORDER_TICKET_ERROR = "bus.SET_ORDER_TICKET_ERROR";
type SET_ORDER_TICKET_ERROR = typeof SET_ORDER_TICKET_ERROR;

export interface SetOrderTicketErrorAction
    extends SetErrorAction<SET_ORDER_TICKET_ERROR> {}

export function setOrderTicketError(
    error: Error | ApiError,
): SetOrderTicketErrorAction {
    return {
        type: SET_ORDER_TICKET_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        message: error.toString(),
    };
}

/* Activate Bundle ticket */

export const ACTIVATE_BUNDLE_TICKET = "bus.ACTIVATE_BUNDLE_TICKET";
export type ACTIVATE_BUNDLE_TICKET = typeof ACTIVATE_BUNDLE_TICKET;

export interface ActivateBundleTicketAction extends Action<
    ACTIVATE_BUNDLE_TICKET
> {
    id: number;
}

export function activateBundleTicket(
    id: number,
): ActivateBundleTicketAction {
    return {
        type: ACTIVATE_BUNDLE_TICKET,

        id,
    };
}

/* Activate ticket success */

export const ACTIVATE_BUNDLE_TICKET_SUCCESS = "bus.ACTIVATE_BUNDLE_TICKET_SUCCESS";
export type ACTIVATE_BUNDLE_TICKET_SUCCESS = typeof ACTIVATE_BUNDLE_TICKET_SUCCESS;

export interface SetActivateBundleTicketSuccessAction extends SetInstanceAction<
    Ticket,
    ACTIVATE_BUNDLE_TICKET_SUCCESS
> {}

export function setActivateBundleTicketSuccess(
        activatedTicketBundle: Ticket,
): SetActivateBundleTicketSuccessAction {
    return {
        type: ACTIVATE_BUNDLE_TICKET_SUCCESS,

        data: activatedTicketBundle,
        id: activatedTicketBundle.id,
    };
}

/* Activate ticket error */

export const ACTIVATE_BUNDLE_TICKET_ERROR = "bus.ACTIVATE_BUNDLE_TICKET_ERROR";
export type ACTIVATE_BUNDLE_TICKET_ERROR = typeof ACTIVATE_BUNDLE_TICKET_ERROR;

export interface SetActivateBundleTicketErrorAction extends SetErrorAction<
    ACTIVATE_BUNDLE_TICKET_ERROR
> {}

export function setActivateBundleTicketError(
        error: Error | ApiError,
): SetActivateBundleTicketErrorAction {
    return {
            type: ACTIVATE_BUNDLE_TICKET_ERROR,

            code: error instanceof ApiError ? error.code : "Error",
            message: error.toString(),
    };
}

/* MarkTicketDeliveredAction */

export const MARK_TICKET_DELIVERED = "bus.MARK_TICKET_DELIVERED";
type MARK_TICKET_DELIVERED = typeof MARK_TICKET_DELIVERED;

export interface MarkTicketDeliveredAction
    extends InstanceAction<MARK_TICKET_DELIVERED> {}

export function markTicketDelivered(
    id: number,
): MarkTicketDeliveredAction {
    return {
        type: MARK_TICKET_DELIVERED,

        id,
    };
}

/* MarkTicketReadAction */

export const MARK_TICKET_READ = "bus.MARK_TICKET_READ";
type MARK_TICKET_READ = typeof MARK_TICKET_READ;

export interface MarkTicketReadAction
    extends InstanceAction<MARK_TICKET_READ> {}

export function markTicketRead(
    id: number,
): MarkTicketReadAction {
    return {
        type: MARK_TICKET_READ,

        id,
    };
}
