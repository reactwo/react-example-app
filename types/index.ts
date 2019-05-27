import { Activity, BUS_BUNDLE_ACTIVITY, BUS_TICKET_ACTIVITY } from "app/common/types";
import { Bundle } from "./bundle";
import { Ticket } from "./ticket";

export { Bundle } from "./bundle";
export { BundleType, BundleTicketType } from "./bundle-type";
export { Message, Ticket } from "./ticket";
export { TicketType } from "./ticket-type";
export { MessageStatus, TicketStatus, ValidityUnit, ProductType, validityToText } from "./enums";

export interface BusTicketActivity extends Activity {
    type: BUS_TICKET_ACTIVITY;
    ticket: Ticket;
}

export interface BusBundleActivity extends Activity {
    type: BUS_BUNDLE_ACTIVITY;
    bundle: Bundle;
}
