import { describe, expect, it } from "vitest";
import { z } from "zod";

import { envBool, envToStrList } from "./env";

describe("env", () => {
  describe("envBool", () => {
    it('should return true for "true"', () => {
      // given
      const input = "true";

      // when
      const result = envBool.parse(input);

      // then
      expect(result).toBe(true);
    });

    it('should return false for "false"', () => {
      // given
      const input = "false";

      // when
      const result = envBool.parse(input);

      // then
      expect(result).toBe(false);
    });

    it("should return false for an empty string", () => {
      // given
      const input = "";

      // when
      const result = envBool.parse(input);

      // then
      expect(result).toBe(false);
    });

    it("should throw an error for invalid values", () => {
      // given
      const input = "invalid";

      // when / then
      expect(() => envBool.parse(input)).toThrow(z.ZodError);
    });
  });

  describe("envToStrList", () => {
    it("should return an array of strings when a valid env string is provided", () => {
      // given
      const env = "value1,value2,value3";

      // when
      const result = envToStrList(env);

      // then
      expect(result).toEqual(["value1", "value2", "value3"]);
    });

    it("should return undefined when env is undefined and no default value is provided", () => {
      // given
      const env = undefined;

      // when
      const result = envToStrList(env);

      // then
      expect(result).toBeUndefined();
    });

    it("should return the default value when env is undefined and a default value is provided", () => {
      // given
      const env = undefined;
      const defaultValue = ["default"];

      // when
      const result = envToStrList(env, defaultValue);

      // then
      expect(result).toEqual(defaultValue);
    });

    it("should filter out empty strings from the parsed env string", () => {
      // given
      const env = "value1,,value3";

      // when
      const result = envToStrList(env);

      // then
      expect(result).toEqual(["value1", "value3"]);
    });
  });
});
