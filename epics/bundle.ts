import {
    combineEpics,
    Epic,
    ofType,
} from "redux-observable";
import { REHYDRATE } from "redux-persist";
import { throwError } from "rxjs";
import {
    exhaustMap,
    map,
    mergeMap,
    switchMap,
    withLatestFrom,
} from "rxjs/operators";

import { getCustomerUserInfo } from "app/account/actions/customer-user-info";
import { NoActiveSubscriptionsError } from "app/account/errors";
import { getActiveSubscription } from "app/account/selectors/subscription";
import { LOGIN_SUCCESFUL } from "app/api/actions";
import { ApiError } from "app/api/errors";
import { apiRequest } from "app/api/rxjs";
import * as bundleActions from "app/bus/actions/bundle";
import * as bundleApi from "app/bus/api/bundle";
import { State } from "app/modules";
import {
    handleError,
    logError,
} from "app/utils/rxjs";

export const bundleListEpic: Epic = (action$) =>
    action$.pipe(
        ofType(bundleActions.GET_BUNDLE_LIST, LOGIN_SUCCESFUL, REHYDRATE),
        switchMap(() =>
            apiRequest(bundleApi.requestBundleList)
            .pipe(
                map(bundleActions.setBundleList),
                handleError(ApiError, bundleActions.setBundleListError),
                logError(),
            ),
        ),
    );

export const bundleEpic: Epic = (action$) =>
    action$.pipe(
        ofType(bundleActions.GET_BUNDLE),
        mergeMap((action) =>
            apiRequest(() => bundleApi.requestBundle(action.id))
            .pipe(
                map(bundleActions.setBundle),
                handleError(ApiError,
                            (error) => bundleActions.setBundleError(action.id, error)),
                logError(),
            ),
        ),
    );

function tryOrderBundle(action: bundleActions.OrderBundleAction, state: State) {
    const subscription = getActiveSubscription(state);
    if (subscription === null) {
        return throwError(new NoActiveSubscriptionsError());
    } else {
        return apiRequest(
            () => bundleApi.orderBundle({
                acceptTermsAndConditions: action.acceptTermsAndConditions,
                bundleTypeId: action.bundleTypeId,
                msisdn: action.msisdn,
                subscriptionId: subscription.id,
            }),
            {retryAttempts: 3},
        );
    }
}

export const orderBundleEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType<bundleActions.OrderBundleAction>(bundleActions.ORDER_BUNDLE),
        withLatestFrom(state$),
        exhaustMap(([action, state]) =>
            tryOrderBundle(action, state).pipe(
                mergeMap((bundle) =>
                    [bundleActions.setOrderBundleSuccesful(bundle), getCustomerUserInfo()],
                ),
                handleError(ApiError, bundleActions.setOrderBundleError),
                logError(),
            ),
        ),
    );

export default combineEpics(
    bundleListEpic,
    bundleEpic,
    orderBundleEpic,
);
