import React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { Trans } from "react-i18next";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";

import { i18n } from "app/i18n";
import { defaultColors } from "app/styles/default/colors";
import { DefaultButton } from "app/ui/buttons/DefaultButton";
import CheckBox from "app/ui/CheckBox";

export interface TermsAndConditionsState {
    accepted: boolean;
}

export interface TermsAndConditionsScreenProps extends WithNamespaces {
    accepted: boolean;
    componentId: string;
}

export class TermsAndConditionsScreen extends React.Component<TermsAndConditionsScreenProps, TermsAndConditionsState> {
    public static options() {
        return {
            bottomTabs: {
                drawBehind: true,
                visible: false,
            },
            topBar: {
                height: 60,
                title: {
                    text: i18n.t("Terms of use"),
                },
                visible: true,
          },
        };
    }

    constructor(props: TermsAndConditionsScreenProps) {
        super(props);
        this.state = { accepted: props.accepted };
    }

    public checkTermsAndConditions = (accepted: boolean) => {
        this.setState({ accepted });
    }

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image
                        source={require("app/bus/img/terms-delijn.png")}
                    />
                </View>
                <View style={styles.row}>
                    {this.renderCheckbox()}
                    {this.renderCheckboxText()}
                </View>
                {this.renderContinueButton()}
            </View>
        );
    }

    private renderCheckbox() {
        return (
            <View style={styles.checkBox}>
                <CheckBox
                    initialValue={false}
                    onValueChange={this.checkTermsAndConditions}
                    size={30}
                />
            </View>
        );
    }

    private renderCheckboxText() {
        return (
            <View style={styles.textView}>
                <Trans i18nKey="terms-read-and-agreed">
                    <Text style={styles.text}>
                        I acknowledge I have read and agree to the
                        <Text
                            style={styles.link}
                            onPress={() => Linking.openURL("https://www.delijn.be/algemene-reisvoorwaarden")}
                        >
                            {" "}Terms of use
                        </Text>
                        .
                    </Text>
                </Trans>
            </View>
        );
    }

    private renderContinueButton() {
        return (
            <View style={styles.buttonView}>
                <DefaultButton
                    disabled={!this.state.accepted}
                    style={styles.continueButton}
                    onPress={this.toBuyProductScreen}
                >
                    <Text style={styles.continueButtonText}> Continue </Text>
                </DefaultButton>
            </View>
        );
    }

    private toBuyProductScreen = () => {
        Navigation.push(this.props.componentId, {
            component: {
                id: "mobility-app.bus.BuyProductScreen",
                name: "mobility-app.bus.BuyProductScreen",
            },
        });
    }
}

const styles = StyleSheet.create({

    buttonView: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 30,
    },
    checkBox: {
        marginRight: 15,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20,
    },
    continueButton: {
        flex: 1,
    },
    continueButtonText: {
        color: defaultColors.PRIMARY_COMPLEMENTARY,
        fontWeight: "bold",
    },
    link: {
        color: defaultColors.ACCENT,
        textShadowRadius: 0,
    },
    row: {
        flexDirection: "row",
    },
    text: {
        color: "black",
        lineHeight: 20,
        textShadowRadius: 0,
    },
    textView: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    top: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        margin: 40,
    },
});

export default withNamespaces("bus")(TermsAndConditionsScreen);
