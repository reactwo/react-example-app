import { ModelInstance } from "app/api/types";
import { BundleTicketType } from "./bundle-type";
import { TicketStatus } from "./enums";
import { Message } from "./ticket";

export { TicketStatus };

/* Models */

export interface ActivatedTicketBundle extends ModelInstance {
    readonly bundleId: number;
    readonly subscriptionId: number;
    readonly msisdn: string;
    readonly errorCode: string | null;
    readonly errorDescription: string | null;
    readonly status: TicketStatus;
    readonly orderTime: Date;
    readonly ticketType: BundleTicketType;
    readonly priceExcl: number;
    readonly priceIncl: number;
    readonly vat: number;
    readonly currency: string;
    readonly bundleSerial: string;
    readonly deliveryTime: Date | null;
    readonly readTime: Date | null;
    readonly ticketMsgId: number | null;
    readonly ticketValidityStart: Date | null;
    readonly ticketValidityEnd: Date | null;
    readonly ticketMessage: string | null;
    readonly ticketSerial: string | null;
    readonly ticketChecksum: string | null;
    readonly ticketQuickChecksum: string | null;
    readonly ticketOriginatingAddress: string | null;
    readonly ticketDaycode: string | null;
    readonly messages: Message[];
}
