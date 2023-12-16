/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMock } from "@golevelup/ts-jest";
import { DynamicConfigService } from "../../src/config/dynamic-config.service";

export const provideMockService =
  <T extends abstract new (...args: any) => any>(token: T) =>
  (partial?: Partial<InstanceType<T>>) => ({
    provide: token,
    useFactory: () => createMock<InstanceType<T>>(partial || {}),
  });

export const provideMockDynamicConfigService =
  provideMockService(DynamicConfigService);
