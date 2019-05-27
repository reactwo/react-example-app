import { format } from "date-fns";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Ticket } from "app/bus/types";
import { deLijnColors } from "app/styles/default/colors";

export interface BusTicketComponentProps {
    ticket: Ticket;
}

export interface BusTicketState {
    timer: any;
    alternativeColors: boolean;
}

export default class BusTicketComponent extends React.Component<BusTicketComponentProps, BusTicketState> {
    public constructor(props: BusTicketComponentProps) {
        super(props);
        this.state = {
            alternativeColors: false,
            timer: null,
        };
    }

    public componentDidMount() {
        const timer = setInterval(this.switchChecksumColors, 1000);
        this.setState({ timer });
    }

    public componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    public render() {
        const ticket = this.props.ticket;
        const quickChecksumTextStyle = {
            ...styles.quickChecksumText,
            color: this.state.alternativeColors ? "white" : deLijnColors.DARK_GREY,
        };
        const quickChecksumContainerStyle = {
            ...styles.quickChecksumContainer,
            backgroundColor: this.state.alternativeColors ? deLijnColors.DARK_GREY : deLijnColors.ACCENT,
        };
        let validUntilDate;
        let validUntilTime;
        const validityEnd = ticket.ticketValidityEnd;
        if (validityEnd) {
            validUntilDate = format(validityEnd, "dd/MM/yyyy");
            validUntilTime = `${format(validityEnd, "HH")}u${format(validityEnd, "mm")}`;
        } else {
            validUntilDate = null;
            validUntilTime = null;
        }
        const formattedPrice = ticket.priceIncl.toFixed(2).replace(".", ",");
        return (
            <View style={styles.horizontalContainer}>
                <View style={{ flex: 10 }}/>
                <View style={styles.container}>
                    <View style={{ flex: 10 }}/>
                    <View style={styles.topLine}/>
                    <Text style={styles.ticket}>
                        <Text style={styles.firstLetter}>m-</Text>
                        ticket
                    </Text>
                    <View style={{ flex: 8 }}/>
                    <View style={styles.summaryContainer}>
                        {/*TODO: Change this title based on the ticket type*/}
                        <View>
                            <Text style={styles.summaryTitle}>De Lijn m-ticket 60 minuten</Text>
                            <Text style={styles.mainSummary}>
                                Geldig op alle voertuigen van De Lijn tot
                                {` ${validUntilTime} op ${validUntilDate}.`}
                            </Text>
                        </View>
                        <Text style={styles.price}>
-                            Prijs: {formattedPrice} euro
-                        </Text>
                    </View>
                    <View style={{ flex: 10 }}/>
                    <View style={quickChecksumContainerStyle}>
                        <Text style={quickChecksumTextStyle}>{ticket.ticketQuickChecksum}</Text>
                    </View>
                    <View style={styles.checksumContainer}>
                        <View style={styles.senderContainer}>
                            <Text style={styles.checksum}>afzender:</Text>
                            <Text style={styles.sender}>{ticket.ticketOriginatingAddress}</Text>
                        </View>
                        <Text style={styles.checksum}>{ticket.ticketChecksum}</Text>
                    </View>
                    <View style={{ flex: 8 }}/>
                    <View style={styles.iconsContainer}>
                        <Image
                            source={require("app/bus/img/ticket-vlaanderen.png")}
                        />
                        <Image
                            source={require("app/bus/img/ticket-delijn.png")}
                        />
                    </View>
                    <View style={{ flex: 10 }}/>
                </View>
                <View style={{ flex: 10 }}/>
            </View>
        );
    }

    private switchChecksumColors = () => {
        this.setState({ alternativeColors: !this.state.alternativeColors });
    }
}

const styles = StyleSheet.create({
    checksum: {
        color: deLijnColors.DARK_GREY,
        fontFamily: "FlandersArtSans-Regular",
        fontSize: 18,
        lineHeight: 30,
    },
    checksumContainer: {
        alignContent: "center",
        alignSelf: "flex-start",
        flex: 15,
        justifyContent: "center",
        padding: 20,
    },
    container: {
        backgroundColor: "white",
        flex: 210,
    },
    firstLetter: {
        color: deLijnColors.DARK_GREY,
        fontFamily: "FlandersArtSans-Bold",
    },
    horizontalContainer: {
        flex: 148,
        flexDirection: "row",
    },
    iconsContainer: {
        alignItems: "flex-end",
        flex: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        maxHeight: 100,
    },
    mainSummary: {
        color: deLijnColors.DARK_GREY,
        fontFamily: "FlandersArtSans-Bold",
        fontSize: 18,
        lineHeight: 30,
    },
    price: {
        color: deLijnColors.DARK_GREY,
        fontFamily: "FlandersArtSans-Regular",
        fontSize: 18,
    },
    quickChecksumContainer: {
        backgroundColor: deLijnColors.QUICK_CHECKSUM,
        flex: 19,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    quickChecksumText: {
        color: "white",
        fontFamily: "FlandersArtSans-Bold",
        fontSize: 25,
    },
    sender: {
        color: deLijnColors.DARK_GREY,
        fontFamily: "FlandersArtSans-Regular",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "right",
    },
    senderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    summaryContainer: {
        backgroundColor: deLijnColors.DESCRIPTION_BOX,
        flex: 65,
        justifyContent: "space-between",
        padding: 20,
    },
    summaryTitle: {
        color: deLijnColors.DARK_GREY,
        fontFamily: "FlandersArtSans-Regular",
        fontSize: 18,
    },
    ticket: {
        color: deLijnColors.M_TICKET,
        flex: 36,
        fontFamily: "FlandersArtSans-Regular",
        fontSize: 65,
        paddingHorizontal: 20,
    },
    topLine: {
        backgroundColor: deLijnColors.ACCENT,
        flex: 4,
    },
});
