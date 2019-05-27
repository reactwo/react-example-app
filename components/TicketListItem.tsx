import React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { View } from "react-native";

import ListItem from "app/common/components/ListItem";
import { ProductInformation } from "./ProductInformation";

export interface TicketListItemProps extends WithNamespaces {
    productSummary?: string;
    detail: string;
    verboseName: string;
    type: string;
    isProductInfoShown: boolean;
}

export default class TicketListItem extends React.Component<TicketListItemProps> {
    public render() {
        return(
            <View>
                {this.renderListItem()}
                {this.renderProductInfo()}
            </View>
        );
    }

    public renderListItem() {
        return (
            <ListItem
                detail={this.props.detail}
                label={this.props.t("Bus | DeLijn")}
                description={this.props.verboseName}
                icon={require("app/bus/img/activity-delijn.png")}
                type={this.props.type}
            />
        );
    }

    public renderProductInfo() {
        if (this.props.isProductInfoShown) {
            return(
                <ProductInformation productSummary={this.props.productSummary}/>
            );
        } else {
            return null;
        }
    }
}

const TicketListItemWithNamespaces = withNamespaces("bus")(TicketListItem);
export { TicketListItemWithNamespaces as TicketListItem };
