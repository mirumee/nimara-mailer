import { type SQSRecord } from "aws-lambda";
import { describe, expect, test, vi } from "vitest";

import { EmailParsePayloadError } from "@/lib/emails/errors";
import { SUPPORTED_EVENTS } from "@/lib/emails/events/helpers";
import { getLogger } from "@/providers/logger";

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
        payload: {
          event: SUPPORTED_EVENTS[0],
          data: { key: "value" },
        },
        format: "any",
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
        format: "any",
        data: "How about not valid",
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
