import { HttpError } from "@/lib/errors/api";
import { type GraphqlError } from "@/lib/graphql/types";

export class GraphQLClientError extends HttpError {
  static code = "GRAPHQL_CLIENT_ERROR";
}

export class GraphQLClientHttpError extends GraphQLClientError {
  static code = "GRAPHQL_CLIENT_HTTP_ERROR";
}

export class GraphQLClientInvalidResponseError extends GraphQLClientError {
  static message: "Invalid response format.";
  static code = "GRAPHQL_CLIENT_INVALID_RESPONSE_ERROR";
}

export class GraphQLClientGraphQLError extends GraphQLClientError {
  static code = "GRAPHQL_CLIENT_GRAPHQL_ERROR";

  static fromError(error: GraphqlError) {
    return new GraphQLClientGraphQLError({
      message: error,
    });
  }
}

export class GraphQLClientMultiGraphQLError extends GraphQLClientError {
  static code = "GRAPHQL_CLIENT_MULTI_GRAPHQL_ERROR";

  static fromErrors(errors: GraphqlError[]) {
    return new GraphQLClientMultiGraphQLError({
      message: errors.map(GraphQLClientGraphQLError.fromError).join(", "),
    });
  }
}
