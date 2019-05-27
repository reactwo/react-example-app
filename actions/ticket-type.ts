import { Action } from "redux";

import { ApiError } from "app/api/errors";
import { ResultList, SetResultListAction } from "app/api/types";
import { TicketType } from "app/bus/types";

/* Action types */

export const GET_TICKET_TYPE_LIST = "bus.GET_TICKET_TYPE_LIST";
export const SELECT_TICKET_TYPE = "bus.SELECT_TICKET_TYPE";
export const SET_TICKET_TYPE_LIST = "bus.SET_TICKET_TYPE_LIST";
export const SET_TICKET_TYPE_LIST_ERROR = "bus.SET_TICKET_TYPE_LIST_ERROR";

type GET_TICKET_TYPE_LIST = typeof GET_TICKET_TYPE_LIST;
type SELECT_TICKET_TYPE = typeof SELECT_TICKET_TYPE;
type SET_TICKET_TYPE_LIST = typeof SET_TICKET_TYPE_LIST;
type SET_TICKET_TYPE_LIST_ERROR = typeof SET_TICKET_TYPE_LIST_ERROR;

/* Actions */

export interface GetTicketTypeListAction extends Action<
    GET_TICKET_TYPE_LIST
> {}

export interface SelectTicketTypeAction extends Action<SELECT_TICKET_TYPE> {
    id: number;
}

export interface SetTicketTypeListAction extends SetResultListAction<
    TicketType,
    SET_TICKET_TYPE_LIST
> {}

export interface SetTicketTypeListErrorAction extends Action<
    SET_TICKET_TYPE_LIST_ERROR
> {
    code: string;
    message: string;
}

/* Action Creators */

export function getTicketTypeList(): GetTicketTypeListAction {
    return {
        type: GET_TICKET_TYPE_LIST,
    };
}

export function selectTicketType(
    ticketType: TicketType,
): SelectTicketTypeAction {
    return {
        type: SELECT_TICKET_TYPE,

        id: ticketType.id,
    };
}

export function setTicketTypeList(
    ticketTypeList: ResultList<TicketType>,
): SetTicketTypeListAction {
    return {
        type: SET_TICKET_TYPE_LIST,

        data: ticketTypeList,
    };
}

export function setTicketTypeListError(
    error: Error | ApiError,
): SetTicketTypeListErrorAction {
    return {
        type: SET_TICKET_TYPE_LIST_ERROR,

        code: error instanceof ApiError ? error.code : "Error",
        message: error.toString(),
    };
}
