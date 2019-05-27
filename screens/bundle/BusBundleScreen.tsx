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
    getOrderBundleError,
    getOrderedBundle,
    isOrderingBundle,
} from "app/bus/selectors/api/bundle";
import { i18n } from "app/i18n";
import { State } from "app/modules";
import { defaultColors, xLight } from "app/styles/default/colors";
import DefaultLoadingComponent from "app/ui/DefaultLoadingComponent";
import PurchaseErrorScreen from "app/ui/PurchaseErrorScreen";

import { Bundle, TicketStatus } from "app/bus/types";

export interface BusBundleScreenProps extends WithNamespaces {
    componentId: string;

    orderedBundle: Bundle | null;
    orderBundleError: string | null;
    isRequestingOrderBundle: boolean;
}

export class BusBundleScreen extends React.Component<BusBundleScreenProps> {

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
                    text: i18n.t("Active M-ticket 60"),
                },
                visible: true,
            },
        };
    }

    public navigationEventListener?: EventSubscription;

    public componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    public componentDidUpdate() {
        if (!this.props.isRequestingOrderBundle && this.props.orderBundleError === null) {
            if (this.props.orderedBundle && this.props.orderedBundle.status === TicketStatus.ORDERED) {
                Navigation.popToRoot(this.props.componentId);
            }
        }
    }

    public navigationButtonPressed = (event: NavigationButtonPressedEvent ) => {
        if (event.buttonId === "closeButton") {
            Navigation.popToRoot(this.props.componentId);
        }
    }
    public render() {
        if (
            this.props.orderBundleError ||
            (this.props.orderedBundle && this.props.orderedBundle.status === TicketStatus.ERROR)
        ) {
            return this.renderError();
        } else {
            return this.renderLoading();
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
                    {this.props.t("retrieving-your-bundle")}
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
        switch (this.props.orderBundleError) {
            case INSUFFICIENT_CREDIT:
                return this.props.t("bundle-order-failed-insufficient-credit");
            default:
                return this.props.t("bundle-order-failed");
        }
    }
}

export function mapStateToProps(
    state: State,
    props: {componentId: string},
) {
    const orderedBundle = getOrderedBundle(state);
    const orderBundleError = getOrderBundleError(state);
    const isRequestingOrderBundle = isOrderingBundle(state);
    return {
        componentId: props.componentId,
        isRequestingOrderBundle,
        orderBundleError,
        orderedBundle,
    };
}

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

export const BusBundleScreenTranslated = withNamespaces("bus")(BusBundleScreen);
export default connect(mapStateToProps, null)(BusBundleScreenTranslated);
