import { storiesOf } from "@storybook/react-native";
import React from "react";

import { Title } from "app/account/types";
import { INSUFFICIENT_CREDIT } from "app/api/errors";
import { readBundle } from "app/bus/api/__mocks__/api_data/bundle";
import { mockBundleType } from "app/bus/api/__mocks__/api_data/bundle-type";
import { readTicket } from "app/bus/api/__mocks__/api_data/ticket";
import {
    TicketListItem,
    TicketListItemProps,
} from "app/bus/components/TicketListItem";
import {
    BusBundleScreenProps,
    BusBundleScreenTranslated,
} from "app/bus/screens/bundle/BusBundleScreen";
import {
    BuyProductScreenProps,
    BuyProductScreenTranslated,
} from "app/bus/screens/BuyProductScreen";
import {
    ProductListScreen,
    ProductListScreenProps,
} from "app/bus/screens/ProductListScreen";
import { ValidityUnit } from "app/bus/types";
import { ProductType } from "app/bus/types";
import { i18n } from "app/i18n";
import BundleListItem, { BundleListItemProps } from "../components/BundleListItem";

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

const defaultProductListScreenProps: ProductListScreenProps = {
    bundle: [readBundle],
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

const defaultBuyProductScreenprops: BuyProductScreenProps = {
    activateBundleTicket: () => null,
    bundle: readBundle,
    bundleType: mockBundleType,
    componentId: "mobility-app.bus.BuyProductScreen",
    i18n,
    orderBundle: () => null,
    orderTicket: () => null,
    productType: ProductType.TICKET,
    setActiveTabVisible: () => null,
    t: (key: any) => key,
    tReady: true,
    ticketType: readTicket.ticketType,
    user,
};

const defaultActivateProductScreenprops: BuyProductScreenProps = {
    activateBundleTicket: () => null,
    bundle: readBundle,
    bundleType: mockBundleType,
    componentId: "mobility-app.bus.BuyProductScreen",
    orderBundle: () => null,
    orderTicket: () => null,
    productType: ProductType.BUNDLE,
    setActiveTabVisible: () => null,
    ticketType: null,
    user,

    i18n,
    t: (key: any) => (key),
    tReady: false,
};

const errorBuyProductScreenprops = {
    ...defaultBuyProductScreenprops,
    user: {
        ...user,
        phone: "1234",
    },
};

const defaultBusBundleScreenProps: BusBundleScreenProps = {
    isRequestingOrderBundle: true,
    orderBundleError: null,
    orderedBundle: null,

    componentId: "test",
    i18n,
    t: (key: any) => key,
    tReady: true,
};


const DefaultBundleListItemProps: BundleListItemProps = {
    bundle: readBundle,
    i18n,
    t: (key: any) => (key),
    tReady: false,
    type: "Amount Left",
};


function loadStories(): void {

    storiesOf("Bus purchased bundle", module)
        .add("Purchased bundle list summary", () => (
            <BundleListItem {...DefaultBundleListItemProps} />
        ));

    storiesOf("Bus bundle", module)
        .add("Bundle type summary", () => (
            <TicketListItem {...DefaultTicketListItemProps} />
        ));

    storiesOf("BusBundleScreen", module)
        .add("Waiting for the ticket", () => (
            <BusBundleScreenTranslated
                {...defaultBusBundleScreenProps}
                isRequestingOrderBundle={true}
            />
        ))
        .add("Showing a credit error", () => (
            <BusBundleScreenTranslated
                {...defaultBusBundleScreenProps}
                isRequestingOrderBundle={false}
                orderBundleError={INSUFFICIENT_CREDIT}
            />
        ));

    storiesOf("ProductListScreen", module)
        .add("show default bundle screen", () => (
            <ProductListScreen {...defaultProductListScreenProps} />
        ))
        .add("show empty bundle list", () => {
            const props = {
                ...defaultProductListScreenProps,
                bundle: [],
                bundleTypesList: [],
            };
            return <ProductListScreen {...props} />;
        })
        .add("show loading bundle screen", () => {
            const props = {
                ...defaultProductListScreenProps,
                isRequestingBundle: true,
                isRequestingBundleTypeList: true,
            };
            return <ProductListScreen {...props} />;
        })
        .add("show error bundle screen", () => {
            const props = {
                ...defaultProductListScreenProps,
                bundleListError: "error",
                bundleTypeListError: "error",
            };
            return <ProductListScreen {...props} />;
        });

    storiesOf("BuyProductScreen", module)
        .add("For a ticket Bundle", () => (
            <BuyProductScreenTranslated {...defaultBuyProductScreenprops}/>
        ))
        .add("For a ticket Bundle with an invalid phone number", () => (
            <BuyProductScreenTranslated {...errorBuyProductScreenprops}/>
        ))
        .add("For a activate ticket Bundle", () => (
            <BuyProductScreenTranslated {...defaultActivateProductScreenprops}/>
        ));
}

export default loadStories;
