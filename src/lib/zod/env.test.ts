import { describe, expect, test } from "vitest";
import { z } from "zod";

import { envBool, envToStrList } from "./env";

describe("env", () => {
  describe("envBool", () => {
    test('should return true for "true"', () => {
      // given
      const input = "true";

      // when
      const result = envBool.parse(input);

      // then
      expect(result).toBe(true);
    });

    test('should return false for "false"', () => {
      // given
      const input = "false";

      // when
      const result = envBool.parse(input);

      // then
      expect(result).toBe(false);
    });

    test("should return false for an empty string", () => {
      // given
      const input = "";

      // when
      const result = envBool.parse(input);

      // then
      expect(result).toBe(false);
    });

    test("should throw an error for invalid values", () => {
      // given
      const input = "invalid";

      // when / then
      expect(() => envBool.parse(input)).toThrow(z.ZodError);
    });
  });

  describe("envToStrList", () => {
    test("should return an array of strings for a valid comma-separated string", () => {
      // given
      const input = "value1,value2,value3";

      // when
      const result = envToStrList(input);

      // then
      expect(result).toEqual(["value1", "value2", "value3"]);
    });

    test("should return an empty array when env is undefined and defaultEmpty is false", () => {
      // given
      const input = undefined;
      const defaultEmpty = false;

      // when
      const result = envToStrList(input, defaultEmpty);

      // then
      expect(result).toEqual([]);
    });

    test("should return undefined when env is undefined and defaultEmpty is true", () => {
      // given
      const input = undefined;
      const defaultEmpty = true;

      // when
      const result = envToStrList(input, defaultEmpty);

      // then
      expect(result).toBeUndefined();
    });

    test("should filter out empty values in a comma-separated string", () => {
      // given
      const input = "value1,,value3";

      // when
      const result = envToStrList(input);

      // then
      expect(result).toEqual(["value1", "value3"]);
    });

    test("should return an empty array when env is an empty string", () => {
      // given
      const input = "";

      // when
      const result = envToStrList(input);

      // then
      expect(result).toEqual([]);
    });
  });
});
