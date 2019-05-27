import { i18n } from "app/i18n";
import { format } from "date-fns";
import {
    AsYouType,
    formatIncompletePhoneNumber,
    PhoneNumber,
} from "libphonenumber-js";
import { tint } from "polished";
import React from "react";
import {
    withNamespaces,
    WithNamespaces,
} from "react-i18next";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";

import { getUser } from "app/account/selectors/user";
import { User } from "app/account/types/user";
import { orderBundle } from "app/bus/actions/bundle";
import { activateBundleTicket, orderTicket } from "app/bus/actions/ticket";
import { ActivateBundleButtons } from "app/bus/components/ActivateBundleButtons";
import { BundleListItem } from "app/bus/components/BundleListItem";
import BuyProductSummary from "app/bus/components/BuyProductSummary";
import { ProductInformation } from "app/bus/components/ProductInformation";
import { TicketListItem } from "app/bus/components/TicketListItem";
import {
    getSelectedBundle,
    getSelectedBundleType,
    getSelectedProductType,
    getSelectedTicketType,
} from "app/bus/selectors";
import {
    BundleType,
    ProductType,
    TicketType,
    validityToText,
} from "app/bus/types";
import { Bundle } from "app/bus/types/bundle";
import { setActiveTabVisible } from "app/common/ui-state/actions/serviceRecord";
import { State } from "app/modules";
import { openActivity } from "app/navigation";
import {
    defaultColors,
    xLight,
    xxLight,
    xxxLight,
} from "app/styles/default/colors";
import DefaultErrorComponent from "app/ui/DefaultErrorComponent";
import shadow from "app/ui/img/shadow.png";
import PhoneNumberInput from "app/ui/PhoneNumberInput";
import { formatMonetaryFigure } from "app/utils/monetaryFigure";

export interface BuyProductScreenProps extends WithNamespaces {
    // TODO: reuse interface for orderticket
    bundleType: BundleType | null;
    productType: ProductType;
    orderTicket: (
        ticketTypeId: number,
        msisdn: string,
        acceptTermsAndConditions: boolean) => void;
    orderBundle: (
        bundleTypeId: number,
        msisdn: string,
        acceptTermsAndConditions: boolean) => void;
    activateBundleTicket: (id: number) => void;
    user: User | null;
    bundle: Bundle | null;
    ticketType: TicketType | null;
    componentId: string;
    setActiveTabVisible: (activeTabVisible: boolean) => void;
}

export interface BuyProductScreenState {
    phoneNumber: PhoneNumber | null;
    phoneNumberError: boolean;
    ticketCount: number;
}

export class BuyProductScreen extends React.Component<BuyProductScreenProps, BuyProductScreenState> {

    public static options() {
        return {
            bottomTabs: {
                drawBehind: true,
                visible: false,
            },
            topBar: {
                height: 60,
                visible: true,
            },
        };
    }

    public constructor(props: BuyProductScreenProps) {
        super(props);
        this.state = {
            phoneNumber: null,
            phoneNumberError: false,
            ticketCount: 1,
        };
    }

