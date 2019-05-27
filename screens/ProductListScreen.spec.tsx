import { mockBundle } from "app/bus/api/__mocks__/api_data/bundle";
import { ValidityUnit } from "app/bus/types/enums";
import { i18n } from "app/i18n";
import React from "react";
import { Navigation } from "react-native-navigation";
import TestRenderer from "react-test-renderer";
import {
    ProductListScreen,
    ProductListScreenProps,
} from "./ProductListScreen";

jest.mock("react-native-navigation");
const selectBundleType = jest.fn();
const selectTicketType = jest.fn();
const selectBundle = jest.fn();
const selectProductType = jest.fn();

const product = {
    id: 53,
    lastUpdated: new Date("2019-02-21T00:24:05.518Z"),
    operatorPhone: null,
    service: 6,
    sku: "MT60",
    tariff: 1.8,
    ticketTypeCode: "MT60",
    ticketTypeName: "MT60",
    type: "DE_LIJN",
    validFrom: new Date("2018-11-23T11:00:00.000Z"),
    validUntil: null,
    validityMinutes: 60,
    validityUnit: ValidityUnit.MINUTE,
    validityValue: 60,
    vat: 6,
    verboseName: "M-ticket 60",
};

const bundleType = {
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
    validityUnit: ValidityUnit.MONTH,
    validityValue: 12,
    vat: 6.0,
    verboseName: "M-card10",
};

const defaultProps: ProductListScreenProps = {
    bundle: [mockBundle],
    bundleListError: null,
    bundleTypeListError: null,
    bundleTypesList: [bundleType],
    componentId: "test",
    getBundleList: () => null,
    getBundleTypeList: () => null,
    getTicketTypeList: () => null,
    i18n,
    isRequestingBundle: false,
    isRequestingBundleTypeList: false,
    isRequestingProducts: false,
    productListError: null,
    products: [product],
    selectBundle,
    selectBundleType,
    selectProductType,
    selectTicketType,
    t: (key: any) => key,
    tReady: true,
};

describe("ProductListScreen", () => {

    beforeEach(() => {
        selectTicketType.mockClear();
        selectBundle.mockClear();
        selectProductType.mockClear();
        selectBundleType.mockClear();
    });

    const renderScreen = (props: any = defaultProps) => {
        const rendered = TestRenderer.create(
            <ProductListScreen {...props} />,
        );
        return rendered.root;
    };

    it("should call navigation.push when pressing a ticketType.", () => {
        const testInstance = renderScreen(defaultProps);
        testInstance.findByProps({testID: "Product"}).props.onPress();
        expect(Navigation.push).toHaveBeenCalledTimes(1);
    });

    it("should call selectTicketType when pressing a ticketType.", () => {
        const testInstance = renderScreen(defaultProps);
        testInstance.findByProps({testID: "Product"}).props.onPress();
        expect(selectTicketType).toHaveBeenCalledTimes(1);
    });

    it("should call selectProductType when pressing a ticketType.", () => {
        const testInstance = renderScreen(defaultProps);
        testInstance.findByProps({testID: "Product"}).props.onPress();
        expect(selectProductType).toHaveBeenCalledTimes(1);
    });

    it("should call selectBundleType when pressing a bundleType.", () => {
        const testInstance = renderScreen(defaultProps);
        testInstance.findByProps({testID: "BundleType"}).props.onPress();
        expect(selectBundleType).toHaveBeenCalledTimes(1);
    });

    it("should call selectProductType when pressing a bundleType.", () => {
        const testInstance = renderScreen(defaultProps);
        testInstance.findByProps({testID: "BundleType"}).props.onPress();
        expect(selectProductType).toHaveBeenCalledTimes(1);
    });

    it("should call selectBundle when pressing a Bundle.", () => {
        const testInstance = renderScreen(defaultProps);
        testInstance.findByProps({testID: "Bundle"}).props.onPress();
        expect(selectBundle).toHaveBeenCalledTimes(1);
    });

});
