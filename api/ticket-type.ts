import { requestData } from "app/api/client";
import { parseResultList } from "app/api/parse";
import { TicketType } from "app/bus/types";
import { objKeysToCamelCase } from "app/utils";

export function parseTicketType(raw: any) {
    raw = objKeysToCamelCase(raw);
    if (raw.lastUpdated) {
        raw.lastUpdated = new Date(raw.lastUpdated);
    }
    if (raw.validFrom) {
        raw.validFrom = new Date(raw.validFrom);
    }
    return raw as TicketType;
}

export function parseTicketTypeList(raw: any[]) {
    return parseResultList(parseTicketType, raw);
}

export async function requestTicketTypeList() {
    return parseTicketTypeList(await requestData("/user/bus/tickettypes"));
}
