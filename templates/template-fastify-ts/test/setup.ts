import "src/utils/debug";
import { expect } from "vitest";

expect.extend({
  stringMatchingId(received) {
    if (/^[1-9]\d*$/.test(received)) {
      return {
        message: () => `expected ${received} not to be a valid id (int)`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid id (int)`,
        pass: false,
      };
    }
  },
});

interface CustomMatchers<R = unknown> {
  stringMatchingId(): R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
