jest.mock("app/bus/api/bundle");

import { getCustomerUserInfo } from "app/account/actions/customer-user-info";
import { NoActiveSubscriptionsError } from "app/account/errors";
import * as subscriptionSelector from "app/account/selectors/subscription";
import * as errors from "app/api/errors";
import * as actions from "app/bus/actions/bundle";
import {
    mockBundle,
    mockBundleList,
    mockOrderedBundle,
} from "app/bus/api/__mocks__/bundle";
import {
    orderBundle,
    requestBundle,
    requestBundleList,
} from "app/bus/api/bundle";
import {
    delayReject,
    simulateAllRequests,
} from "app/utils/tests/api";
import lolex from "lolex";
import {
    bundleEpic,
    bundleListEpic,
    orderBundleEpic,
} from "./bundle";

/* Setup */

import { expectEpic } from "app/utils/tests/epics";

const clock = lolex.install();

afterAll(() => {
    clock.uninstall();
});

/* Tests */

describe("bundleListEpic", () => {
    const requestBundleListMock = requestBundleList as jest.Mock;
    const action = actions.getBundleList();
    beforeEach(() => {
        requestBundleListMock.mockClear();
        clock.reset();
    });

    it("calls requestBundleList", async (done) => {
        expectEpic(bundleListEpic)
        .on(action)
        .to(() => {
            expect(requestBundleList).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setBundleList", async (done) => {
        expectEpic(bundleListEpic)
        .on(action)
        .toEmit([actions.setBundleList(mockBundleList)], done);

        await simulateAllRequests(clock);
    });

    it("sets a BundleListError when getting the ticket list fails", async (done) => {
        const error = new errors.ApiError();

        requestBundleListMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(bundleListEpic)
        .on(action)
        .toEmit([actions.setBundleListError(error)], done);

        await simulateAllRequests(clock);
    });
});

describe("bundleEpic", () => {
    const bundleId = 1;
    const requestBundleMock = requestBundle as jest.Mock;
    const action = actions.getBundle(bundleId);
    beforeEach(() => {
        requestBundleMock.mockClear();
        clock.reset();
    });

    it("calls requestBundle", async (done) => {
        expectEpic(bundleEpic)
        .on(action)
        .to(() => {
            expect(requestBundle).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setBundle", async (done) => {
        expectEpic(bundleEpic)
        .on(action)
        .toEmit([actions.setBundle(mockBundle)], done);

        await simulateAllRequests(clock);
    });

    it("sets a BundleError when getting a bundle fails", async (done) => {
        const error = new errors.ApiError();

        requestBundleMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(bundleEpic)
        .on(action)
        .toEmit([actions.setBundleError(bundleId, error)], done);

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

describe("orderBundleEpic", () => {
    const bundleTypeId = 1;
    const msisdn = "32471376935";
    const acceptTermsAndConditions = true;

    const orderBundleMock = orderBundle as jest.Mock;
    const action = actions.orderBundle(bundleTypeId, msisdn, acceptTermsAndConditions);
    beforeEach(() => {
        orderBundleMock.mockClear();
        clock.reset();
    });

    it("calls orderBundle", async (done) => {
        expectEpic(orderBundleEpic)
        .on(action)
        .to(() => {
            expect(orderBundle).toHaveBeenCalledTimes(1);
        }, done);
        await simulateAllRequests(clock);
    });

    it("it sets the bundle and updates the userinfo", async (done) => {
        expectEpic(orderBundleEpic)
        .on(action)
        .toEmit([
            actions.setOrderBundleSuccesful(mockOrderedBundle),
            getCustomerUserInfo(),
        ], done);

        await simulateAllRequests(clock);
    });

    it("sets a NoActiveSubscriptionsError when ordering a bundle without having a subscription", async (done) => {
        const error = new NoActiveSubscriptionsError();
        getActiveSubscription.mockImplementationOnce(() => {
            return null;
        });

        expectEpic(orderBundleEpic)
        .on(action)
        .toEmit([actions.setOrderBundleError(error)], done);

        await simulateAllRequests(clock);
    });

    it("sets a orderBundleError when ordering a bundle fails", async (done) => {
        const error = new errors.ApiError();

        orderBundleMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(orderBundleEpic)
        .on(action)
        .toEmit([actions.setOrderBundleError(error)], done);

        await simulateAllRequests(clock);
    });
});
