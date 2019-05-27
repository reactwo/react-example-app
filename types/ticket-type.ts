import { ModelInstance } from "app/api/types";
import { ValidityUnit } from "./enums";

/* Models */
export interface TicketType extends ModelInstance {
    readonly id: number;
    readonly service: number;
    readonly lastUpdated: Date;
    readonly validFrom: Date | null;
    readonly operatorPhone: number | null;
    readonly type: string;
    readonly ticketTypeCode: string;
    readonly sku: string;
    readonly verboseName: string;
    readonly ticketTypeName: string;
    readonly validityMinutes: number;
    readonly validityValue: number;
    readonly validityUnit: ValidityUnit;
    readonly validUntil: Date | null;
    readonly tariff: number;
    readonly vat: number;
}
