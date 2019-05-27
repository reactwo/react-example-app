import { tint } from "polished";
import React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";

import {
    getBundleList,
    selectBundle,
} from "app/bus/actions/bundle";
import {
    getBundleTypeList,
    selectBundleType,
} from "app/bus/actions/bundle-type";
import { selectProductType } from "app/bus/actions/product-type";
import {
    getTicketTypeList,
    selectTicketType,
} from "app/bus/actions/ticket-type";
import { BundleListItem } from "app/bus/components/BundleListItem";
import {
    getActiveBundleList,
    getBundleListError,
    isRequestingBundleList,
} from "app/bus/selectors/api/bundle";
import {
    getBundleTypeError,
    getBundleTypeList as getBundleTypeListSelector,
    isRequestingBundleType,
} from "app/bus/selectors/api/bundle-type";
import {
    getTicketTypeError,
    getTicketTypeList as getTicketTypeListSelector,
    isRequestingTicketType,
} from "app/bus/selectors/api/ticket-type";
import {
    BundleType,
    TicketType,
} from "app/bus/types";
import { Bundle } from "app/bus/types/bundle";
import { validityToText } from "app/bus/types/enums";
import { ProductType } from "app/bus/types/enums";
import { i18n } from "app/i18n";
import { State } from "app/modules";
import {
    defaultColors,
    light,
    xLight,
    xxxLight,
} from "app/styles/default/colors";
import DefaultErrorComponent from "app/ui/DefaultErrorComponent";
import DefaultLoadingComponent from "app/ui/DefaultLoadingComponent";
import { formatMonetaryFigure } from "app/utils/monetaryFigure";
import { TicketListItem } from "../components/TicketListItem";

export interface ProductListScreenProps extends WithNamespaces {
    getTicketTypeList: () => void;
    getBundleList: () => void;
    selectBundle: (bundle: Bundle) => void;
    bundle: Bundle[];
    bundleListError: string | null;
    getBundleTypeList: () => void;
    selectBundleType: (bundleType: BundleType) => void;
    selectTicketType: (ticketType: TicketType) => void;
    selectProductType: (productType: ProductType) => void;
    products: TicketType[];
    bundleTypesList: BundleType[];
    productListError: string | null;
    bundleTypeListError: string | null;
    isRequestingProducts: boolean;
    isRequestingBundle: boolean;
    componentId: string;
    isRequestingBundleTypeList: boolean;
}

export class ProductListScreen extends React.Component<ProductListScreenProps> {
    public static options() {
        return {
            bottomTabs: {
                drawBehind: true,
                visible: false,
            },
            topBar: {
                height: 60,
                title: {
                    text: i18n.t("bus:choose-your-product-title"),
                },
                visible: true,
            },
      };
    }

    public componentDidMount() {
        this.props.getBundleList();
        this.props.getTicketTypeList();
        this.props.getBundleTypeList();
    }

    public render() {
        /*
            TODO: when m-card10 is added add distinction between using
            and buying a product
            <Text style={styles.title}>{i18n.t("bus:buy-new-products")}</Text>
         */
        const requestingBusy = (
            this.props.isRequestingProducts &&
            this.props.isRequestingBundle &&
            this.props.isRequestingBundleTypeList
            );

        const isRequestError = (
            this.props.productListError !== null ||
            this.props.bundleListError !== null ||
            this.props.bundleTypeListError !== null
            );

        const checkRequestResponse = (
            this.props.products.length ||
            this.props.bundleTypesList.length
            );

        if (requestingBusy) {
            return (
                <DefaultLoadingComponent/>
            );
        } else if (isRequestError) {
            return this.renderRequestError();
        } else if (checkRequestResponse) {
            return (
                <ScrollView style={styles.parentView}>
                    {this.renderBundles()}
                    <Text style={styles.listHeaders}>{this.props.t("buy-new-tickets-label")}</Text>
                    {this.renderTicketTypes()}
                    {this.renderBundleTypes()}
                </ScrollView> );
        } else {
            return (
                this.renderNoResultsError()
            );
        }
    }

    private renderNoResultsError = () => {
        return (
            <DefaultErrorComponent>
                {this.renderNoResultsErrorMessage()}
            </DefaultErrorComponent>
        );
    }

