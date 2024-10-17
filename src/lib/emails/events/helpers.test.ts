import { describe, expect, it } from "vitest";
import { z } from "zod";

import { parsePayload, serializePayload, SUPPORTED_EVENTS } from "./helpers";

describe("helpers", () => {
  describe("serializePayload", () => {
    it("should serialize payload correctly when valid data is provided", () => {
      // given
      const mockData = { key: "value" };
      const mockEvent = SUPPORTED_EVENTS[0];

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
          event: invalidEvent as any, // Casting to bypass TypeScript for testing purposes
        });
      }).toThrow(z.ZodError);
    });

    it("should throw an error when invalid data format is provided", () => {
      // given
      const invalidData = null; // Invalid data (null)
      const mockEvent = "order_created";

      // when / then
      expect(() => {
        serializePayload({
          data: invalidData as any, // Casting to bypass TypeScript for testing purposes
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
});
