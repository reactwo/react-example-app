const actual = jest.requireActual("app/bus/api/bundle-type");

import BundleTypeListReply from "./api_data/BundleTypeList.json";

export const parseParseType = actual.parseBundleType;
export const parseBundleTypeList = actual.parseBundleTypeList;

export const createMockBundleTypeList = () =>
    parseBundleTypeList(BundleTypeListReply);
export const mockBundleTypeList = createMockBundleTypeList();

export const requestBundleTypeListMock = jest.fn(async () => mockBundleTypeList);

export const requestBundleTypeList = requestBundleTypeListMock;
