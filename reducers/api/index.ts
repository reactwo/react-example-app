import { combineReducers } from "redux";

import bundle from "app/bus/reducers/api/bundle";
import bundleType from "app/bus/reducers/api/bundle-type";
import ticket from "app/bus/reducers/api/ticket";
import ticketType from "app/bus/reducers/api/ticket-type";

export default combineReducers({
    bundle,
    bundleType,
    ticket,
    ticketType,
});
