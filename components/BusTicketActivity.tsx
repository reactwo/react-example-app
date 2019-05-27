import { format } from "date-fns";
import React from "react";

import { withNamespaces, WithNamespaces } from "react-i18next";

import activityIcon from "app/bus/img/activity-delijn.png";
import { BusTicketActivity as BusActivityType, Ticket } from "app/bus/types";
import { isPending } from "app/bus/types/ticket";
import ServiceRecordLoading from "app/common/components/ServiceRecordLoading";
import { i18n } from "app/i18n";
import { formatMonetaryFigure } from "app/utils/monetaryFigure";
import { TicketListItem } from "./TicketListItem";

export interface ActivityProps extends WithNamespaces {
    activity: BusActivityType;
}

export class BusTicketActivity extends React.PureComponent<ActivityProps> {

    public render() {
        const ticket = this.props.activity.ticket;

        if (!this.props.activity.active) {
            return this.renderInactiveTicket(ticket);
        } else if (isPending(ticket)) {
            return this.renderLoadingTicket(ticket);
        } else {
            return this.renderActiveTicket(ticket);
        }
    }

    private renderInactiveTicket = (ticket: Ticket) => {
        return (
            <TicketListItem
                detail={"€" + formatMonetaryFigure(ticket.priceIncl)}
                verboseName={ticket.ticketType.verboseName}
                isProductInfoShown={false}
                type={i18n.t("Price")}
            />
        );
    }

    private renderActiveTicket = (ticket: Ticket) => {
        return (
            <TicketListItem
                detail={this.getTicketValidityEnd(ticket)}
                verboseName={ticket.ticketType.verboseName}
                isProductInfoShown={false}
                type={i18n.t("Expires at")}
            />
        );
    }

    private renderLoadingTicket = (ticket: Ticket) => {
        return (
            <ServiceRecordLoading
                description={ticket.ticketType.verboseName}
                detail={this.getTicketValidityEnd(ticket)}
                icon={activityIcon}
                id={ticket.id}
                label={"Bus | De Lijn"}
                type={i18n.t("Expires at")}
            />
        );
    }

    private getTicketValidityEnd = (ticket: Ticket) => {
        if (ticket.ticketValidityEnd !== null) {
            return format(ticket.ticketValidityEnd, "HH:mm");
        }
        return "";
    }
}

const BusTicketActivityWithNamespaces = withNamespaces("bus")(BusTicketActivity);
export default BusTicketActivityWithNamespaces;
