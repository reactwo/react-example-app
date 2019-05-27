import { getBusState } from "app/bus/selectors/common";
import { State } from "app/modules";

export const getBusApiState = (state: State) => getBusState(state).api;
