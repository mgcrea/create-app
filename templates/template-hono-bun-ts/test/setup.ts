import { expect } from "bun:test";
import "src/utils/debug";

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = typeof received === "number" && received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `Expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R;
}
declare module "bun:test" {
  interface Matchers<T> extends CustomMatchers<T> {}
  interface AsymmetricMatchers extends CustomMatchers {}
}
