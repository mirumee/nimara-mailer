import { describe, expect, it } from "vitest";

import { getOperationName } from "./helpers";

describe("helpers", () => {
  describe("getOperationName", () => {
    it("should return the operation name for a query", () => {
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

    it("should return the operation name for a mutation", () => {
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

    it("should return the operation name for a subscription", () => {
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

    it("should return an empty string if the document has no operation name", () => {
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

    it("should return an empty string for invalid document format", () => {
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

    it("should return an empty string if the operation type is missing", () => {
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

    it("should return the correct operation names when there are multiple operations", () => {
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
