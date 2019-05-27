import reducer from "app/bus/reducers";
import { State } from "app/modules";

export const getBusState = (state: State): ReturnType<typeof reducer> => state.bus;
