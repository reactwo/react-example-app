import { Epic, ofType } from "redux-observable";
import { map, mergeMap } from "rxjs/operators";

import { ApiError } from "app/api/errors";
import { apiRequest } from "app/api/rxjs";
import {
    GET_BUNDLE_TYPE_LIST,
    setBundleTypeList,
    setBundleTypeListError,
} from "app/bus/actions/bundle-type";
import { requestBundleTypeList } from "app/bus/api/bundle-type";
import { handleError, logError } from "app/utils/rxjs";

export const bundleTypeEpic: Epic = (action$) =>
    action$.pipe(
        ofType(GET_BUNDLE_TYPE_LIST),
        mergeMap(() =>
            apiRequest(requestBundleTypeList)
            .pipe(
                map(setBundleTypeList),
                handleError(ApiError, setBundleTypeListError),
                logError(),
            ),
        ),
    );

export default bundleTypeEpic;
