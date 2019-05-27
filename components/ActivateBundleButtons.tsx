import {
    defaultColors,
    xLight,
    xxLight,
} from "app/styles/default/colors";
import shadow from "app/ui/img/shadow.png";
import React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { DefaultButton } from "app/ui/buttons/DefaultButton";
import { DefaultPrimaryButtonText } from "app/ui/texts/DefaultPrimaryButtonText";

export interface ActivateBundleButtonsProps extends WithNamespaces {
    onIncreaseTicket: () => void;
    onDecreaseTicket: () => void;
    onActivateButton: () => void;
    ticketCount: number;
    totalTicketsLeft: number;
}

export default class ActivateBundleButtons extends React.Component<ActivateBundleButtonsProps> {
    public render() {
        const ticketCountMinReached = 1;
        const ticketCountMaxReached = this.props.totalTicketsLeft;
        const decreaseButtonStyles = (this.props.ticketCount === ticketCountMinReached)
                                        ? styles.disabledButton
                                        : styles.enabledButton;
        const increaseButtonStyles = (this.props.ticketCount === ticketCountMaxReached)
                                        ? styles.disabledButton
                                        : styles.enabledButton;
        return (
            <View style={styles.summaryContainer}>
                <Image source={shadow} resizeMode="repeat" style={styles.shadowImageStyle}/>
                <View style={styles.activateSummaryBar}>
                    <TouchableOpacity
                        disabled={(this.props.ticketCount === ticketCountMinReached)}
                        style={[styles.decreaseTicketView, decreaseButtonStyles]}
                        onPress={this.props.onDecreaseTicket}
                    >
                        <Text style={styles.ticketText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.ticketCount}>{this.props.ticketCount}
                        {this.props.t("ticket", {count: this.props.ticketCount})}
                    </Text>
                    <TouchableOpacity
                        disabled={(this.props.ticketCount === ticketCountMaxReached)}
                        style={[styles.increaseTicketView, increaseButtonStyles]}
                        onPress={this.props.onIncreaseTicket}
                    >
                        <Text style={styles.ticketText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        testID="activateTicket"
                        onPress={this.props.onActivateButton}
                    >
                        <DefaultPrimaryButtonText>
                            {this.props.t("button-activate-ticket")}
                        </DefaultPrimaryButtonText>
                    </DefaultButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    activateSummaryBar: {
        alignItems: "center",
        backgroundColor: xxLight(defaultColors.SECONDARY),
        borderColor: xxLight(defaultColors.SECONDARY),
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: "row",
        height: 55,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
    },
    buttonContainer: {
        backgroundColor: defaultColors.PRIMARY_COMPLEMENTARY,
        padding: 10,
        paddingBottom: 20,
    },
    decreaseTicketView: {
        alignItems: "center",
        borderRadius: 45 / 2,
        height: 45,
        justifyContent: "center",
        marginLeft: 5,
        width: 45,
    },
    disabledButton: {
        backgroundColor: xLight(defaultColors.SECONDARY),
    },
    enabledButton: {
        backgroundColor: defaultColors.SECONDARY,
    },
    increaseTicketView: {
        alignItems: "center",
        borderRadius: 45 / 2,
        height: 45,
        justifyContent: "center",
        marginRight: 5,
        width: 45,
    },
    shadowImageStyle: {
        height: 20,
        width: "100%",
    },
    summaryContainer: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
    },
    ticketCount: {
        alignItems: "center",
        color: defaultColors.SECONDARY,
        flex: 1,
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
    },
    ticketText: {
        alignSelf: "center",
        color: "white",
        fontSize: 25,
        fontWeight: "700",
    },
});

const ActivateBundleButtonsWithNamespaces = withNamespaces("bus")(ActivateBundleButtons);
export { ActivateBundleButtonsWithNamespaces as ActivateBundleButtons };
