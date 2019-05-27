import React from "react";

import { withNamespaces, WithNamespaces } from "react-i18next";

import { Bundle, BusBundleActivity as BusActivityType } from "app/bus/types";
import { BundleListItem } from "./BundleListItem";

export interface ActivityProps extends WithNamespaces {
    activity: BusActivityType;
}

export class BusBundleActivity extends React.PureComponent<ActivityProps> {

    public render() {
        const bundle = this.props.activity.bundle;

        if (!this.props.activity.active) {
            return this.renderInactiveBundle(bundle);
        } else {
            return this.renderActiveBundle(bundle);
        }
    }

    private renderInactiveBundle = (bundle: Bundle) => {
        return (
            <BundleListItem
                bundle={bundle}
                type={this.props.t("used")}
            />
        );
    }

    private renderActiveBundle = (bundle: Bundle) => {
        return (
            <BundleListItem
                bundle={bundle}
                type={this.props.t("bus:available")}
            />
        );
    }
}

const BusBundleActivityWithNamespaces = withNamespaces("bus")(BusBundleActivity);
export default BusBundleActivityWithNamespaces;