    public componentDidMount() {
        let BuyProductScreenMainTitle;
        let BuyProductScreenTitle;
        if (
            this.props.ticketType !== null &&
            this.props.productType === ProductType.TICKET
        ) {
            BuyProductScreenMainTitle = "bus:buy-ticket-title";
            BuyProductScreenTitle = this.props.ticketType.verboseName;
        } else if (
            this.props.bundleType !== null &&
            this.props.productType === ProductType.BUNDLE_TYPE
        ) {
            BuyProductScreenMainTitle = "bus:buy-ticket-title";
            BuyProductScreenTitle = this.props.bundleType.verboseName;
        } else if (
            this.props.productType === ProductType.BUNDLE &&
            this.props.bundle !== null
        ) {
            BuyProductScreenMainTitle = "bus:activate-title";
            BuyProductScreenTitle = this.props.bundle.bundleType.verboseName;
        }
        if (BuyProductScreenTitle && BuyProductScreenMainTitle) {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    title: {
                        text: i18n.t(BuyProductScreenMainTitle, {title: BuyProductScreenTitle}),
                    },
                },
            });
        }
    }

    public render() {
        return (
            <View style={styles.container}>
                {this.renderProductTypeSummary()}
                {this.renderPhoneInput()}
                {this.renderSummary()}
            </View>
        );
    }

    private renderNoProductSelectedError = () => {
        return (
            <DefaultErrorComponent>
                {this.renderNoProductSelectedErrorMessage()}
            </DefaultErrorComponent>
        );
    }

    private renderNoProductSelectedErrorMessage = () => {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    {this.props.t("no-products-found")}
                </Text>
            </View>
        );
    }

    private renderProductTypeSummary = () => {
        if (
            this.props.productType === ProductType.TICKET &&
            this.props.ticketType !== null
            ) {
            const productSummary = this.props.t("ticket-summary", {
                validityUnitString: validityToText[this.props.ticketType.validityUnit],
                validityValue: this.props.ticketType.validityValue,
            });
            return (
                <TicketListItem
                    productSummary={productSummary}
                    verboseName={this.props.ticketType.verboseName}
                    isProductInfoShown={true}
                    detail={"€" + formatMonetaryFigure(this.props.ticketType.tariff)}
                    type={this.props.t("bus:product-price-vat", {vat: this.props.ticketType.vat})}
                />
            );
        } else if (
            this.props.productType === ProductType.BUNDLE_TYPE &&
            this.props.bundleType !== null
            ) {
            const productSummary = this.props.t("bundle-summary", {
                count: this.props.bundleType.ticketCount,
                ticketValidityUnitString: validityToText[this.props.bundleType.ticketType.validityUnit],
                ticketValidityValue: this.props.bundleType.ticketType.validityValue,
                validityUnitString: validityToText[this.props.bundleType.validityUnit],
                validityValue: this.props.bundleType.validityValue,
            });
            return (
                <TicketListItem
                    productSummary={productSummary}
                    detail={"€" + formatMonetaryFigure(this.props.bundleType.tariff)}
                    verboseName={this.props.bundleType.verboseName}
                    isProductInfoShown={true}
                    type={this.props.t("bus:product-price-vat", {vat: this.props.bundleType.vat})}
                />
            );
        } else if (
            this.props.productType === ProductType.BUNDLE &&
            this.props.bundle !== null
            ) {
                const validityValue = this.props.bundle.bundleType.ticketType.validityValue;
                const expireDate = new Date();
                expireDate.setHours(expireDate.getHours(), expireDate.getMinutes() + validityValue, 0, 0);
                const bundleSummary = this.props.t("activate-ticket-summary", {
                    count: this.state.ticketCount,
                    expireDate: format(new Date(), "dd-MM-yyyy"),
                    validityUnitString: validityToText[this.props.bundle.bundleType.ticketType.validityUnit],
                    validityValue: this.props.bundle.bundleType.ticketType.validityValue,
                });
                return (
                    <View>
                        <BundleListItem
                            bundle={this.props.bundle}
                            type={this.props.t("amount-left")}
                        />

                        <ProductInformation
                            productSummary={bundleSummary}
                        />
                    </View>
                );
        } else {
            return this.renderNoProductSelectedError();
        }
    }

    private renderPhoneLabel = () => {
        return (
            <Text style={styles.phoneNumberLabel}>
                {this.props.t("phone-number")}
            </Text>
        );
    }

    private renderPhoneWidget = () => {
        let inputStyle;
        if (
            (this.props.productType === ProductType.BUNDLE_TYPE ||
            this.props.productType === ProductType.TICKET) &&
            this.state.phoneNumberError &&
            (!this.state.phoneNumber || !this.state.phoneNumber.isValid())
        ) {
            inputStyle = [styles.phoneNumberInputContainer, styles.inputError];
        } else {
            inputStyle = styles.phoneNumberInputContainer;
        }

        const isEditable = (this.props.productType === ProductType.BUNDLE) ? false : true;
        const inputBoxStyle = (this.props.productType === ProductType.BUNDLE)
                                ? styles.phoneNumberText
                                : styles.phoneNumberInput;
        const phoneText = (this.props.productType === ProductType.BUNDLE && this.props.bundle !== null)
                            ? new AsYouType("BE").input("+" + this.props.bundle.msisdn)
                            : formatIncompletePhoneNumber(this.getUserPhoneNumber());
        return (
            <View style={inputStyle}>
                <Icon
                    name={"user"}
                    size={18}
                    color="lightgrey"
                    solid={true}
                />
                <View style={styles.inputContainer}>
                    <PhoneNumberInput
                        isEditable={isEditable}
                        style={inputBoxStyle}
                        countryCode="BE"
                        value={phoneText}
                        onPhoneNumberChanged={this.onPhoneNumberChanged}
                    />
                </View>
            </View>
        );
    }

    private renderPhoneError = () => {
       if (
           this.state.phoneNumberError &&
           (!this.state.phoneNumber || !this.state.phoneNumber.isValid())
        ) {
            return (
                <Text style={[styles.secondaryText, styles.errortText]}>
                    {this.props.t("bus:invalid-phone-number")}
                </Text>
            );
        } else {
            return null;
        }
    }

    private renderPhoneHelpText = () => {
        return (
            <Text style={styles.secondaryText}>
                {this.props.t("phone-number-reason")}
            </Text>
        );
    }

    private renderPhoneInput = () => {
        if (
            this.props.bundle === null &&
            this.props.bundleType === null &&
            this.props.ticketType === null
        ) {
            return;
        }
        return (
            <View>
                {this.renderPhoneLabel()}
                {this.renderPhoneWidget()}
                {this.renderPhoneError()}
                {this.renderPhoneHelpText()}
            </View>
        );
    }

    private renderSummary = () => {
        return (
            (this.props.productType === ProductType.BUNDLE)
                ? this.renderActivateTicketSummary()
                : this.renderBuyProductSummary()
        );
    }

    private renderActivateTicketSummary() {
        if (
            this.props.productType === ProductType.BUNDLE &&
            this.props.bundle !== null
            ) {
                return (
                    <View style={styles.summaryContainer}>
                        <Image source={shadow} resizeMode="repeat" style={styles.shadowImageStyle}/>
                        <ActivateBundleButtons
                            ticketCount={this.state.ticketCount}
                            totalTicketsLeft={this.props.bundle.ticketsLeft}
                            onDecreaseTicket={this.onDecreaseTicketPress}
                            onIncreaseTicket={this.onIncreaseTicketPress}
                            onActivateButton={this.onActivateButtonPress}
                        />
                    </View>
                );
        } else {
            return null;
        }
    }

    private renderBuyProductSummary() {
        let productPrice = 0;
        let numberOfTickets;
        if (
            this.props.ticketType !== null &&
            this.props.productType === ProductType.TICKET
        ) {
            productPrice =  this.props.ticketType.tariff;
            numberOfTickets = this.props.t("bus:one-ticket", {count: 1});
        } else if (
            this.props.bundleType !== null &&
            this.props.productType === ProductType.BUNDLE_TYPE
        ) {
            productPrice =  this.props.bundleType.tariff;
            numberOfTickets = this.props.bundleType.verboseName;
        }
        return (
            <View style={styles.summaryContainer}>
                <Image source={shadow} resizeMode="repeat" style={styles.shadowImageStyle}/>
                <BuyProductSummary
                    productPrice={productPrice}
                    ticketCount={numberOfTickets}
                    onBuyButtonPress={this.onBuyButtonPress}
                />
            </View>
        );
     }

    private getUserPhoneNumber() {
        if (
            this.props.user &&
            this.props.user.phone
        ) {
            return this.props.user.phone;
        } else {
            /* for now we had a assumption that you're always logged in.
            But the selector and the reducer also allow 'null'. */
            return "";
        }
    }

    private onPhoneNumberChanged = (newPhoneNumber: PhoneNumber | undefined) => {
        if (newPhoneNumber) {
            this.setState({ phoneNumber: newPhoneNumber });
        }
    }

    private onBuyButtonPress = () => {
        if (this.state.phoneNumber && this.state.phoneNumber.isValid()) {
            if (
                this.props.ticketType !== null &&
                this.props.productType === ProductType.TICKET
            ) {
                this.props.orderTicket(
                    this.props.ticketType.id,
                    this.state.phoneNumber.number.toString(),
                    true,
                );

                this.props.setActiveTabVisible(true);

                openActivity(this.props.componentId, {
                    id: "mobility-app.bus.BusTicketScreen",
                    name: "mobility-app.bus.BusTicketScreen",
                });
                this.setState({ phoneNumberError: false });

            } else if (
                    this.props.bundleType !== null &&
                    this.props.productType === ProductType.BUNDLE_TYPE
                ) {

                    this.props.orderBundle(
                    this.props.bundleType.id,
                    this.state.phoneNumber.number.toString(),
                    true,
                    );
                    openActivity(this.props.componentId, {
                        id: "mobility-app.bus.BusBundleScreen",
                        name: "mobility-app.bus.BusBundleScreen",
                    });
                    this.setState({ phoneNumberError: false });
                }

        } else {
            this.setState({ phoneNumberError: true });
        }
    }

    private onActivateButtonPress = () => {
        if (
            this.props.productType === ProductType.BUNDLE &&
            this.props.bundle !== null
        ) {
            this.props.activateBundleTicket(this.props.bundle.id);
            this.props.setActiveTabVisible(true);
            openActivity(this.props.componentId, {
                id: "mobility-app.bus.BundleTicketScreen",
                name: "mobility-app.bus.BundleTicketScreen",
            });
            this.setState({ phoneNumberError: false });
        } else {
            throw new Error("Bundle is null.");
        }
    }

   private onIncreaseTicketPress = () => {
        if (
            this.props.productType === ProductType.BUNDLE &&
            this.props.bundle !== null
        ) {
            if (
                this.props.bundle.ticketsLeft > 0 &&
                this.state.ticketCount < this.props.bundle.ticketsLeft
            ) {
                this.setState({ ticketCount: this.state.ticketCount + 1 });
            }
        } else {
            throw new Error("Bundle is null.");
        }
   }

   private onDecreaseTicketPress = () => {
       if ( this.state.ticketCount > 1) {
           this.setState({ ticketCount: this.state.ticketCount - 1 });
       }
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
    container: {
        flex: 1,
        padding: 16,
    },
    decreaseTicketText: {
        alignSelf: "center",
        color: "white",
        fontSize: 25,
        fontWeight: "700",
    },
    decreaseTicketView: {
        alignItems: "center",
        backgroundColor: xLight(defaultColors.SECONDARY),
        borderRadius: 45 / 2,
        height: 45,
        justifyContent: "center",
        marginLeft: 5,
        width: 45,
    },
    errortText: {
        color: defaultColors.ERROR,
    },
    increaseTicketText: {
        alignSelf: "center",
        color: "white",
        fontSize: 25,
        fontWeight: "700",
    },
    increaseTicketView: {
        alignItems: "center",
        backgroundColor: defaultColors.SECONDARY,
        borderRadius: 45 / 2,
        height: 45,
        justifyContent: "center",
        marginRight: 5,
        width: 45,
    },
    inputContainer: {
        flex: 1,
        marginLeft: 8,
    },
    inputError: {
        borderColor: defaultColors.ERROR,
    },
    message: {
        color: xLight(defaultColors.PRIMARY),
        fontSize: 16,
        textAlign: "center",
    },
    messageContainer: {
        alignItems: "center",
    },
    phoneNumberInput: {
        alignItems: "stretch",
        fontSize: 17,
        fontWeight: "bold",
    },
    phoneNumberInputContainer: {
        alignItems: "center",
        backgroundColor: xxLight(defaultColors.SECONDARY),
        borderColor: xxLight(defaultColors.SECONDARY),
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: "row",
        height: 48,
        paddingLeft: 14,
    },
    phoneNumberLabel: {
        fontSize: 13,
        marginBottom: 3,
        marginTop: 15,
    },
    phoneNumberLabelError: {
        color: defaultColors.ERROR,
        fontSize: 13,
        marginBottom: 3,
        marginTop: 15,
    },
    phoneNumberText: {
        alignItems: "stretch",
        color: xLight(defaultColors.SECONDARY),
        fontSize: 15,
        fontWeight: "500",
        textShadowColor: xLight(defaultColors.SECONDARY),
    },
    productInformationLabel: {
        fontSize: 13,
        marginBottom: 3,
        marginTop: 15,
    },
    secondaryText: {
        color: tint(0.70, defaultColors.SECONDARY),
        fontSize: 13,
        marginTop: 3,
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
    ticketCount: {
        alignItems: "center",
        color: defaultColors.SECONDARY,
        flex: 1,
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export function mapStateToProps(state: State, ownProps: any) {
    const ticketType = getSelectedTicketType(state);
    const bundleType = getSelectedBundleType(state);
    const productType = getSelectedProductType(state);
    const bundle = getSelectedBundle(state);
    const user = getUser(state);
    if (
        productType === ProductType.TICKET &&
        ticketType === null
        ) {
        throw new Error("Ticket type should have been set.");
    } else if (
        productType === ProductType.BUNDLE_TYPE &&
        bundleType === null
        ) {
        throw new Error("Bundle type should have been set.");
    } else if (
        productType === ProductType.BUNDLE &&
        bundle === null
        ) {
        throw new Error("Bundle should have been set.");
    } else {
        return {
            bundle,
            bundleType,
            componentId: ownProps.componentId,
            productType,
            ticketType,
            user,
        };
    }
}

export const mapDispatchToProps = {
    activateBundleTicket,
    orderBundle,
    orderTicket,
    setActiveTabVisible,
};

export const BuyProductScreenTranslated = withNamespaces("bus")(BuyProductScreen);
export default connect(mapStateToProps, mapDispatchToProps)(BuyProductScreenTranslated);
