/*
 * State:
 *   data: id => Ticket
 *   requestTicket.error: id => code
 *   requestTicket.requesting: id => boolean
 *   requestTicketList.error: code | null
 *   requestTicketList.requesting: boolean
 *   orderTicket.data: number | null
 *   orderTicket.api.error: code | null
 *   orderTicket.api.requesting: boolean
 */

import { combineReducers } from "redux";

import {
    LOGOUT,
} from "app/api/actions";
import {
    apiCallReducer,
    modelApiCallReducer,
    modelDataReducer,
} from "app/api/reducers";
import {
    ACTIVATE_BUNDLE_TICKET,
    ACTIVATE_BUNDLE_TICKET_ERROR,
    ACTIVATE_BUNDLE_TICKET_SUCCESS,
    ActivateBundleTicketAction,
    GET_TICKET,
    GET_TICKET_LIST,
    GetTicketAction,
    GetTicketListAction,
    ORDER_TICKET,
    OrderTicketAction,
    SET_ORDER_TICKET_ERROR,
    SET_ORDER_TICKET_SUCCESFUL,
    SET_TICKET,
    SET_TICKET_ERROR,
    SET_TICKET_LIST,
    SET_TICKET_LIST_ERROR,
    SetActivateBundleTicketErrorAction,
    SetActivateBundleTicketSuccessAction,
    SetOrderTicketErrorAction,
    SetOrderTicketSuccesfulAction,
    SetTicketAction,
    SetTicketErrorAction,
    SetTicketListAction,
    SetTicketListErrorAction,
} from "app/bus/actions/ticket";
import { Ticket } from "app/bus/types";

export default combineReducers({
    data: modelDataReducer<
        Ticket,
        SetTicketListAction,
        SetTicketAction | SetOrderTicketSuccesfulAction | SetActivateBundleTicketSuccessAction
    >(
        [SET_TICKET_LIST],
        [SET_TICKET, SET_ORDER_TICKET_SUCCESFUL, ACTIVATE_BUNDLE_TICKET_SUCCESS],
        [LOGOUT],
    ),

    activateBundleTicket: combineReducers({
        api: apiCallReducer<
            ActivateBundleTicketAction,
            SetActivateBundleTicketSuccessAction,
            SetActivateBundleTicketErrorAction
        >(
            ACTIVATE_BUNDLE_TICKET,
            ACTIVATE_BUNDLE_TICKET_SUCCESS,
            ACTIVATE_BUNDLE_TICKET_ERROR,
        ),
        id: (
            state: number | null = null,
            action: ActivateBundleTicketAction | SetActivateBundleTicketSuccessAction,
        ) => {
            switch (action.type) {
                case ACTIVATE_BUNDLE_TICKET:
                    return null;
                case ACTIVATE_BUNDLE_TICKET_SUCCESS:
                    return action.id;
                default:
                    return state;
            }
        },
    }),

    orderTicket: combineReducers({
        api: apiCallReducer<
            OrderTicketAction,
            SetOrderTicketSuccesfulAction,
            SetOrderTicketErrorAction
        >(
            ORDER_TICKET,
            SET_ORDER_TICKET_SUCCESFUL,
            SET_ORDER_TICKET_ERROR,
        ),
        id: (
            state: number | null = null,
            action: OrderTicketAction | SetOrderTicketSuccesfulAction,
        ) => {
            switch (action.type) {
                case ORDER_TICKET:
                    return null;
                case SET_ORDER_TICKET_SUCCESFUL:
                    return action.id;
                default:
                    return state;
            }
        },
    }),

    requestTicket: modelApiCallReducer<
        GetTicketAction,
        SetTicketAction,
        SetTicketErrorAction
    >(
        GET_TICKET,
        SET_TICKET,
        SET_TICKET_ERROR,
    ),

    requestTicketList: apiCallReducer<
        GetTicketListAction,
        SetTicketListAction,
        SetTicketListErrorAction
    >(
        GET_TICKET_LIST,
        SET_TICKET_LIST,
        SET_TICKET_LIST_ERROR,
    ),
});
