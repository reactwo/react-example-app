jest.mock("app/bus/api/bundle-type");

import lolex from "lolex";

import * as errors from "app/api/errors";
import * as actions from "app/bus/actions/bundle-type";
import { mockBundleTypeList } from "app/bus/api/__mocks__/bundle-type";
import { requestBundleTypeList } from "app/bus/api/bundle-type";
import {
    delayReject,
    simulateAllRequests,
} from "app/utils/tests/api";

import { bundleTypeEpic } from "./bundle-type";

import { expectEpic } from "app/utils/tests/epics";

const clock = lolex.install();

afterAll(() => {
    clock.uninstall();
});

describe("bundleTypeEpic", () => {
    const requestBundleTypeMock = requestBundleTypeList as jest.Mock;
    const action = actions.getBundleTypeList();
    beforeEach(() => {
        requestBundleTypeMock.mockClear();
        clock.reset();
    });


    it("calls requestBundleTypeList", async (done) => {
        expectEpic(bundleTypeEpic)
        .on(action)
        .to(() => {
            expect(requestBundleTypeList).toHaveBeenCalledTimes(1);
        }, done);

        await simulateAllRequests(clock);
    });

    it("emits setBundleTypeList", async (done) => {
        expectEpic(bundleTypeEpic)
        .on(action)
        .toEmit([actions.setBundleTypeList(mockBundleTypeList)], done);

        await simulateAllRequests(clock);
    });

    it("sets an error if the request failed", async (done) => {
        const error = new errors.ApiError();

        requestBundleTypeMock.mockImplementationOnce(
            () => delayReject(1000, error),
        );

        expectEpic(bundleTypeEpic)
        .on(action)
        .toEmit([actions.setBundleTypeListError(error)], done);

        await simulateAllRequests(clock);
    });
});
