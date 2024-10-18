import { describe, expect, it } from "vitest";

import { isURL } from "./utils";

describe("utils", () => {
  describe("isURL", () => {
    it("should return true for a valid URL", () => {
      // given
      const validUrl = "http://example.com";

      // when
      const result = isURL(validUrl);

      // then
      expect(result).toBe(true);
    });

    it("should return false for an invalid URL", () => {
      // given
      const invalidUrl = "not a valid url";

      // when
      const result = isURL(invalidUrl);

      // then
      expect(result).toBe(false);
    });

    it("should return false for an empty string", () => {
      // given
      const emptyString = "";

      // when
      const result = isURL(emptyString);

      // then
      expect(result).toBe(false);
    });

    it("should return true for a valid URL with query parameters", () => {
      // given
      const validUrlWithParams = "https://example.com?query=test";

      // when
      const result = isURL(validUrlWithParams);

      // then
      expect(result).toBe(true);
    });

    it("should return false for a malformed URL", () => {
      // given
      const malformedUrl = "http://example.com:port";

      // when
      const result = isURL(malformedUrl);

      // then
      expect(result).toBe(false);
    });
  });
});
