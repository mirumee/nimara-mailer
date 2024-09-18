import type { CodegenConfig } from "@graphql-codegen/cli";
import { type IGraphQLConfig } from "graphql-config";
import { invariant } from "ts-invariant";

invariant(process.env.NEXT_PUBLIC_SALEOR_URL, `NEXT_PUBLIC_API_URL not set!`);

const schema = `${process.env.NEXT_PUBLIC_SALEOR_URL}/graphql/`;

export const config: CodegenConfig["config"] = {
  documentMode: "string",
  enumsAsTypes: true,
  useTypeImports: true,
  strictScalars: true,
  skipTypename: true,
  preResolveTypes: true,
  dedupeFragments: true,
  dedupeOperationSuffix: true,
  omitOperationSuffix: true,
  mergeFragmentTypes: true,
  exportFragmentSpreadSubTypes: true,
  extractAllFieldsToTypes: true,
  inlineFragmentTypes: true,

  avoidOptionals: {
    field: true,
    inputValue: false,
    object: false,
    defaultValue: false,
  },

  scalars: {
    String: "string",
    Date: "string",
    DateTime: "string",
    Day: "number",
    Decimal: "number",
    GenericScalar: "unknown",
    JSON: "unknown",
    JSONString: "string",
    Metadata: "Record<string, string>",
    Minute: "number",
    PositiveDecimal: "number",
    UUID: "string",
    Upload: "unknown",
    WeightScalar: "unknown",
    _Any: "unknown",
  },
};

const addContent = [
  "// @ts-nocheck",
  "// prettier-ignore",
  "/* eslint-disable */",
  "/* @typescript-eslint/no-unused-vars */",
];

export const schemaConfig = {
  plugins: [
    "typescript",
    {
      add: {
        content: addContent,
      },
    },
  ],
  config,
};

export const operationsConfig = {
  preset: "near-operation-file-preset",
  presetConfig: {
    baseTypesPath: "~@projectluna/codegen/schema",
    fileName: "generated",
    extension: ".ts",
  },
  config,
  plugins: [
    "typescript-operations",
    "typed-document-node",
    {
      add: {
        content: addContent,
      },
    },
  ],
};

export const graphqlConfig = (
  generates: Record<string, object>
): IGraphQLConfig => ({
  projects: {
    default: {
      schema: schema,
      documents: [
        "./src/**/*.graphql",
        "./graphql/**/*.graphql",
        "./node_modules/@projectluna/codegen/graphql/**/*.graphql",
      ],
      extensions: {
        codegen: {
          overwrite: true,
          emitLegacyCommonJSImports: false,
          config: {
            preResolveTypes: true,
          },
          generates,
        },
      },
    },
  },
});

export default graphqlConfig({
  "./schema.ts": schemaConfig,
  "./graphql": operationsConfig,
});
