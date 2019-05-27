import * as apiClient from "app/api/client";
import ActivatedTicketReply from "app/bus/api/__mocks__/api_data/ActivatedTicket.json";
import { readActivatedTicket } from "app/bus/api/__mocks__/api_data/ticket";
import TicketReply from "app/bus/api/__mocks__/api_data/Ticket.json";
import TicketListReply from "app/bus/api/__mocks__/api_data/TicketList.json";
import * as api from "app/bus/api/ticket";
import { MessageStatus, TicketStatus, ValidityUnit } from "app/bus/types";

const requestData = jest.spyOn(apiClient, "requestData");
const postData = jest.spyOn(apiClient, "postData");

const ticketMessage = "01-M4 Geldig op alle voertuigen van De Lijn tot 16u40"
                       + " op 02/01/2019. Prijs: 1,50 euro"
                       + " 154054A02jn935M4x537764";

export const mockTicket = {
    bundleId: 5,
    bundleSerial: "cb4z300t",
    currency: "EUR",
    deliveryTime: new Date("2019-01-02T14:40:57.092841Z"),
    errorCode: null,
    errorDescription: null,
    id: 1,
    messages: [{
        createdTime: new Date("2019-01-02T14:40:56Z"),
        deliveryTime: null,
        id: 1,
        message: "BSQ32Z0I1J",
        messageType: "21",
        msgId: "BSQ32Z0I1J",
        originatingAddress: "488401",
        serviceRecord: 1,
        status: MessageStatus.DELIVERED,
    }],
    msisdn: "32471376935",
    orderTime: new Date("2019-01-02T14:40:54.133585Z"),
    priceExcl: 1.4151,
    priceIncl: 1.5,
    readTime: null,
    status: TicketStatus.DELIVERED,
    subscription: 1,
    ticketChecksum: "154054A02jn935M4x537764",
    ticketDaycode: "M4",
    ticketMessage,
    ticketMsgId: "BSQ32Z0I1J",
    ticketOriginatingAddress: "488401",
    ticketQuickChecksum: "01-M4",
    ticketSerial: "537764",
    ticketType: {
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
        vat: 6,
        verboseName: "M-ticket 60",
    },
    ticketValidityEnd: new Date("2019-01-02T15:40:56Z"),
    ticketValidityStart: new Date("2019-01-02T14:40:56Z"),
    vat: 6,
};

export const mockTicketList = {
    count: 1,
    next: null,
    previous: null,
    results: [mockTicket],
};

describe("ticketApi", () => {
    beforeEach(() => {
        requestData.mockClear();
    });

    it("requests the tickets url", async () => {
        requestData.mockImplementation(async () => TicketListReply);
        await api.requestTicketList();
        expect(requestData).toBeCalledWith("/user/bus/tickets");
    });

    it("fetches bus tickets", async () => {
        requestData.mockImplementation(async () => TicketListReply);
        const data = await api.requestTicketList();
        expect(data).toEqual(mockTicketList);
    });

    it("requests the bus ticket url", async () => {
        requestData.mockImplementation(async () => TicketReply);
        await api.requestTicket(1);
        expect(requestData).toBeCalledWith("/user/bus/tickets/1");
    });

    it("requests a bus ticket", async () => {
        requestData.mockImplementation(async () => TicketReply);
        const data = await api.requestTicket(1);
        expect(data).toEqual(mockTicket);
    });

    it("requests the buy ticket url and parameters", async () => {
        const ticketOptions = {
            acceptTermsAndConditions: true,
            msisdn: "32471376935",
            subscriptionId: 1,
            ticketTypeId: 1,
        };
        postData.mockImplementation(async () => TicketReply);
        await api.orderTicket(ticketOptions);
        expect(postData).toBeCalledWith(
            "/user/bus/tickets/order",
            {},
            {
                accept_terms_and_conditions: true,
                msisdn: "32471376935",
                subscription: 1,
                ticket_type: 1,
            });
    });

    it("buys a bus ticket", async () => {
        const ticketOptions = {
            acceptTermsAndConditions: true,
            msisdn: "32471376935",
            subscriptionId: 1,
            ticketTypeId: 1,
        };
        postData.mockImplementation(async () => TicketReply);
        const data = await api.orderTicket(ticketOptions);
        expect(data).toEqual(mockTicket);
    });

    it("activating bundle ticket", async () => {
        postData.mockImplementation(async () => ActivatedTicketReply);
        const data = await api.requestActivateBundleTicket(822);
        expect(data).toEqual(readActivatedTicket);
    });
});
