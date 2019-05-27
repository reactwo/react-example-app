import React from "react";
import { Navigation } from "react-native-navigation";
import TestRenderer from "react-test-renderer";

import {
    deliveredTicket,
    processedTicket,
} from "app/bus/api/__mocks__/api_data/ticket";
import { i18n } from "app/i18n";
import DefaultLoadingComponent from "app/ui/DefaultLoadingComponent";

import { BundleTicketScreen, BundleTicketScreenProps } from "./BundleTicketScreen";
import BusTicketComponent from "./BusTicketComponent";

jest.mock("react-native-navigation");

// @ts-ignore TS2339 TODO: mock this whole class
Navigation.events = jest.fn(() => {
    return {
        bindComponent: jest.fn(),
    };
});

const defaultProps: BundleTicketScreenProps = {
    componentId: "test",
    getBundleList: () => null,
    i18n,
    t: (key: any) => key,
    tReady: true,
    ticket: null,
    ticketError: null,
};

describe("BundleTicketScreen", () => {
    const screens: TestRenderer.ReactTestRenderer[] = [];

    const createScreen = (props: BundleTicketScreenProps = defaultProps) => {
        const rendered = TestRenderer.create(
            <BundleTicketScreen {...props} />,
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

    it("should be loading when there is no ticket.", () => {
        const root = createScreen(defaultProps).root;

        expect(root.findAllByType(DefaultLoadingComponent)).toHaveLength(1);
        expect(root.findAllByType(BusTicketComponent)).toHaveLength(0);
    });

    it("should be loading when the ticket is not validated.", () => {
        const root = createScreen({
            ...defaultProps,
            ticket: processedTicket,
        }).root;
        expect(root.findAllByType(DefaultLoadingComponent)).toHaveLength(1);
        expect(root.findAllByType(BusTicketComponent)).toHaveLength(0);
    });

    it("should display a ticket when the ticket is validated.", () => {
        const newProps: BundleTicketScreenProps = {
            ...defaultProps,
            ticket: deliveredTicket,
        };
        const root = createScreen(newProps).root;
        expect(root.findAllByType(DefaultLoadingComponent)).toHaveLength(0);
        expect(root.findAllByType(BusTicketComponent)).toHaveLength(1);
    });

    it("should display a ticket when the ticket becomes validated.", () => {
        const newProps: BundleTicketScreenProps = {
            ...defaultProps,
            ticket: processedTicket,
        };

        const screen = createScreen(newProps);
        const root = screen.root;
        screen.update(
            <BundleTicketScreen {...newProps} ticket={deliveredTicket} />,
        );
        expect(root.findAllByType(DefaultLoadingComponent)).toHaveLength(0);
        expect(root.findAllByType(BusTicketComponent)).toHaveLength(1);
    });
});
