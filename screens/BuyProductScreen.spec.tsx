import { mockUser } from "app/account/api/__mocks__/user";
import { readBundle } from "app/bus/api/__mocks__/api_data/bundle";
import { mockBundleType } from "app/bus/api/__mocks__/api_data/bundle-type";
import { mockTicket } from "app/bus/api/__mocks__/ticket";
import { ProductType } from "app/bus/types/enums";
import { i18n } from "app/i18n";
import React from "react";
import { Navigation } from "react-native-navigation";
import TestRenderer from "react-test-renderer";
import {
    BuyProductScreen,
    BuyProductScreenProps,
} from "./BuyProductScreen";

jest.mock("react-native-navigation");

const defaultActivateProps: BuyProductScreenProps = {
    activateBundleTicket: () => null,
    bundle: readBundle,
    bundleType: mockBundleType,
    componentId: "test",
    i18n,
    orderBundle: () => null,
    orderTicket: () => null,
    productType: ProductType.BUNDLE,
    setActiveTabVisible: () => null,
    t: (key: any) => key,
    tReady: true,
    ticketType: mockTicket.ticketType,
    user: mockUser,
};

const defaultBuyProps: BuyProductScreenProps = {
    activateBundleTicket: () => null,
    bundle: readBundle,
    bundleType: mockBundleType,
    componentId: "test",
    i18n,
    orderBundle: () => null,
    orderTicket: () => null,
    productType: ProductType.TICKET,
    setActiveTabVisible: () => null,
    t: (key: any) => key,
    tReady: true,
    ticketType: mockTicket.ticketType,
    user: mockUser,
};

describe("BuyProductScreen", () => {
    const renderScreen = (props: BuyProductScreenProps = defaultBuyProps) => {
        const rendered = TestRenderer.create(
            <BuyProductScreen {...props} />,
        );
        return rendered.root;
    };

    it("should call navigation.push when pressing a buyButton.", async () => {
        const testInstance = renderScreen(defaultBuyProps);
        // Wait for the navigation as it runs in a promise that we cannot
        // access.
        await testInstance.findByProps({testID: "mainButton"}).props.onPress();
        expect(Navigation.push).toHaveBeenCalledTimes(1);
    });

    it("should call orderTicket when pressing buyButton.", () => {
        const orderTicket = jest.fn();
        const newProps: BuyProductScreenProps = {
            ...defaultBuyProps,
            orderTicket,
        };
        const testInstance = renderScreen(newProps);
        testInstance.findByProps({testID: "mainButton"}).props.onPress();
        expect(orderTicket).toHaveBeenCalledTimes(1);
    });

    it("should call setActiveTabVisible when pressing a buyButton.", () => {
        const setActiveTabVisible = jest.fn();
        const testInstance = renderScreen({
            ...defaultBuyProps,
            setActiveTabVisible,
        });
        testInstance.findByProps({testID: "mainButton"}).props.onPress();
        expect(setActiveTabVisible).toHaveBeenCalledTimes(1);
    });
});

describe("ActivateProductScreen", () => {
    const renderScreen = (props: BuyProductScreenProps = defaultActivateProps) => {
        const rendered = TestRenderer.create(
            <BuyProductScreen {...props} />,
        );
        return rendered.root;
    };

    it("should call activateBundleTicket when pressing activate ticket button.", () => {
        const activateBundleTicket = jest.fn();
        const newProps: BuyProductScreenProps = {
            ...defaultActivateProps,
            activateBundleTicket,
        };
        const testInstance = renderScreen(newProps);
        testInstance.findByProps({testID: "activateTicket"}).props.onPress();
        expect(activateBundleTicket).toHaveBeenCalledTimes(1);
    });

    it("should call setActiveTabVisible when pressing a activate ticket button..", () => {
        const setActiveTabVisible = jest.fn();
        const testInstance = renderScreen({
            ...defaultBuyProps,
            setActiveTabVisible,
        });
        testInstance.findByProps({testID: "mainButton"}).props.onPress();
        expect(setActiveTabVisible).toHaveBeenCalledTimes(1);
    });
});
