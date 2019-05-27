import { combineEpics, Epic, ofType } from "redux-observable";
import { REHYDRATE } from "redux-persist";
import { empty, from, of, throwError, timer } from "rxjs";
import {
    exhaustMap,
    filter,
    map,
    mapTo,
    mergeMap,
    switchMap,
    withLatestFrom,
} from "rxjs/operators";

import { getCustomerUserInfo } from "app/account/actions/customer-user-info";
import { NoActiveSubscriptionsError } from "app/account/errors";
import { getActiveSubscription } from "app/account/selectors/subscription";
import { ApiError } from "app/api/errors";
import { apiRequest } from "app/api/rxjs";

import { LOGIN_SUCCESFUL } from "app/api/actions";
import {
    SetInstanceAction,
    SetResultListAction,
} from "app/api/types";
import {
    GET_TICKET,
    GET_TICKET_LIST,
    MARK_TICKET_DELIVERED,
    MARK_TICKET_READ,
    MarkTicketDeliveredAction,
    MarkTicketReadAction,
    ORDER_TICKET,
    OrderTicketAction,
    SET_ORDER_TICKET_SUCCESFUL,
    SET_TICKET,
    SET_TICKET_LIST,
    setOrderTicketError,
    setOrderTicketSuccesful,
    setTicket,
    setTicketError,
    setTicketList,
    setTicketListError,
} from "app/bus/actions/ticket";
import * as actions from "app/bus/actions/ticket";
import {
    markTicketDelivered,
    markTicketRead,
    orderTicket,
    requestActivateBundleTicket,
    requestTicket,
    requestTicketList,
} from "app/bus/api/ticket";
import { Ticket, TicketStatus } from "app/bus/types";
import { State } from "app/modules";
import { isNotNull } from "app/utils";
import { handleError, logError } from "app/utils/rxjs";

export const ticketListEpic: Epic = (action$) =>
    action$.pipe(
        ofType(GET_TICKET_LIST, LOGIN_SUCCESFUL, REHYDRATE),
        switchMap(() =>
            apiRequest(requestTicketList)
            .pipe(
                map(setTicketList),
                handleError(ApiError, setTicketListError),
                logError(),
            ),
        ),
    );

export const ticketEpic: Epic = (action$) =>
    action$.pipe(
        ofType(GET_TICKET),
        mergeMap((action) =>
            apiRequest(() => requestTicket(action.id))
            .pipe(
                map(setTicket),
                handleError(ApiError,
                            (error) => setTicketError(action.id, error)),
                logError(),
            ),
        ),
    );

function tryOrderTicket(action: OrderTicketAction, state: State) {
    const subscription = getActiveSubscription(state);
    if (subscription === null) {
        return throwError(new NoActiveSubscriptionsError());
    } else {
        return apiRequest(
            () => orderTicket({
                acceptTermsAndConditions: action.acceptTermsAndConditions,
                msisdn: action.msisdn,
                subscriptionId: subscription.id,
                ticketTypeId: action.ticketTypeId,
            }),
            {retryAttempts: 3},
        );
    }
}

export const orderTicketEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType<OrderTicketAction>(ORDER_TICKET),
        withLatestFrom(state$),
        exhaustMap(([action, state]) =>
            tryOrderTicket(action, state).pipe(
                mergeMap((ticket) =>
                    [setOrderTicketSuccesful(ticket), getCustomerUserInfo()],
                ),
                handleError(ApiError, setOrderTicketError),
                logError(),
            ),
        ),
    );

export const activateBundleTicketEpic: Epic = (action$) =>
    action$.pipe(
        ofType(actions.ACTIVATE_BUNDLE_TICKET),
        mergeMap((action) =>
            apiRequest(() => requestActivateBundleTicket( action.id ))
            .pipe(
                    map(actions.setActivateBundleTicketSuccess ),
                    handleError(ApiError, actions.setActivateBundleTicketError),
            ),
        ),
    );

export const markTicketDeliveredEpic: Epic = (action$) =>
    action$.pipe(
        ofType<MarkTicketDeliveredAction>(MARK_TICKET_DELIVERED),
        mergeMap((action) =>
            apiRequest(() => markTicketDelivered(action.id))
            .pipe(
                map(setTicket),
                handleError(ApiError, () => null),
                filter(isNotNull),
                logError(),
            ),
        ),
    );

export const markTicketReadEpic: Epic = (action$) =>
    action$.pipe(
        ofType<MarkTicketReadAction>(MARK_TICKET_READ),
        mergeMap((action) =>
            apiRequest(() => markTicketRead(action.id))
            .pipe(
                map(setTicket),
                handleError(ApiError, () => null),
                filter(isNotNull),
                logError(),
            ),
        ),
    );

function processTicket(ticket: Ticket) {
    switch (ticket.status) {
        case TicketStatus.ORDERED:
            return timer(2000).pipe(
                mapTo(actions.getTicket(ticket.id)),
            );
        case TicketStatus.PROCESSED:
            return of(actions.markTicketDelivered(ticket.id));
        case TicketStatus.DELIVERED:
            return of(actions.markTicketRead(ticket.id));
        default:
            return empty();
    }
}

export const processTicketEpic: Epic = (action$) =>
    action$.pipe(
        ofType<SetInstanceAction<Ticket>>(
            SET_TICKET, SET_ORDER_TICKET_SUCCESFUL, actions.ACTIVATE_BUNDLE_TICKET_SUCCESS,
        ),
        mergeMap((action) => processTicket(action.data)),
    );

export const processTicketListEpic: Epic = (action$) =>
    action$.pipe(
        ofType<SetResultListAction<Ticket>>(
            SET_TICKET_LIST,
        ),
        mergeMap((action) => from(action.data.results)),
        mergeMap(processTicket),
    );

export default combineEpics(
    activateBundleTicketEpic,
    ticketListEpic,
    ticketEpic,
    orderTicketEpic,
    processTicketEpic,
    processTicketListEpic,
    markTicketDeliveredEpic,
    markTicketReadEpic,
);
