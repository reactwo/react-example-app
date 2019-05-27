import React from "react";
import { Image } from "react-native";
import TestRenderer, { ReactTestInstance } from "react-test-renderer";

import { i18n } from "app/i18n";
import { DefaultButton } from "app/ui/buttons/DefaultButton";

import {
    TermsAndConditionsScreen, TermsAndConditionsScreenProps,
} from "./TermsAndConditionsScreen";

const defaultProps: TermsAndConditionsScreenProps = {
    accepted: false,
    componentId: "test",
    i18n,
    t: (key) => (key),
    tReady: false,
};

describe("ServiceRecordScreen", () => {
    const renderTermsAndConditionsScreen = (props = defaultProps) => {
        const rendered = TestRenderer.create(
            <TermsAndConditionsScreen {...props}/>);
        return rendered.root;
    };

    it("renders the terms and conditions page with unaccepted terms", () => {
        const screen: ReactTestInstance = renderTermsAndConditionsScreen(defaultProps);
        expect(screen.findAllByType(Image)).toHaveLength(1);
        expect(screen.findByType(DefaultButton).props.disabled).toEqual(true);

    });

    it("renders the terms and conditions page with accepted terms", () => {
        const newProps: TermsAndConditionsScreenProps = {
            ...defaultProps,
            accepted: true,
        };
        const testInstance: ReactTestInstance = renderTermsAndConditionsScreen(newProps);
        expect(testInstance.findAllByType(Image)).toHaveLength(1);
        expect(testInstance.findByType(DefaultButton).props.disabled).toEqual(false);
    });

    it("continue button should be active if you accept the terms and conditions", () => {
        const testInstance: ReactTestInstance = renderTermsAndConditionsScreen(defaultProps);
        expect(testInstance.findAllByType(Image)).toHaveLength(1);
        expect(testInstance.findByType(DefaultButton).props.disabled).toEqual(true);
    });
});
