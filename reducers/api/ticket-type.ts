import { combineReducers } from "redux";

import { LOGOUT } from "app/api/actions";
import { apiCallReducer, modelDataReducer } from "app/api/reducers";
import {
    GET_TICKET_TYPE_LIST,
    GetTicketTypeListAction,
    SET_TICKET_TYPE_LIST,
    SET_TICKET_TYPE_LIST_ERROR,
    SetTicketTypeListAction,
    SetTicketTypeListErrorAction,
} from "app/bus/actions/ticket-type";
import { TicketType } from "app/bus/types";

export default combineReducers({
    data: modelDataReducer<TicketType, SetTicketTypeListAction, any>(
        [SET_TICKET_TYPE_LIST],
        [],
        [LOGOUT],
    ),
    requestTicketTypeList: apiCallReducer<
        GetTicketTypeListAction,
        SetTicketTypeListAction,
        SetTicketTypeListErrorAction
    >(
        GET_TICKET_TYPE_LIST,
        SET_TICKET_TYPE_LIST,
        SET_TICKET_TYPE_LIST_ERROR,
    ),
});
