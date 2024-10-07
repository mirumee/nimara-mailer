import {
  type ExecutableDefinitionNode,
  type FieldNode,
  Kind,
  parse,
  type SelectionSetNode,
} from "graphql";

import { BaseError } from "../errors";
import { type TypedDocumentTypeDecoration } from "./types";

type FieldInfo = {
  selectionSet?: FieldMap;
  type?: any;
};

type FieldMap = {
  [key: string]: FieldInfo;
};

const extractFieldsFromAST = (selectionSet: SelectionSetNode): FieldMap => {
  const fields: FieldMap = {};

  selectionSet.selections.forEach((selection) => {
    if (selection.kind === Kind.FIELD) {
      const fieldName = selection.name.value;

      if (selection.selectionSet) {
        // Recursively extract nested fields
        fields[fieldName] = {
          type: "object",
          selectionSet: extractFieldsFromAST(selection.selectionSet),
        };
      } else {
        fields[fieldName] = { type: "scalar" }; // Placeholder for scalar fields
      }
    } else if (selection.kind === Kind.INLINE_FRAGMENT) {
      // Handle inline fragments and merge the fields into the main set
      const fragmentFields = extractFieldsFromAST(selection.selectionSet);
      Object.assign(fields, fragmentFields);
    }
  });

  return fields;
};
class ValidationError extends BaseError {}

const validatePayload = (payload: any, fields: FieldMap, path: string = "") => {
  // Ensure that the payload does not have any extra fields
  for (const fieldName of Object.keys(payload)) {
    // Skip __typename field
    if (fieldName === "__typename") {
      continue;
    }

    if (!(fieldName in fields)) {
      throw new ValidationError(`Invalid field: ${path}.${fieldName}.`);
    }
  }

  // Validate that each expected field is present in the payload
  for (const [fieldName, fieldInfo] of Object.entries(fields)) {
    const newPath = path ? `${path}.${fieldName}` : fieldName;

    if (!(fieldName in payload)) {
      throw new ValidationError(`Missing field: ${newPath}.`);
    }

    if (fieldInfo.type === "object" && fieldInfo.selectionSet) {
      // If it's an edges field, ensure it's an array
      if (fieldName === "edges" && !Array.isArray(payload[fieldName])) {
        throw new ValidationError(`Edges field must be an array: ${newPath}.`);
      }

      // If the field has a nested selectionSet, recursively validate it
      if (Array.isArray(payload[fieldName])) {
        // If it's an array, validate each object in the array
        for (const item of payload[fieldName]) {
          validatePayload(item, fieldInfo.selectionSet, newPath);
        }
      } else {
        // Otherwise, recursively validate the nested object
        validatePayload(payload[fieldName], fieldInfo.selectionSet, newPath);
      }
    }
  }
};

export const validateDocumentAgainstData = ({
  document,
  data,
  rootField = "event",
}: {
  data: any;
  document: TypedDocumentTypeDecoration<any, any>;
  rootField?: string;
}) => {
  const ast = parse(document.toString());

  const definitions = ast.definitions[0] as ExecutableDefinitionNode;

  const eventField = definitions.selectionSet.selections.find((node) => {
    const selection = node as FieldNode;
    return selection.name && selection.name.value === rootField;
  }) as FieldNode;

  if (!eventField?.selectionSet) {
    return { isValid: false, error: "Cannot find root field." };
  }

  const rootFields = extractFieldsFromAST(eventField.selectionSet);

  try {
    validatePayload(data, rootFields);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { isValid: false, error: error.message };
    }

    throw error;
  }
};
