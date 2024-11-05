import { type SQSRecord } from "aws-lambda";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { EMAIL_EVENTS } from "@/const";

import { ParsePayloadError } from "./errors/serverless";
import { parsePayload, parseRecord, serializePayload } from "./payload";

describe("payload", () => {
  describe("serializePayload", () => {
    it("should serialize payload correctly when valid data is provided", () => {
      // given
      const mockData = { key: "value" };
      const mockEvent = EMAIL_EVENTS[0];

      // when
      const serialized = serializePayload({
        data: mockData,
        event: mockEvent,
      });

      // then
      expect(serialized).toEqual({
        format: expect.any(String),
        payload: {
          event: mockEvent,
          data: mockData,
        },
      });
    });

    it("should throw an error when invalid event is provided", () => {
      // given
      const mockData = { key: "value" };
      const invalidEvent = "invalid_event";

      // when & then
      expect(() => {
        serializePayload({
          data: mockData,
          event: invalidEvent as any,
        });
      }).toThrow(z.ZodError);
    });

    it("should throw an error when invalid data format is provided", () => {
      // given
      const invalidData = null;
      const mockEvent = "order_created";

      // when / then
      expect(() => {
        serializePayload({
          data: invalidData as any,
          event: mockEvent,
        });
      }).toThrow(z.ZodError);
    });
  });

  describe("parsePayload", () => {
    it("should successfully parse valid payload data", () => {
      // given
      const validData = {
        format: "json",
        payload: {
          event: "order_created",
          data: { key: "value" },
        },
      };

      // when
      const parsedData = parsePayload(validData);

      // then
      expect(parsedData).toEqual(validData);
    });

    it("should throw an error when wrong data is passed", () => {
      // given
      const invalidData = {
        format: null,
        payload: {
          data: { key: "value" },
          event: "wrong",
        },
      };

      // when / then
      expect(() => {
        parsePayload(invalidData);
      }).toThrow(z.ZodError);
    });
  });

  describe("parseRecord", () => {
    it("should parse valid record and return data", () => {
      // given
      const data = {
        payload: {
          event: EMAIL_EVENTS[0],
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

    it("should throw  an error when parsing fails", () => {
      // given
      const invalidRecord = {
        format: "any",
        data: "How about not valid",
      } as any as SQSRecord;

      // when & then
      expect(() => parseRecord(invalidRecord)).toThrow(ParsePayloadError);
    });
  });
});
