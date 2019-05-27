import { createSelector } from "reselect";

import { getBusApiState } from "app/bus/selectors/api";
import { BusTicketActivity } from "app/bus/types";
import { isActive, isError, Ticket } from "app/bus/types/ticket";
import { BUS_TICKET_ACTIVITY } from "app/common/types";
import { State } from "app/modules";

/* Ticket */

export const getTicket = (state: State, id: number): null | Ticket => {
    const data = getBusApiState(state).ticket.data;
    return id in data ? data[id] : null;
};

export const getTicketError = (state: State, id: number): null | string => {
    const data = getBusApiState(state).ticket.requestTicket;
    return id in data ? data[id].error : null;
};

/* Ticket list */

export const isRequestingTicketList = (state: State): boolean =>
    getBusApiState(state).ticket.requestTicketList.requesting;

export const getTicketListError = (state: State): string | null =>
    getBusApiState(state).ticket.requestTicketList.error;

/* Activate Bundle ticket */
export const getActivatedTicket = (state: State): null | Ticket => {
    const id = getBusApiState(state).ticket.activateBundleTicket.id;
    return id !== null ? getTicket(state, id) : null;
};

export const getActivateBundleTicketError = (state: State): null | string =>
    getBusApiState(state).ticket.activateBundleTicket.api.error;

export const getActivatedBundleTicket = (state: State): null | Ticket => {
    return getActivatedTicket(state);
};

export const isActivatingBundleTicket = (state: State): boolean =>
    getBusApiState(state).ticket.activateBundleTicket.api.requesting;

/* Order ticket */

export const getOrderTicketError = (state: State): null | string =>
    getBusApiState(state).ticket.orderTicket.api.error;

export const getOrderedTicket = (state: State): null | Ticket => {
    const id = getBusApiState(state).ticket.orderTicket.id;
    return id !== null ? getTicket(state, id) : null;
};

export const isOrderingTicket = (state: State): boolean =>
    getBusApiState(state).ticket.orderTicket.api.requesting;

export const getTicketActivities = createSelector(
    (state: State) => getBusApiState(state).ticket.data,
    (data) => (
        Object.values(data)
        .filter((item) => !isError(item))
        .map((t) => {
            return {
                active: isActive(t),
                key: "BUS-" + t.id.toString(),
                ticket: t,
                timestamp: t.orderTime || new Date(),
                type: BUS_TICKET_ACTIVITY,
            } as BusTicketActivity;
        })
    ),
);
