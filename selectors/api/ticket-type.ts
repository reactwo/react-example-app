import { createSelector } from "reselect";

import { getBusApiState } from "app/bus/selectors/api";
import { getBusState } from "app/bus/selectors/common";
import { TicketType } from "app/bus/types";
import { State } from "app/modules";

export const getTicketType = (state: State, id: number): TicketType =>
    getBusApiState(state).ticketType.data[id];

export const getTicketTypeList = createSelector(
    (state: State) => getBusApiState(state).ticketType.data,
    (data) => {
        return Object.entries(data).map(
            ([_, instance]) => instance,
        );
    },
);

export const isRequestingTicketType = (state: State): boolean =>
    getBusApiState(state).ticketType.requestTicketTypeList.requesting;

export const getTicketTypeError = (state: State): string | null =>
    getBusApiState(state).ticketType.requestTicketTypeList.error;

export const getSelectedTicketType = (state: State): TicketType | null => {
    const id = getBusState(state).selectedTicketType;
    if (id === null) {
        return null;
    } else {
        return getTicketType(state, id);
    }
};
