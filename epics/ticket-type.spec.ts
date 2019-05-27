jest.mock("app/bus/api/ticket-type");

import lolex from "lolex";

import * as errors from "app/api/errors";
import * as actions from "app/bus/actions/ticket-type";
import { mockTicketTypeList } from "app/bus/api/__mocks__/ticket-type";
import { requestTicketTypeList } from "app/bus/api/ticket-type";
import {
    delayReject,
    simulateAllRequests,
} from "app/utils/tests/api";

import { ticketTypeEpic } from "./ticket-type";

import { expectEpic } from "app/utils/tests/epics";

const clock = lolex.install();

afterAll(() => {
    clock.uninstall();
});

describe("ticketTypeEpic", () => {
    const requestTicketTypeMock = requestTicketTypeList as jest.Mock;
    const action = actions.getTicketTypeList();
    beforeEach(() => {
        requestTicketTypeMock.mockClear();
        clock.reset();
    });

    it("calls requestTicketTypeList", async (done) => {
        expectEpic(ticketTypeEpic)
        .on(action)
        .to(() => {
            expect(requestTicketTypeList).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setTicketTypeList", async (done) => {
        expectEpic(ticketTypeEpic)
        .on(action)
        .toEmit([actions.setTicketTypeList(mockTicketTypeList)], done);

        await simulateAllRequests(clock);
    });

    it("sets a TicketTypeListError when getting the tickettype list fails", async (done) => {
        const error = new errors.ApiError();

        requestTicketTypeMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(ticketTypeEpic)
        .on(action)
        .toEmit([actions.setTicketTypeListError(error)], done);

        await simulateAllRequests(clock);
    });
});
