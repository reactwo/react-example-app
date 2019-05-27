import { Action } from "redux";

import { ProductType } from "app/bus/types/enums";
/* Action types */

export const SELECT_PRODUCT_TYPE = "bus.SELECT_PRODUCT_TYPE";

type SELECT_PRODUCT_TYPE = typeof SELECT_PRODUCT_TYPE;

/* Actions */

export interface SelectProductTypeAction extends Action<SELECT_PRODUCT_TYPE> {
    productType: string;
}

/* Action Creators */

export function selectProductType(
    productType: ProductType,
): SelectProductTypeAction {
    return {
        type: SELECT_PRODUCT_TYPE,

        productType,
    };
}
