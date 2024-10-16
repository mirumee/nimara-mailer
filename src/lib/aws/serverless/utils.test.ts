import { type SQSRecord } from "aws-lambda";
import { describe, expect, test, vi } from "vitest";

import { EmailParsePayloadError } from "@/lib/emails/errors";
import { getLogger } from "@/providers/logger"; // Mock the logger provider

import { parseRecord } from "./utils";

describe("utils", () => {
  describe("parseRecord", () => {
    vi.mock("@/providers/logger", () => {
      const mockLogger = {
        error: vi.fn(),
      };

      return {
        getLogger: () => mockLogger,
      };
    });

    test("should parse valid record and return data", () => {
      // given
      const data = {
        event: "some_event",
        data: { key: "value" },
      };
      const validRecord = {
        Body: JSON.stringify(data),
      } as any as SQSRecord;

      // when
      const result = parseRecord(validRecord);

      // when
      expect(result).toEqual(data);
    });

    test("should log and throw error when parsing fails", () => {
      // given
      const invalidRecord = {
        Body: "{invalidJson",
      } as any as SQSRecord;
      const logger = getLogger();

      // when & then
      expect(() => parseRecord(invalidRecord)).toThrow(EmailParsePayloadError);
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to parse record payload.",
        expect.objectContaining({
          record: invalidRecord,
          error: expect.any(Error),
        })
      );
    });
  });
});
