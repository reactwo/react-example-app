import { parseTicketType } from "app/bus/api/ticket-type";

import ticketTypeData from "./TicketType.json";

/* mock Ticket Type */
export const mockTicketType = parseTicketType({
    ...ticketTypeData,
});

