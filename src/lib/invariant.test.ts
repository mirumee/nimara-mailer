import { describe, expect, test } from "vitest";

import { invariant } from "./invariant";

describe("invariant", () => {
  test("It should raise an error if invariant fails.", () => {
    expect(() => invariant(false, "Ops!")).toThrowError("Ops!");
  });

  test("It should raise with default message if invariant fails with no message passed.", () => {
    expect(() => invariant(false)).toThrowError("Invariant error.");
  });

  test("It should not throw an error if invariant succeed.", () => {
    expect(() => invariant(true)).not.toThrowError("Ops!");
  });
});
