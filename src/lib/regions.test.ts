import { describe, expect, test, vi } from "vitest";

import { CONFIG } from "@/config";

import { DEFAULT_REGION, getRegion, REGIONS } from "./regions";

describe("regions", () => {
  describe("getRegion", () => {
    test("should return the correct region for a valid slug", () => {
      // given
      const validSlug = "channel-us";

      // when
      const result = getRegion(validSlug);

      // then
      expect(result).toEqual(REGIONS.US);
    });

    test("should return the default region when slug is not found", () => {
      // given
      const invalidSlug = "channel-invalid";

      // when
      const result = getRegion(invalidSlug);

      // then
      expect(result).toEqual(DEFAULT_REGION);
    });

    test("should throw an error if no default region exists in CONFIG", () => {
      // given
      const invalidSlug = "channel-invalid";
      const originalDefaultRegion = CONFIG.DEFAULT_REGION;
      vi.spyOn(CONFIG, "DEFAULT_REGION", "get").mockReturnValue(
        undefined as any
      );

      // when / then
      expect(() => getRegion(invalidSlug)).toThrow(
        `Region not found for channel slug ${invalidSlug}.`
      );

      // Clean up
      vi.spyOn(CONFIG, "DEFAULT_REGION", "get").mockReturnValue(
        originalDefaultRegion
      );
    });

    test("should return region even if slug case is different", () => {
      // given
      const slugWithDifferentCase = "CHANNEL-UK";

      // when
      const result = getRegion(slugWithDifferentCase.toLowerCase());

      // then
      expect(result).toEqual(REGIONS.GB);
    });
  });
});
