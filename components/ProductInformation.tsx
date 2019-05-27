import { tint } from "polished";
import React from "react";
import { Trans, withNamespaces, WithNamespaces } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { defaultColors } from "app/styles/default/colors";

export interface ProductInformationProps extends WithNamespaces {
    productSummary?: string;
}

export default class ProductInformation extends React.Component<ProductInformationProps> {
    public render() {
        return (
            <View style={styles.bottom}>
                <Text style={styles.productInformation}>
                    {this.props.t("bus:product-information")}
                </Text>
                <Text style={styles.secondaryText}>
                    <Trans i18nKey="productSummary">
                        {this.props.productSummary}
                    </Trans>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottom: {
        marginTop: 15,
        overflow: "hidden",
    },
    productInformation: {
        fontSize: 13,
    },
    secondaryText: {
        color: tint(0.70, defaultColors.SECONDARY),
        fontSize: 13,
    },
});

const ProductInformationWithNamespaces = withNamespaces("bus")(ProductInformation);
export { ProductInformationWithNamespaces as ProductInformation };
