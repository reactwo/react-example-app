import { Epic, ofType } from "redux-observable";
import { map, mergeMap } from "rxjs/operators";

import { ApiError } from "app/api/errors";
import { apiRequest } from "app/api/rxjs";
import {
    GET_TICKET_TYPE_LIST,
    setTicketTypeList,
    setTicketTypeListError,
} from "app/bus/actions/ticket-type";
import { requestTicketTypeList } from "app/bus/api/ticket-type";
import { handleError, logError } from "app/utils/rxjs";

export const ticketTypeEpic: Epic = (action$) =>
    action$.pipe(
        ofType(GET_TICKET_TYPE_LIST),
        mergeMap(() =>
            apiRequest(requestTicketTypeList)
            .pipe(
                map(setTicketTypeList),
                handleError(ApiError, setTicketTypeListError),
                logError(),
            ),
        ),
    );

export default ticketTypeEpic;
