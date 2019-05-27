import { createSelector } from "reselect";

import { getBusApiState } from "app/bus/selectors/api";
import { getBusState } from "app/bus/selectors/common";
import { BusBundleActivity } from "app/bus/types";
import { Bundle, isActive, isError } from "app/bus/types/bundle";
import { BUS_BUNDLE_ACTIVITY } from "app/common/types";
import { State } from "app/modules";

/* Bundle */

export const getBundle = (state: State, id: number): null | Bundle => {
    const data = getBusApiState(state).bundle.data;
    return id in data ? data[id] : null;
};

export const getBundleError = (state: State, id: number): null | string => {
    const data = getBusApiState(state).bundle.requestBundle;
    return id in data ? data[id].error : null;
};

export const getActiveBundleList = createSelector(
    (state: State) => getBusApiState(state).bundle.data,
    (data) => {
        return Object.entries(data)
        .map(
            ([_, instance]) => instance,
        )
        .filter((item) => isActive(item));
    },
);

/* Bundle list */

export const isRequestingBundleList = (state: State): boolean =>
    getBusApiState(state).bundle.requestBundleList.requesting;

export const getBundleListError = (state: State): string | null =>
    getBusApiState(state).bundle.requestBundleList.error;

export const getSelectedBundle = (state: State): Bundle | null => {
        const id = getBusState(state).selectedBundle;
        if (id === null) {
            return null;
        } else {
            return getBundle(state, id);
        }
    };

/* Order Bundle */

export const getOrderBundleError = (state: State): null | string =>
    getBusApiState(state).bundle.orderBundle.api.error;

export const getOrderedBundle = (state: State): null | Bundle => {
    const id = getBusApiState(state).bundle.orderBundle.id;
    return id !== null ? getBundle(state, id) : null;
};

export const isOrderingBundle = (state: State): boolean =>
    getBusApiState(state).bundle.orderBundle.api.requesting;

export const getBundleActivities = createSelector(
    (state: State) => getBusApiState(state).bundle.data,
    (data) => (
        Object.values(data)
        .filter((item) => !isError(item))
        .map((b) => {
            return {
                active: isActive(b),
                bundle: b,
                key: "BUS-" + b.id.toString(),
                timestamp: b.orderTime || new Date(),
                type: BUS_BUNDLE_ACTIVITY,
            } as BusBundleActivity;
        })
    ),
);
