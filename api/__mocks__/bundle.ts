import { TicketStatus } from "app/bus/types";
import { delayResolve } from "app/utils/tests/api";
import ActivatedTicket from "./api_data/ActivatedTicket.json";
import BundleList from "./api_data/BundleList.json";

const actual = jest.requireActual("app/bus/api/bundle");

export const parseBundle = actual.parseBundle;
export const parseBundleList = actual.parseBundleList;
export const parseActivatedBundleTicket = actual.parseActivatedBundleTicket;

/* Bundle List */
export const createMockBundleList = () => parseBundleList(BundleList);
export const mockBundleList = createMockBundleList();
export const requestBundleListMock = jest.fn(() => delayResolve(1000, mockBundleList));
export const requestBundleList = requestBundleListMock;

/* Bundle */
export const createMockBundle = () => parseBundle(BundleList.results[0]);
export const mockBundle = createMockBundle();

/* Activated ticket */
export const createMockActivatedTicket = () => parseActivatedBundleTicket(ActivatedTicket);
export const mockActivatedTicket = createMockActivatedTicket();
export const requestActivateBundleTicket = jest.fn(() => delayResolve(1000, mockActivatedTicket));

/* Ordered Bundle */
export const mockOrderedBundle = createMockBundle();
mockOrderedBundle.status = TicketStatus.ORDERED;

/* Error Bundle */
export const mockErrorBundle = createMockBundle();
mockErrorBundle.status = TicketStatus.ERROR;

/* Bundle API */
export const requestBundleMock = jest.fn(() => delayResolve(1000, mockBundle));
export const requestBundle = requestBundleMock;

export const orderBundleMock = jest.fn(() => delayResolve(1000, mockOrderedBundle));
export const orderBundle = orderBundleMock;
