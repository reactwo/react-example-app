import React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    EventSubscription,
    Navigation,
    NavigationButtonPressedEvent,
} from "react-native-navigation";

import { connect } from "react-redux";

import {
    INSUFFICIENT_CREDIT,
} from "app/api/errors";
import {
    getBundleList,
} from "app/bus/actions/bundle";
import {
    getActivateBundleTicketError,
    getActivatedBundleTicket,
} from "app/bus/selectors/api/ticket";
import { isValidated, Ticket } from "app/bus/types/ticket";
import { i18n } from "app/i18n";
import { State } from "app/modules";
import { defaultColors, xLight } from "app/styles/default/colors";
import DefaultLoadingComponent from "app/ui/DefaultLoadingComponent";
import PurchaseErrorScreen from "app/ui/PurchaseErrorScreen";

import BusTicketComponent from "./BusTicketComponent";

export interface BundleTicketScreenProps extends WithNamespaces {
    componentId: string;
    getBundleList: () => void;
    ticket: Ticket | null;
    ticketError: string | null;
}

export class BundleTicketScreen extends React.Component<BundleTicketScreenProps> {

    public static options() {
        return {
            bottomTabs: {
                drawBehind: true,
                visible: false,
            },
            topBar: {
                height: 60,
                leftButtons: [],
                rightButtons: [
                    {
                        color: defaultColors.PRIMARY_COMPLEMENTARY,
                        id: "closeButton",
                        text: "Close",
                    },
                ],
                title: {
                    text: i18n.t("Activate M-ticket 60"),
                },
                visible: true,
            },
        };
    }

    public navigationEventListener?: EventSubscription;

    public componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    public navigationButtonPressed = (event: NavigationButtonPressedEvent ) => {
        if (event.buttonId === "closeButton") {
            Navigation.popToRoot(this.props.componentId);
        }
    }
    public render() {
        const ticket = this.props.ticket;
        const error = this.props.ticketError;
        if (ticket === null || !isValidated(ticket)) {
            return error === null ? this.renderLoading() : this.renderError();
        } else {
            this.props.getBundleList();
            return this.renderTicket(ticket);
        }
    }

    private renderLoading = () => {
        return (
            <DefaultLoadingComponent
                renderMessage={this.renderLoadingMessage}
            />
        );
    }

    private renderLoadingMessage = () => {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    {this.props.t("retrieving-your-ticket")}
                </Text>
                <Text style={styles.message}>
                    {this.props.t("can-take-a-moment")}
                </Text>
            </View>
        );
    }

    private renderError = () => (
        <PurchaseErrorScreen>{this.renderErrorCode()}</PurchaseErrorScreen>
    )

    private renderErrorCode() {
        switch (this.props.ticketError) {
            case INSUFFICIENT_CREDIT:
                return this.props.t("ticket-order-failed-insufficient-credit");
            default:
                return this.props.t("ticket-order-failed");
        }
    }

    private renderTicket = (ticket: Ticket) => {
        return (
            <View style={styles.container}>
                <BusTicketComponent ticket={ticket}/>
            </View>
        );
    }
}

export function mapStateToProps(
    state: State,
    props: {componentId: string},
) {
    const ticket = getActivatedBundleTicket(state);
    const ticketError = getActivateBundleTicketError(state);

    return {
        componentId: props.componentId,
        ticket,
        ticketError,
    };
}

export const mapDispatchToProps = {
    getBundleList,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    message: {
        color: xLight(defaultColors.PRIMARY),
        fontSize: 16,
        textAlign: "center",
    },
    messageContainer: {
        alignItems: "center",
    },
});

export const BundleTicketScreenTranslated = withNamespaces("bus")(BundleTicketScreen);
export default connect(mapStateToProps, mapDispatchToProps)(BundleTicketScreenTranslated);
