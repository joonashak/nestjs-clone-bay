/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMock } from "@golevelup/ts-jest";

export const provideMockService =
  <T extends abstract new (...args: any) => any>(token: T) =>
  (partial?: Partial<InstanceType<T>>) => ({
    provide: token,
    useFactory: () => createMock<InstanceType<T>>(partial || {}),
  });
