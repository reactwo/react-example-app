import { combineEpics } from "redux-observable";

import bundleEpic from "./bundle";
import bundleTypeEpic from "./bundle-type";
import ticketEpic from "./ticket";
import ticketTypeEpic from "./ticket-type";

export default combineEpics(
    bundleEpic,
    bundleTypeEpic,
    ticketEpic,
    ticketTypeEpic,
);
