// https://github.com/graphql/graphiql/blob/main/packages/graphql-language-service-server/README.md
export default {
  projects: {
    saleor: {
      schema: ["./packages/codegen/schema.graphql"],
      documents: ["./**/*.graphql"],
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
