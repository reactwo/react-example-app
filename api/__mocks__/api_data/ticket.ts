import { parseTicket } from "app/bus/api/ticket";
import ActivatedTicket from "./ActivatedTicket.json";
import ticketData from "./Ticket.json";

/* Ordered Ticket */
export const orderedTicket = parseTicket({
    ...ticketData,
    status: "ordered",
});

/* Processed ticket */
export const processedTicket = parseTicket({
    ...ticketData,
    status: "processed",
});

/* Delivered ticket */
export const deliveredTicket = parseTicket({
    ...ticketData,
    status: "delivered",
});

/* Read ticket */
export const readTicket = parseTicket({
    ...ticketData,
    status: "read",
});

/* Error ticket */
export const errorTicket = parseTicket({
    ...ticketData,
    status: "error",
});

/* Read Activated Ticket */
export const readActivatedTicket = parseTicket({
    ...ActivatedTicket,
});
