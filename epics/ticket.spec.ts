import lolex from "lolex";

import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { toArray } from "rxjs/operators";

import { getCustomerUserInfo } from "app/account/actions/customer-user-info";
import { NoActiveSubscriptionsError } from "app/account/errors";
import * as subscriptionSelector from "app/account/selectors/subscription";
import * as errors from "app/api/errors";
import * as actions from "app/bus/actions/ticket";
import {
    mockDeliveredTicket,
    mockErrorTicket,
    mockOrderedTicket,
    mockProcessedTicket,
    mockReadTicket,
    mockTicket,
    mockTicketList,
} from "app/bus/api/__mocks__/ticket";
import {
    markTicketDelivered,
    markTicketRead,
    orderTicket,
    requestTicket,
    requestTicketList,
} from "app/bus/api/ticket";
import { Ticket } from "app/bus/types";
import {
    delayReject,
    simulateAllRequests,
} from "app/utils/tests/api";

import {
    markTicketDeliveredEpic,
    markTicketReadEpic,
    orderTicketEpic,
    processTicketEpic,
    processTicketListEpic,
    ticketEpic,
    ticketListEpic,
} from "./ticket";

import { expectEpic } from "app/utils/tests/epics";

/* Setup */

jest.mock("app/bus/api/ticket");

const clock = lolex.install();

afterAll(() => {
    clock.uninstall();
});

/* Tests */

