const actual = jest.requireActual("app/bus/api/ticket-type");

import TicketTypeListReply from "./api_data/TicketTypeList.json";

export const parseTicketType = actual.parseTicketType;
export const parseTicketTypeList = actual.parseTicketTypeList;

export const createMockTicketTypeList = () =>
    parseTicketTypeList(TicketTypeListReply);
export const mockTicketTypeList = createMockTicketTypeList();
export const requestTicketTypeListMock = jest.fn(async () => mockTicketTypeList);

export const requestTicketTypeList = requestTicketTypeListMock;
