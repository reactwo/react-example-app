import { Bundle } from "app/bus/types/bundle";
import ListItem from "app/common/components/ListItem";
import React from "react";
import {
    withNamespaces,
    WithNamespaces,
} from "react-i18next";

import TicketsLeftDetailSummary from "./TicketsLeftDetailSummary";

export interface BundleListItemProps extends WithNamespaces {
    bundle: Bundle;
    type: string;
}

export default class BundleListItem extends React.Component<BundleListItemProps> {
    public render() {
        const details = (
            <TicketsLeftDetailSummary
                totalTicketsCount={this.props.bundle.bundleType.ticketCount}
                totalTicketsLeft={this.props.bundle.ticketsLeft}
            />
        );
        return (
            <ListItem
                detail={details}
                label={this.props.t("Bus | DeLijn")}
                description={this.props.bundle.bundleType.verboseName}
                icon={require("app/bus/img/activity-delijn.png")}
                type={this.props.type}
            />
        );
    }
}

const BundleListItemWithNamespaces = withNamespaces("bus")(BundleListItem);
export { BundleListItemWithNamespaces as BundleListItem };
