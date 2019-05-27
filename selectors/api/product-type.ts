import { getBusState } from "app/bus/selectors/common";
import { ProductType } from "app/bus/types/enums";
import { State } from "app/modules";

export const getSelectedProductType = (state: State): ProductType => {
    const productType = getBusState(state).selectedProductType;
    return productType as ProductType;
};
