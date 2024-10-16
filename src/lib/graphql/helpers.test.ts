import { describe, expect, test } from "vitest";

import { getOperationName } from "./helpers";

describe("helpers", () => {
  describe("getOperationName", () => {
    test("should return the operation name for a query", () => {
      const document = `
      query GetUser {
        user(id: "1") {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("GetUser");
    });

    test("should return the operation name for a mutation", () => {
      const document = `
      mutation CreateUser {
        createUser(input: { name: "John" }) {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("CreateUser");
    });

    test("should return the operation name for a subscription", () => {
      const document = `
      subscription OnUserCreated {
        userCreated {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("OnUserCreated");
    });

    test("should return an empty string if the document has no operation name", () => {
      const document = `
      query {
        user(id: "1") {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("");
    });

    test("should return an empty string for invalid document format", () => {
      const document = `
      {
        user(id: "1") {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("");
    });

    test("should return an empty string if the operation type is missing", () => {
      const document = `
      GetUser {
        user(id: "1") {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("");
    });

    test("should return the correct operation names when there are multiple operations", () => {
      const document = `
      query GetUser {
        user(id: "1") {
          id
          name
        }
      }
      mutation CreateUser {
        createUser(input: { name: "Jane" }) {
          id
          name
        }
      }
    `;
      expect(getOperationName(document)).toBe("GetUser, CreateUser");
    });
  });
});
