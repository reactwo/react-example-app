import React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import tickets_icon from "app/bus/img/tickets.png";
import {
    defaultColors,
    xxxLight,
} from "app/styles/default/colors";
import payment_option_icon from "app/taxi/img/payment-option.png";
import price_icon from "app/taxi/img/price.png";
import shadow from "app/ui/img/shadow.png";
import { formatMonetaryFigure } from "app/utils/monetaryFigure";

import { DefaultButton } from "app/ui/buttons/DefaultButton";
import { DefaultPrimaryButtonText } from "app/ui/texts/DefaultPrimaryButtonText";

export interface BuyProductSummaryProps extends WithNamespaces {
    onBuyButtonPress: () => void;
    productPrice: number;
    ticketCount: number;
}

export class BuyProductSummary extends React.Component<BuyProductSummaryProps> {
    public render() {
        let formattedPrice = "";
        formattedPrice =  `€${formatMonetaryFigure(this.props.productPrice)}`;
        return (
            <View style={styles.summaryContainer}>
                <Image source={shadow} resizeMode="repeat" style={styles.shadowImageStyle}/>
                <View style={styles.summaryBar}>
                    <View style={styles.summaryBarItem}>
                        <Image
                            source={price_icon}
                            style={styles.summaryBarItemImage}
                        />
                        <View style={styles.summaryBarItemLabel}>
                            <Text style={styles.summaryBarItemLabelPrimary}>{formattedPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.summaryBarItem}>
                        <Image
                            source={payment_option_icon}
                            style={styles.summaryBarItemImage}
                        />
                        <View style={styles.summaryBarItemLabel}>
                            <Text style={styles.summaryBarItemLabelPrimary}>
                                {this.props.t("bus:mobility-budget")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.summaryBarItem}>
                        <Image
                            source={tickets_icon}
                            style={styles.summaryBarItemImage}
                        />
                        <View style={styles.summaryBarItemLabel}>
                            <Text style={styles.summaryBarItemLabelPrimary}>{`${this.props.ticketCount}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buyButtonContainer}>
                    <DefaultButton
                        testID="mainButton"
                        onPress={this.props.onBuyButtonPress}
                    >
                        <DefaultPrimaryButtonText>
                            {`${this.props.t("Buy")} ${this.props.ticketCount} (${formattedPrice})`}
                        </DefaultPrimaryButtonText>
                    </DefaultButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buyButtonContainer: {
        backgroundColor: defaultColors.PRIMARY_COMPLEMENTARY,
        padding: 10,
        paddingBottom: 20,
    },
    shadowImageStyle: {
        height: 20,
        width: "100%",
    },
    summaryBar: {
        alignItems: "stretch",
        flexDirection: "row",
        height: 95,
        justifyContent: "space-around",
        paddingTop: 20,
        width: "100%",
    },
    summaryBarItem: {
        alignItems: "center",
        flex: 1,
    },
    summaryBarItemImage: {
        flex: 0,
        height: 25,
        resizeMode: "contain",
    },
    summaryBarItemLabel: {
        flex: 1,
        justifyContent: "center",
    },
    summaryBarItemLabelPrimary: {
        color: defaultColors.SECONDARY,
        textAlign: "center",
    },
    summaryBarItemLabelSecondary: {
        color: xxxLight(defaultColors.SECONDARY),
        fontSize: 12,
        textAlign: "center",
    },
    summaryContainer: {
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
    },
});

export default withNamespaces("bus")(BuyProductSummary);
