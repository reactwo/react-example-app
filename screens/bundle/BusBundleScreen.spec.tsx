import React from "react";
import { Navigation } from "react-native-navigation";
import TestRenderer from "react-test-renderer";

import { i18n } from "app/i18n";
import DefaultLoadingComponent from "app/ui/DefaultLoadingComponent";
import PurchaseErrorScreen from "app/ui/PurchaseErrorScreen";

import { BusBundleScreen, BusBundleScreenProps } from "./BusBundleScreen";

jest.mock("react-native-navigation");

// @ts-ignore TS2339 TODO: mock this whole class
Navigation.events = jest.fn(() => {
    return {
        bindComponent: jest.fn(),
    };
});

const defaultProps: BusBundleScreenProps = {
    componentId: "test",
    i18n,
    t: (key: any) => key,
    tReady: true,

    isRequestingOrderBundle: true,
    orderBundleError: null,
    orderedBundle: null,
};

describe("BusBundleScreen", () => {
    const screens: TestRenderer.ReactTestRenderer[] = [];

    const createScreen = (props: BusBundleScreenProps = defaultProps) => {
        const rendered = TestRenderer.create(
            <BusBundleScreen {...props} />,
        );
        screens.push(rendered);
        return rendered;
    };

    afterEach(() => {
        // Destroy the screen timers
        screens.forEach((screen) => {
            screen.unmount();
        });
        screens.splice(0);
    });

    it("should be loading when isRequestingOrderBundle is set to true.", () => {
        const root = createScreen(defaultProps).root;

        expect(root.findAllByType(DefaultLoadingComponent)).toHaveLength(1);
        expect(root.findAllByType(PurchaseErrorScreen)).toHaveLength(0);
    });

    it("should be display error when orderBundleError is not null.", () => {
        const root = createScreen({
            ...defaultProps,
            isRequestingOrderBundle: false,
            orderBundleError: "error",
        }).root;
        expect(root.findAllByType(PurchaseErrorScreen)).toHaveLength(1);
        expect(root.findAllByType(DefaultLoadingComponent)).toHaveLength(0);
    });
});
