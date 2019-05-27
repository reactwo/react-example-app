import { delayResolve } from "app/utils/tests/api";

import { TicketStatus } from "app/bus/types";

import TicketList from "./api_data/TicketList.json";

const actual = jest.requireActual("app/bus/api/ticket");

export const parseTicket = actual.parseTicket;
export const parseTicketList = actual.parseTicketList;

/* Ticket List */
export const createMockTicketList = () => parseTicketList(TicketList);
export const mockTicketList = createMockTicketList();
export const requestTicketListMock = jest.fn(() => delayResolve(1000, mockTicketList));
export const requestTicketList = requestTicketListMock;

/* Ticket */
export const createMockTicket = () => parseTicket(TicketList.results[0]);
export const mockTicket = createMockTicket();

/* Ordered Ticket */
export const mockOrderedTicket = createMockTicket();
mockOrderedTicket.status = TicketStatus.ORDERED;

/* Processed ticket */
export const mockProcessedTicket = createMockTicket();
mockProcessedTicket.status = TicketStatus.PROCESSED;

/* Delivered ticket */
export const mockDeliveredTicket = createMockTicket();
mockDeliveredTicket.status = TicketStatus.DELIVERED;

/* Read ticket */
export const mockReadTicket = createMockTicket();
mockReadTicket.status = TicketStatus.READ;

/* Error ticket */
export const mockErrorTicket = createMockTicket();
mockErrorTicket.status = TicketStatus.ERROR;

/* Ticket API */
export const requestTicketMock = jest.fn(() => delayResolve(1000, mockTicket));
export const requestTicket = requestTicketMock;

export const orderTicketMock = jest.fn(() => delayResolve(1000, mockOrderedTicket));
export const orderTicket = orderTicketMock;

export const markTicketDeliveredMock = jest.fn(() => delayResolve(1000, mockDeliveredTicket));
export const markTicketDelivered = markTicketDeliveredMock;

export const markTicketReadMock = jest.fn(() => delayResolve(1000, mockReadTicket));
export const markTicketRead = markTicketReadMock;
