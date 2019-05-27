import { parseBundleType } from "app/bus/api/bundle-type";
import bundleTypeData from "./BundleType.json";

/* mock Bundle Type */
export const mockBundleType = parseBundleType({
    ...bundleTypeData,
});