    private renderNoResultsErrorMessage = () => {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    {this.props.t("no-products-found")}
                </Text>
            </View>
        );
    }

    private renderRequestError = () => {
        return (
            <DefaultErrorComponent>
                {this.renderRequestErrorMessage()}
            </DefaultErrorComponent>
        );
    }

    private renderRequestErrorMessage = () => {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    {this.props.t("server-error-occurred")}
                </Text>
                <Text style={styles.message}>
                    {this.props.t("we-are-working-on-it")}
                </Text>
            </View>
        );
    }

    private renderBundles = () => {
        if (this.props.bundle && this.props.bundle.length > 0) {
           return (
                <View>
                    <Text style={styles.listHeaders}>{this.props.t("use-bought-ticket-label")}</Text>
                    {this.renderBundleList()}
                </View>
            );
        } else {
            return null;
        }
    }

    private renderBundleList = () => {
        return (this.props.bundle.map((bundles) => (
            <TouchableOpacity
                key={bundles.id}
                style={styles.summaryContainer}
                onPress={() => this.selectBundleOnPress(bundles)}
                testID="Bundle"
            >
                <BundleListItem
                    bundle={bundles}
                    type={this.props.t("amount-left")}
                />
            </TouchableOpacity>
        )));
    }

    private renderTicketTypes = () => {
        return this.props.products.map((product) => {
            const productSummary = this.props.t("ticket-summary", {
                validityUnitString: validityToText[product.validityUnit],
                validityValue: product.validityValue,
            });
            return(
                <TouchableOpacity
                    key={product.id}
                    style={styles.summaryContainer}
                    onPress={() => this.selectTicketProduct(product)}
                    testID="Product"
                >
                    <TicketListItem
                        productSummary={productSummary}
                        verboseName={product.verboseName}
                        isProductInfoShown={true}
                        detail={"€" + formatMonetaryFigure(product.tariff)}
                        type={this.props.t("bus:product-price-vat", {vat: product.vat})}
                    />
                </TouchableOpacity>
            );
        });
    }

    private renderBundleTypes = () => {
        return this.props.bundleTypesList.map((bundleType) => {
            const productSummary = this.props.t("bundle-summary", {
                count: bundleType.ticketCount,
                ticketValidityUnitString: validityToText[bundleType.ticketType.validityUnit],
                ticketValidityValue: bundleType.ticketType.validityValue,
                validityUnitString: validityToText[bundleType.validityUnit],
                validityValue: bundleType.validityValue,
            });
            return(
                <TouchableOpacity
                    key={bundleType.id}
                    style={styles.summaryContainer}
                    onPress={() => this.selectBundleProduct(bundleType)}
                    testID="BundleType"
                >
                    <TicketListItem
                        productSummary={productSummary}
                        verboseName={bundleType.verboseName}
                        isProductInfoShown={true}
                        detail={"€" + formatMonetaryFigure(bundleType.tariff)}
                        type={this.props.t("bus:product-price-vat", {vat: bundleType.vat})}
                    />
                </TouchableOpacity>
            );
        });
    }

    private selectTicketProduct = (ticketType: TicketType) => {
        this.props.selectTicketType(ticketType);
        this.props.selectProductType(ProductType.TICKET);
        Navigation.push(this.props.componentId, {
            component: {
                id: "mobility-app.bus.TermsAndConditionsScreen",
                name: "mobility-app.bus.TermsAndConditionsScreen",
            },
        });
    }

    private selectBundleOnPress = (bundle: Bundle) => {
        this.props.selectBundle(bundle);
        this.props.selectProductType(ProductType.BUNDLE);
        Navigation.push(this.props.componentId, {
            component: {
                id: "mobility-app.bus.BuyProductScreen",
                name: "mobility-app.bus.BuyProductScreen",
            },
        });
    }

    private selectBundleProduct = (bundleType: BundleType) => {
        this.props.selectBundleType(bundleType);
        this.props.selectProductType(ProductType.BUNDLE_TYPE);
        Navigation.push(this.props.componentId, {
            component: {
                id: "mobility-app.bus.TermsAndConditionsScreen",
                name: "mobility-app.bus.TermsAndConditionsScreen",
            },
        });
    }
}

export function mapStateToProps(state: State) {
    const products = getTicketTypeListSelector(state);
    const bundleTypesList = getBundleTypeListSelector(state);
    const isRequestingProducts = isRequestingTicketType(state);
    const isRequestingBundleTypeList = isRequestingBundleType(state);
    const productListError = getTicketTypeError(state);
    const bundle = getActiveBundleList(state);
    const isRequestingBundles = isRequestingBundleList(state);
    const bundleListError = getBundleListError(state);
    const bundleTypeListError = getBundleTypeError(state);

    return {
        bundle,
        bundleListError,
        bundleTypeListError,
        bundleTypesList,
        isRequestingBundleTypeList,
        isRequestingBundles,
        isRequestingProducts,
        productListError,
        products,
        };
}

export const mapDispatchToProps = {
    getBundleList,
    getBundleTypeList,
    getTicketTypeList,
    selectBundle,
    selectBundleType,
    selectProductType,
    selectTicketType,
};

const styles = StyleSheet.create({
    boughtBundlesContainer: {
        paddingTop: 5,
    },
    listHeaders: {
        color: light(defaultColors.SECONDARY),
        fontSize: 13,
        fontWeight: "500",
        margin: 8,
    },
    message: {
        color: xLight(defaultColors.PRIMARY),
        fontSize: 16,
        textAlign: "center",
    },
    messageContainer: {
        alignItems: "center",
    },
    noBundleMessage: {
        color: xLight(defaultColors.SECONDARY),
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        textAlign: "center",
    },
    parentView: {
        backgroundColor: xxxLight(defaultColors.SECONDARY),
        flex: 1,
        flexDirection: "column",
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    summaryContainer: {
        backgroundColor: defaultColors.PRIMARY_COMPLEMENTARY,
        borderRadius: 8,
        elevation: 1,
        marginVertical: 5,
        padding: 12,
    },
    title: {
        color: tint(0.70, defaultColors.SECONDARY),
    },
});

export default withNamespaces("bus")(
    connect(mapStateToProps, mapDispatchToProps)(ProductListScreen),
);
