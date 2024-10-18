import { describe, expect, it } from "vitest";

import { redact, type TransformableInfo } from "./logger";

describe("logger", () => {
  describe("redact function", () => {
    it("should redact sensitive keys in the object", () => {
      // given
      const mockObject = {
        name: "John Doe",
        password: "mysecretpassword",
        secretQuestion: "Your pet's name?",
        email: "john@example.com",
      } as any as TransformableInfo;
      const expectedRedacted = {
        name: "John Doe",
        password: "*********",
        secretQuestion: "*********",
        email: "*********",
      };

      // when
      const redactedObj = redact(mockObject);

      // then
      expect(redactedObj).toEqual(expectedRedacted);
    });

    it("should not modify non-sensitive keys", () => {
      // given
      const mockObject = {
        name: "John",
        surname: "Doe",
        password: "mysecretpassword",
        secretQuestion: "Your pet's name?",
        email: "john@example.com",
      } as any as TransformableInfo;

      // when
      const redactedObj = redact(mockObject);

      // then
      expect((redactedObj as any).name).toBe(mockObject.name);
      expect((redactedObj as any).surname).toBe(mockObject.surname);
    });

    it("should handle empty objects", () => {
      // given
      const emptyObject = {} as any as TransformableInfo;
      // when
      const redactedObj = redact(emptyObject);

      // then
      expect(redactedObj).toEqual({});
    });

    it("should handle nested objects and arrays", () => {
      // given
      const nestedObject = {
        name: "Jane Doe",
        credentials: {
          password: "mypassword",
          secretCode: "mysecretcode",
        },
        transactions: [{ phone: "987-65-4321" }, { amount: 100 }],
      } as any as TransformableInfo;
      const expectedRedacted = {
        name: "Jane Doe",
        credentials: {
          password: "*********",
          secretCode: "*********",
        },
        transactions: [{ phone: "*********" }, { amount: 100 }],
      };

      // when
      const redactedObj = redact(nestedObject);

      // then
      expect(redactedObj).toEqual(expectedRedacted);
    });
  });
});