describe("ticketListEpic", () => {
    const requestTicketListMock = requestTicketList as jest.Mock;
    const action = actions.getTicketList();
    beforeEach(() => {
        requestTicketListMock.mockClear();
        clock.reset();
    });

    it("calls requestTicketList", async (done) => {
        expectEpic(ticketListEpic)
        .on(action)
        .to(() => {
            expect(requestTicketList).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setTicketList", async (done) => {
        expectEpic(ticketListEpic)
        .on(action)
        .toEmit([actions.setTicketList(mockTicketList)], done);

        await simulateAllRequests(clock);
    });

    it("sets a TicketListError when getting the ticket list fails", async (done) => {
        const error = new errors.ApiError();

        requestTicketListMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(ticketListEpic)
        .on(action)
        .toEmit([actions.setTicketListError(error)], done);

        await simulateAllRequests(clock);
    });
});

describe("ticketEpic", () => {
    const ticketId = 1;
    const requestTicketMock = requestTicket as jest.Mock;
    const action = actions.getTicket(ticketId);
    beforeEach(() => {
        requestTicketMock.mockClear();
        clock.reset();
    });

    it("calls requestTicket", async (done) => {
        expectEpic(ticketEpic)
        .on(action)
        .to(() => {
            expect(requestTicket).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setTicket", async (done) => {
        expectEpic(ticketEpic)
        .on(action)
        .toEmit([actions.setTicket(mockTicket)], done);

        await simulateAllRequests(clock);
    });

    it("sets an error if the request failed", async (done) => {
        const error = new errors.ApiError();

        requestTicketMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(ticketEpic)
        .on(action)
        .toEmit([actions.setTicketError(ticketId, error)], done);

        await simulateAllRequests(clock);
    });
});

const getActiveSubscription = jest.spyOn(subscriptionSelector, "getActiveSubscription");
getActiveSubscription.mockImplementation(() => {
    return {
        active: true,
        contract: 1,
        enabled: true,
        id: 1,
        includeToken: false,
        prepaidOnly: false,
        user: 1,
        vehicle: 1,
    };
});

describe("orderTicketEpic", () => {
    const ticketTypeId = 1;
    const msisdn = "32471376935";
    const acceptTermsAndConditions = true;

    const orderTicketMock = orderTicket as jest.Mock;
    const action = actions.orderTicket(ticketTypeId, msisdn, acceptTermsAndConditions);
    beforeEach(() => {
        orderTicketMock.mockClear();
        clock.reset();
    });

    it("calls orderTicket", async (done) => {
        expectEpic(orderTicketEpic)
        .on(action)
        .to(() => {
            expect(orderTicket).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("it sets the ticket and updates the userinfo", async (done) => {
        expectEpic(orderTicketEpic)
        .on(action)
        .toEmit([
            actions.setOrderTicketSuccesful(mockOrderedTicket),
            getCustomerUserInfo(),
        ], done);

        await simulateAllRequests(clock);
    });

    it("sets a NoActiveSubscriptionsError when ordering a ticket without having a subscription", async (done) => {
        const error = new NoActiveSubscriptionsError();
        getActiveSubscription.mockImplementationOnce(() => {
            return null;
        });

        expectEpic(orderTicketEpic)
        .on(action)
        .toEmit([actions.setOrderTicketError(error)], done);

        await simulateAllRequests(clock);
    });

    it("sets an error if the request failed", async (done) => {
        const error = new errors.ApiError();

        orderTicketMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(orderTicketEpic)
        .on(action)
        .toEmit([actions.setOrderTicketError(error)], done);

        await simulateAllRequests(clock);
    });
});

describe("markTicketDeliveredEpic", () => {
    const ticketId = 1;

    const markTicketDeliveredMock = markTicketDelivered as jest.Mock;
    const action = actions.markTicketDelivered(ticketId);
    beforeEach(() => {
        markTicketDeliveredMock.mockClear();
        clock.reset();
    });

    it("calls the markTicketDelivered API", async (done) => {
        expectEpic(markTicketDeliveredEpic)
        .on(action)
        .to(() => {
            expect(markTicketDelivered).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setTicket", async (done) => {
        expectEpic(markTicketDeliveredEpic)
        .on(action)
        .toEmit([actions.setTicket(mockDeliveredTicket)], done);

        await simulateAllRequests(clock);
    });

    it("sets an error if the request failed", async (done) => {
        const error = new errors.ApiError();

        markTicketDeliveredMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(markTicketDeliveredEpic)
        .on(action)
        .toEmit([], done);

        await simulateAllRequests(clock);
    });
});

describe("markTicketReadEpic", () => {
    const ticketId = 1;

    const markTicketReadMock = markTicketRead as jest.Mock;
    const action = actions.markTicketRead(ticketId);
    beforeEach(() => {
        markTicketReadMock.mockClear();
        clock.reset();
    });

    it("calls the markTicketRead API", async (done) => {
        expectEpic(markTicketReadEpic)
        .on(action)
        .to(() => {
            expect(markTicketRead).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setTicket", async (done) => {
        expectEpic(markTicketReadEpic)
        .on(action)
        .toEmit([actions.setTicket(mockReadTicket)], done);

        await simulateAllRequests(clock);
    });

    it("sets an error if the request failed", async (done) => {
        const error = new errors.ApiError();

        markTicketReadMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(markTicketReadEpic)
        .on(action)
        .toEmit([], done);

        await simulateAllRequests(clock);
    });
});

describe("processTicketEpic", () => {
    const epic = (ticket: Ticket) => {
        const action$ = ActionsObservable.of(
            actions.setTicket(ticket),
        );
        return processTicketEpic(
            action$,
            new StateObservable(new Subject(), {}),
            null,
        );
    };

    beforeEach(() => {
        clock.reset();
    });

    it("refetches a ticket in the ordered state after 2s", async (done) => {
        const startTime = new Date().getTime();

        epic(mockOrderedTicket).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    // Wait 2 seconds
                    expect(new Date().getTime() - startTime).toBe(2000);
                    expect(actionList).toEqual([
                        actions.getTicket(mockOrderedTicket.id),
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("marks a ticket in the processed state as delivered", async (done) => {
        epic(mockProcessedTicket).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([
                        actions.markTicketDelivered(mockProcessedTicket.id),
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("marks a ticket in the delivered state as read", async (done) => {
        epic(mockDeliveredTicket).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([
                        actions.markTicketRead(mockDeliveredTicket.id),
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("ignores a ticket in the read state", async (done) => {
        epic(mockReadTicket).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("ignores a ticket in the error state", async (done) => {
        epic(mockErrorTicket).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

});

describe("processTicketListEpic", () => {
    const epic = (tickets: Ticket[]) => {
        const action$ = ActionsObservable.of(
            actions.setTicketList({
                count: tickets.length,
                next: null,
                previous: null,
                results: tickets,
            }),
        );
        return processTicketListEpic(
            action$,
            new StateObservable(new Subject(), {}),
            null,
        );
    };

    const clone = (ticket: Ticket) =>
        Object.assign({}, ticket, {id: ticket.id + 1});

    const mockOrderedTicket2 = clone(mockOrderedTicket);
    const mockProcessedTicket2 = clone(mockProcessedTicket);
    const mockDeliveredTicket2 = clone(mockDeliveredTicket);

    beforeEach(() => {
        clock.reset();
    });

    it("refetches tickets in the ordered state after 2s", async (done) => {
        const startTime = new Date().getTime();

        epic([mockOrderedTicket, mockOrderedTicket2]).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    // Wait 2 seconds
                    expect(new Date().getTime() - startTime).toBe(2000);
                    expect(actionList).toEqual([
                        actions.getTicket(mockOrderedTicket.id),
                        actions.getTicket(mockOrderedTicket2.id),
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("marks tickets in the processed state as delivered", async (done) => {
        epic([mockProcessedTicket,
              mockProcessedTicket2]).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([
                        actions.markTicketDelivered(mockProcessedTicket.id),
                        actions.markTicketDelivered(mockProcessedTicket2.id),
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("marks tickets in the delivered state as read", async (done) => {
        epic([mockDeliveredTicket,
              mockDeliveredTicket2]).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([
                        actions.markTicketRead(mockDeliveredTicket.id),
                        actions.markTicketRead(mockDeliveredTicket2.id),
                    ]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

    it("ignores tickets in the read and error state", async (done) => {
        epic([mockReadTicket, mockErrorTicket]).pipe(toArray()).subscribe(
            (actionList) => {
                try {
                    expect(actionList).toEqual([]);
                    done();
                } catch (e) {
                    done.fail(e);
                }
            },
            done.fail,
        );

        await simulateAllRequests(clock);
    });

});
