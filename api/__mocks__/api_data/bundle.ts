import {
    parseBundle,
} from "app/bus/api/bundle";

import bundleData from "./Bundle.json";

/* Mock Bundle */
export const mockBundle = parseBundle({
    ...bundleData,
});

/* Mock Bundle */
export const readBundle = parseBundle({
    ...bundleData,
});

/* Ordered Bundle */
export const orderedBundle = parseBundle({
    ...bundleData,
    status: "ordered",
});
