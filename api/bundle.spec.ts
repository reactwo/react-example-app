import * as apiClient from "app/api/client";
import BundleReply from "app/bus/api/__mocks__/api_data/Bundle.json";
import BundleListReply from "app/bus/api/__mocks__/api_data/BundleList.json";
import * as api from "app/bus/api/bundle";
import {
    TicketStatus,
    ValidityUnit,
} from "app/bus/types";

const requestData = jest.spyOn(apiClient, "requestData");
const postData = jest.spyOn(apiClient, "postData");

const mockBundle = {
    bundleSerial: "CJJB300f",
    bundleType: {
        bundleTypeCode: "ML",
        bundleTypeName: "M-card10",
        expirationDate: null,
        id: 7530,
        lastUpdated: new Date("2018-02-08T12:39:33.767340Z"),
        operatorPhone: null,
        serviceId: 59,
        sku: "ML",
        tariff: 15.0,
        ticketCount: 10,
        ticketType: {
            id: 7531,
            lastUpdated: new Date("2018-02-08T12:39:33.771482Z"),
            operatorPhone: null,
            serviceId: 59,
            sku: "MLT60",
            ticketTypeId: "4010",
            ticketTypeName: "MLT60",
            type: "DE_LIJN",
            validFrom: new Date("2018-02-01T16:00:00Z"),
            validUntil: null,
            validityUnit: ValidityUnit.MINUTE,
            validityValue: 60,
            verboseName: "M-card10 ticket",
        },
        type: "DE_LIJN",
        validFrom: new Date("2018-02-01T16:00:00Z"),
        validUntil: null,
        validityUnit: "MONTH",
        validityValue: 12,
        vat: 6.0,
        verboseName: "M-card10",
    },
    bundleValidityEnd: new Date("2019-03-16T16:16:40Z"),
    bundleValidityStart: new Date("2018-03-16T16:16:40Z"),
    currency: "EUR",
    errorCode: null,
    errorDescription: null,
    id: 850,
    msisdn: "32499711950",
    orderTime: new Date("2018-03-16T16:16:39.221971Z"),
    priceExcl: 14.1509,
    priceIncl: 15.0,
    status: TicketStatus.ORDERED,
    subscriptionId: 125,
    ticketsLeft: 10,
    ticketsUsed: 0,
    vat: 6.0,
};

const mockBundleList = {
    count: 1,
    next: null,
    previous: null,
    results: [mockBundle],
};

describe("bundleApi", () => {
    beforeEach(() => {
        requestData.mockClear();
    });

    it("requests the bundles url", async () => {
        requestData.mockImplementation(async () => BundleListReply);
        await api.requestBundleList();
        expect(requestData).toBeCalledWith("/user/bus/bundles");
    });

    it("fetches bus bundles", async () => {
        requestData.mockImplementation(async () => BundleListReply);
        const data = await api.requestBundleList();
        expect(data).toEqual(mockBundleList);
    });

    it("requests the bus bundle url", async () => {
        requestData.mockImplementation(async () => BundleReply);
        await api.requestBundle(1);
        expect(requestData).toBeCalledWith("/user/bus/bundles/1");
    });

    it("requests a bus bundle", async () => {
        requestData.mockImplementation(async () => BundleReply);
        const data = await api.requestBundle(1);
        expect(data).toEqual(mockBundle);
    });

    it("requests the buy ticket bundle url and parameters", async () => {
        const bundleOptions = {
            acceptTermsAndConditions: true,
            bundleTypeId: 1,
            msisdn: "32471376935",
            subscriptionId: 1,
        };
        postData.mockImplementation(async () => BundleReply);
        await api.orderBundle(bundleOptions);
        expect(postData).toBeCalledWith(
            "/user/bus/bundles/order",
            {},
            {
                accept_terms_and_conditions: true,
                bundle_type: 1,
                msisdn: "32471376935",
                subscription: 1,
            });
    });

    it("buys a bus bundle", async () => {
        const bundleOptions = {
            acceptTermsAndConditions: true,
            bundleTypeId: 1,
            msisdn: "32471376935",
            subscriptionId: 1,
        };
        postData.mockImplementation(async () => BundleReply);
        const data = await api.orderBundle(bundleOptions);
        expect(data).toEqual(mockBundle);
    });
});
