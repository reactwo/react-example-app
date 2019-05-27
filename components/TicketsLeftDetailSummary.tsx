import { defaultColors } from "app/styles/default/colors";
import { tint } from "polished";
import React from "react";
import {
    StyleSheet,
    Text,
} from "react-native";

export interface TicketsLeftDetailSummaryProps {
    totalTicketsLeft: number;
    totalTicketsCount: number;
}

export default class TicketsLeftDetailSummary extends React.PureComponent<TicketsLeftDetailSummaryProps> {
    public render() {
        return (
            <Text style={styles.ticketCountRow}>{this.props.totalTicketsLeft}
                <Text style={styles.ticketCountRowLeft}> / {this.props.totalTicketsCount}</Text>
            </Text>
        );
    }
}

const styles = StyleSheet.create({

    ticketCountRow: {
        fontSize: 15,
        fontWeight: "500",
    },
    ticketCountRowLeft: {
        color: tint(0.70, defaultColors.SECONDARY),
    },
});
