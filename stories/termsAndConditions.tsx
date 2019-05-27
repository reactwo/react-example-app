import React from "react";

import { storiesOf } from "@storybook/react-native";

import { i18n } from "app/i18n";

import {
    TermsAndConditionsScreen, TermsAndConditionsScreenProps,
} from "app/bus/screens/TermsAndConditionsScreen";

const defaulTermsAndConditionsScreenProps: TermsAndConditionsScreenProps = {
    accepted: false,
    componentId: "test",
    i18n,
    t: (key) => (key),
    tReady: false,
};

function loadStories(): void {
    storiesOf("Terms and conditions", module)
        .add("Terms and conditions", () => (
            <TermsAndConditionsScreen {...defaulTermsAndConditionsScreenProps}/>
        ));
}

export default loadStories;
