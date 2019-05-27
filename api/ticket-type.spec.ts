import * as apiClient from "app/api/client";
import TicketTypeListReply from "app/bus/api/__mocks__/api_data/TicketTypeList.json";
import * as api from "app/bus/api/ticket-type";
import { ValidityUnit } from "app/bus/types";

const requestData = jest.spyOn(apiClient, "requestData");

export const mockTicketTypeList = {
    count: 1,
    next: null,
    previous: null,
    results: [
        {
            id: 1,
            lastUpdated: new Date("2018-09-10T06:57:58.771097Z"),
            operatorPhone: null,
            service: 1,
            sku: "MT60",
            tariff: 1.8,
            ticketTypeCode: "MT60",
            ticketTypeName: "MT60",
            type: "DE_LIJN",
            validFrom: new Date("2018-09-05T13:00:00Z"),
            validUntil: null,
            validityMinutes: 60,
            validityUnit: ValidityUnit.MINUTE,
            validityValue: 60,
            vat: 6.0,
            verboseName: "M-ticket 60",
        },
    ],
};

describe("ticketTypeApi", () => {
    beforeEach(() => {
        requestData.mockClear();
    });

    it("fetches bus ticket types", async () => {
        requestData.mockImplementation(async () => TicketTypeListReply);
        const data = await api.requestTicketTypeList();
        expect(data).toEqual(mockTicketTypeList);
    });
});
