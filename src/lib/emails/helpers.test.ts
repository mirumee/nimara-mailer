import { describe, expect, it } from "vitest";

import { isEmailAllowed } from "./helpers";

describe("helpers", () => {
  describe("isEmailAllowed", () => {
    it("should return false if allowedDomains is empty", () => {
      // given
      const email = "user@example.com";
      const allowedDomains: string[] = [];

      // when
      const result = isEmailAllowed({ email, allowedDomains });

      // then
      expect(result).toBe(false);
    });

    it("should return true if allowedDomains is not defined", () => {
      // given
      const email = "user@example.com";
      const allowedDomains = undefined;

      // when
      const result = isEmailAllowed({ email, allowedDomains });

      // then
      expect(result).toBe(true);
    });

    it("should return true if the email domain is allowed", () => {
      // given
      const email = "user@example.com";
      const allowedDomains = ["example.com"];

      // when
      const result = isEmailAllowed({ email, allowedDomains });

      // then
      expect(result).toBe(true);
    });

    it("should return false if the email domain is not allowed", () => {
      // given
      const email = "user@notallowed.com";
      const allowedDomains = ["example.com"];

      // when
      const result = isEmailAllowed({ email, allowedDomains });

      // then
      expect(result).toBe(false);
    });

    it("should return true if the email domain matches one of the allowed domains", () => {
      // given
      const email = "user@another.com";
      const allowedDomains = ["example.com", "another.com"];

      // when
      const result = isEmailAllowed({ email, allowedDomains });

      // then
      expect(result).toBe(true);
    });

    it("should return false if the email domain does not match any of the allowed domains", () => {
      // given
      const email = "user@disallowed.com";
      const allowedDomains = ["example.com", "another.com"];

      // when
      const result = isEmailAllowed({ email, allowedDomains });

      // then
      expect(result).toBe(false);
    });
  });
});
