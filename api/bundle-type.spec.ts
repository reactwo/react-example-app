import * as apiClient from "app/api/client";
import BundleTypeListReply from "app/bus/api/__mocks__/api_data/BundleTypeList.json";
import * as api from "app/bus/api/bundle-type";
import { ValidityUnit } from "app/bus/types";

const requestData = jest.spyOn(apiClient, "requestData");

export const mockBundleTypeList = {
    count: 1,
    next: null,
    previous: null,
    results: [{
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
    }],
};

describe("bundleTypeApi", () => {
    beforeEach(() => {
        requestData.mockClear();
    });

    it("fetches bus bundle types", async () => {
        requestData.mockImplementation(async () => BundleTypeListReply);
        const data = await api.requestBundleTypeList();
        expect(data).toEqual(mockBundleTypeList);
    });
});
