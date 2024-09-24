import { config } from "dotenv";

config();

/**
 * https://github.com/graphql/graphiql/blob/main/packages/graphql-language-service-server/README.md
 */
export default {
  projects: {
    default: {
      schema: [`${process.env.SALEOR_URL}/graphql/`],
      documents: ["./src/**/*.graphql"],
      schemaCacheTTL: 60 * 60 * 1000, // In ms
      extensions: {
        languageService: {
          cacheSchemaFileForLookup: false,
          enableValidation: true,
          fillLeafsOnComplete: true,
        },
      },
    },
  },
};
