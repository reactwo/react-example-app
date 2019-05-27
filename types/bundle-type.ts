import { ModelInstance } from "app/api/types";
import { ValidityUnit } from "./enums";

/* Models */

export interface BundleTicketType extends ModelInstance {
    readonly serviceId: number;
    readonly lastUpdated: Date;
    readonly validFrom: Date | null;
    readonly validUntil: Date | null;
    readonly operatorPhone: number | null;
    readonly type: string;
    readonly sku: string;
    readonly ticketTypeId: string;
    readonly verboseName: string;
    readonly ticketTypeName: string;
    readonly validityValue: number;
    readonly validityUnit: ValidityUnit;
}

export interface BundleType extends ModelInstance {
    readonly serviceId: number;
    readonly lastUpdated: Date;
    readonly validFrom: Date | null;
    readonly validUntil: Date | null;
    readonly operatorPhone: number | null;
    readonly type: string;
    readonly sku: string;
    readonly bundleTypeName: string;
    readonly bundleTypeCode: string;
    readonly verboseName: string;
    readonly expirationDate: Date | null;
    readonly validityValue: number;
    readonly validityUnit: ValidityUnit;
    readonly ticketCount: number;
    readonly tariff: number;
    readonly vat: number;
    readonly ticketType: BundleTicketType;
}
