import { createSelector } from "reselect";

import { getBusApiState } from "app/bus/selectors/api";
import { getBusState } from "app/bus/selectors/common";
import { BundleType } from "app/bus/types";
import { State } from "app/modules";

export const getBundleType = (state: State, id: number): BundleType =>
    getBusApiState(state).bundleType.data[id];

export const getBundleTypeList = createSelector(
    (state: State) => getBusApiState(state).bundleType.data,
    (data) => {
        return Object.entries(data).map(
            ([_, instance]) => instance,
        );
    },
);

export const isRequestingBundleType = (state: State): boolean =>
    getBusApiState(state).bundleType.requestBundleTypeList.requesting;

export const getBundleTypeError = (state: State): string | null =>
    getBusApiState(state).bundleType.requestBundleTypeList.error;

export const getSelectedBundleType = (state: State): BundleType | null => {
    const id = getBusState(state).selectedBundleType;
    if (id === null) {
        return null;
    } else {
        return getBundleType(state, id);
    }
};
