import { storiesOf } from "@storybook/react-native";
import React from "react";

import { Title } from "app/account/types";
import { INSUFFICIENT_CREDIT } from "app/api/errors";
import {
    BuyProductScreenProps,
    BuyProductScreenTranslated,
} from "app/bus/screens/BuyProductScreen";
import {
    ProductListScreen,
    ProductListScreenProps,
} from "app/bus/screens/ProductListScreen";
import BusTicketComponent from "app/bus/screens/ticket/BusTicketComponent";
import {
    BusTicketScreenProps,
    BusTicketScreenTranslated,
} from "app/bus/screens/ticket/BusTicketScreen";
import { ProductType, ValidityUnit } from "app/bus/types";
import { i18n } from "app/i18n";

import {
    TicketListItem,
    TicketListItemProps,
} from "app/bus/components/TicketListItem";

import { mockBundle } from "app/bus/api/__mocks__/api_data/bundle";
import { mockBundleType } from "app/bus/api/__mocks__/api_data/bundle-type";
import { orderedTicket, readTicket } from "app/bus/api/__mocks__/api_data/ticket";

const DefaultTicketListItemProps: TicketListItemProps = {
    detail: "test",
    i18n,
    isProductInfoShown: true,
    productSummary: "test",
    t: (key: any) => (key),
    tReady: false,
    type: "Price (incl 6% VAT)",
    verboseName: "test",
};

const ticket = readTicket;

const defaultBusTicketComponentProps = {
    ticket,
};
const user = {
    address: "Botermarkt 1",
    birthday: new Date(2018, 1, 28, 12, 30, 0, 0),
    country: "BE",
    email: "bert@example.test",
    firstName: "Bert",
    id: 1,
    language: "nl",
    lastName: "Bibber",
    login: "bert@example.test",
    phone: "+32474123456",
    postcode: "9000",
    title: Title.mr,
    token: "c67f179b190a4e0dbb2c7abaee0986d3",
    town: "Gent",
};

const defaultActivateBuyProductScreenprops: BuyProductScreenProps = {
    activateBundleTicket: () => null,
    bundle: mockBundle,
    bundleType: mockBundleType,
    componentId: "mobility-app.bus.BuyProductScreen",
    i18n,
    orderBundle: () => null,
    orderTicket: () => null,
    productType: ProductType.BUNDLE,
    setActiveTabVisible: () => null,
    t: (key: any) => (key),
    tReady: false,
    ticketType: ticket.ticketType,
    user,
};

const defaultBuyProductScreenprops: BuyProductScreenProps = {
    activateBundleTicket: () => null,
    bundle: mockBundle,
    bundleType: mockBundleType,
    componentId: "mobility-app.bus.BuyProductScreen",
    i18n,
    orderBundle: () => null,
    orderTicket: () => null,
    productType: ProductType.TICKET,
    setActiveTabVisible: () => null,
    t: (key: any) => (key),
    tReady: false,
    ticketType: ticket.ticketType,
    user,
};

const errorBuyProductScreenprops = {
    ...defaultBuyProductScreenprops,
    user: {
        ...user,
        phone: "1234",
    },
};

const product = {
    id: 53,
    lastUpdated: new Date(),
    operatorPhone: null,
    service: 6,
    sku: "MT60",
    tariff: 1.8,
    ticketTypeCode: "MT60",
    ticketTypeName: "MT60",
    type: "DE_LIJN",
    validFrom: new Date(),
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

const bundle = mockBundle;

const defaultProductListScreenProps: ProductListScreenProps = {
    bundle: [bundle],
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
    selectBundle: () => null ,
    selectBundleType: () => null,
    selectProductType: () => null,
    selectTicketType: () => null,
    t: (key: any) => key,
    tReady: true,
};

const defaultBusTicketScreenProps: BusTicketScreenProps = {
    componentId: "test",
    i18n,
    t: (key: any) => key,
    tReady: true,
    ticket,
    ticketError: null,
};

function loadStories(): void {
    storiesOf("Bus bundle", module)
        .add("Ticket type summary", () => (
            <TicketListItem {...DefaultTicketListItemProps} />
        ));

    storiesOf("BusTicketComponent", module)
        .add("Showing a 60 Minutes Ticket", () => (
            <BusTicketComponent {...defaultBusTicketComponentProps}/>
        ));

    storiesOf("BusTicketScreen", module)
        .add("Waiting for the ticket", () => (
            <BusTicketScreenTranslated
                {...defaultBusTicketScreenProps}
                ticket={null}
            />
        ))
        .add("Waiting until the ticket validated", () => (
            <BusTicketScreenTranslated
                {...defaultBusTicketScreenProps}
                ticket={orderedTicket}
            />
        ))
        .add("Showing a test ticket", () => (
            <BusTicketScreenTranslated {...defaultBusTicketScreenProps} />
        ))
        .add("Showing a credit error", () => (
            <BusTicketScreenTranslated
                {...defaultBusTicketScreenProps}
                ticket={null}
                ticketError={INSUFFICIENT_CREDIT}
            />
        ));

    storiesOf("ProductListScreen", module)
        .add("show default screen", () => (
            <ProductListScreen {...defaultProductListScreenProps} />
        ))
        .add("show empty list", () => {
            const props = {
                ...defaultProductListScreenProps,
                bundleTypesList: [],
                products: [],
            };
            return <ProductListScreen {...props} />;
        })
        .add("show loading screen", () => {
            const props = {
                ...defaultProductListScreenProps,
                isRequestingBundleTypeList: true,
                isRequestingProducts: true,
            };
            return <ProductListScreen {...props} />;
        })
        .add("show error screen", () => {
            const props = {
                ...defaultProductListScreenProps,
                productListError: "error",
            };
            return <ProductListScreen {...props} />;
        });

    storiesOf("BuyProductScreen", module)
        .add("For a 60 minutes ticket", () => (
            <BuyProductScreenTranslated {...defaultBuyProductScreenprops}/>
        ))
        .add("For activate ticket", () => (
            <BuyProductScreenTranslated {...defaultActivateBuyProductScreenprops}/>
        ))
        .add("For a 60 minutes ticket with an invalid phone number", () => (
            <BuyProductScreenTranslated {...errorBuyProductScreenprops}/>
        ));
}

export default loadStories;
