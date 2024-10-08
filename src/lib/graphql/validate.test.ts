import { Kind, type SelectionSetNode } from "graphql";
import { describe, expect, it } from "vitest";

import {
  extractFieldsFromAST,
  validateDocumentAgainstData,
  validatePayload,
  ValidationError,
} from "./validate";

describe("extractFieldsFromAST", () => {
  it("should extract scalar fields", () => {
    // given
    const selectionSet = {
      kind: Kind.SELECTION_SET,
      selections: [
        { kind: Kind.FIELD, name: { value: "id" } },
        { kind: Kind.FIELD, name: { value: "name" } },
      ],
    } as any as SelectionSetNode;

    // when
    const fields = extractFieldsFromAST(selectionSet);

    // then
    expect(fields).toEqual({
      id: { type: "scalar" },
      name: { type: "scalar" },
    });
  });

  it("should extract nested object fields", () => {
    // given
    const selectionSet = {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.FIELD,
          name: { value: "user" },
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [
              { kind: Kind.FIELD, name: { value: "id" } },
              { kind: Kind.FIELD, name: { value: "email" } },
            ],
          },
        },
      ],
    } as any as SelectionSetNode;

    // when
    const fields = extractFieldsFromAST(selectionSet);

    // then
    expect(fields).toEqual({
      user: {
        type: "object",
        selectionSet: {
          id: { type: "scalar" },
          email: { type: "scalar" },
        },
      },
    });
  });

  it("should merge inline fragment fields", () => {
    // given
    const selectionSet = {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.INLINE_FRAGMENT,
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [
              { kind: Kind.FIELD, name: { value: "id" } },
              { kind: Kind.FIELD, name: { value: "name" } },
            ],
          },
        },
      ],
    } as any as SelectionSetNode;

    // when
    const fields = extractFieldsFromAST(selectionSet);

    // then
    expect(fields).toEqual({
      id: { type: "scalar" },
      name: { type: "scalar" },
    });
  });
});

describe("validatePayload", () => {
  it("should validate payload with scalar fields", () => {
    // given
    const fields = {
      id: { type: "scalar" },
      name: { type: "scalar" },
    };
    const payload = { id: "123", name: "John" };

    // when/then
    expect(() => validatePayload(payload, fields)).not.toThrow();
  });

  it("should throw error for missing fields", () => {
    // given
    const fields = {
      id: { type: "scalar" },
      name: { type: "scalar" },
    };
    const payload = { id: "123" };

    // when/then
    expect(() => validatePayload(payload, fields)).toThrow(ValidationError);
  });

  it("should throw error for extra fields", () => {
    // given
    const fields = {
      id: { type: "scalar" },
      name: { type: "scalar" },
    };
    const payload = { id: "123", name: "John", age: 30 };

    // when/then
    expect(() => validatePayload(payload, fields)).toThrow(ValidationError);
  });

  it("should validate nested object fields", () => {
    // given
    const fields = {
      user: {
        type: "object",
        selectionSet: {
          id: { type: "scalar" },
          email: { type: "scalar" },
        },
      },
    };
    const payload = { user: { id: "1", email: "test@example.com" } };

    // when/then
    expect(() => validatePayload(payload, fields)).not.toThrow();
  });

  it("should throw error for invalid nested fields", () => {
    // given
    const fields = {
      user: {
        type: "object",
        selectionSet: {
          id: { type: "scalar" },
          email: { type: "scalar" },
        },
      },
    };
    const payload = { user: { id: "1" } };

    // when/then
    expect(() => validatePayload(payload, fields)).toThrow(ValidationError);
  });
});

describe("validateDocumentAgainstData", () => {
  const document = `
    query TestSubscription {
      event {
        id
        name
        user {
          id
          email
        }
      }
    }
  `;

  it("should validate matching data against the document", () => {
    // given
    const data = {
      id: "1",
      name: "Event",
      user: {
        id: "1",
        email: "user@example.com",
      },
    };

    // when
    const result = validateDocumentAgainstData({
      document,
      data,
    });

    // then
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("should return error for missing fields", () => {
    // given
    const data = {
      id: "1",
      user: {
        id: "1",
        email: "user@example.com",
      },
    };

    // when
    const result = validateDocumentAgainstData({
      document,
      data,
    });

    // then
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Missing field: name.");
  });

  it("should return error for extra fields", () => {
    // given
    const data = {
      id: "1",
      name: "Event",
      extraField: "extra",
      user: {
        id: "1",
        email: "user@example.com",
      },
    };

    // when
    const result = validateDocumentAgainstData({
      document,
      data,
    });

    // then
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Invalid field: extraField.");
  });

  it("should return error if root field not found", () => {
    // given
    const documentWithoutRootField = `
      query {
        otherRoot {
          id
        }
      }
    `;

    // when
    const result = validateDocumentAgainstData({
      document: documentWithoutRootField,
      data: {},
    });

    // then
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Cannot find root field.");
  });
});
