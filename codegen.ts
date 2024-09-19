import * as process from "node:process";

import { type CodegenConfig } from "@graphql-codegen/cli";
import { type IGraphQLConfig } from "graphql-config";
import invariant from "ts-invariant";

export const baseCodegenConfig: CodegenConfig["config"] = {
  avoidOptionals: {
    defaultValue: false,
    field: true,
    inputValue: false,
    object: false,
  },
  dedupeFragments: true,
  dedupeOperationSuffix: true,
  documentMode: "string",
  enumsAsTypes: true,
  exportFragmentSpreadSubTypes: true,
  extractAllFieldsToTypes: true,
  mergeFragmentTypes: true,
  omitOperationSuffix: true,
  scalars: {
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
  skipTypename: true,
  strictScalars: true,
  useTypeImports: true,
};

invariant(process.env.SALEOR_URL, "SALEOR_URL not set.");

const config: IGraphQLConfig = {
  projects: {
    internal: {
      extensions: {
        codegen: {
          generates: {
            "./src/api/graphql/schema.ts": {
              config: baseCodegenConfig,
              plugins: ["typescript"],
            },
          },
          overwrite: true,
        },
      },
      schema: "./src/api/graphql/schema.graphql",
    },
    saleor: {
      documents: ["./src/**/*.graphql"],
      extensions: {
        codegen: {
          generates: {
            "./src/graphql/": {
              config: baseCodegenConfig,
              plugins: ["typescript-operations", "typed-document-node"],
              preset: "near-operation-file-preset",
              presetConfig: {
                baseTypesPath: "./schema",
                extension: ".ts",
                fileName: "generated",
              },
            },
            "./src/graphql/schema.ts": {
              config: baseCodegenConfig,
              plugins: ["typescript"],
            },
          },
          overwrite: true,
        },
      },
      schema: `${process.env.SALEOR_URL}/graphql/`,
    },
  },
};

export default config;
