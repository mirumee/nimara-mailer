import { type FastifyBaseLogger } from "fastify";

import { CONFIG } from "@/config";
import { isObject } from "@/lib/core";
import {
  GraphQLClientHttpError,
  GraphQLClientInvalidResponseError,
  GraphQLClientMultiGraphQLError,
} from "@/lib/graphql/errors";
import { getOperationName } from "@/lib/graphql/helpers";
import type { Maybe } from "@/lib/types";

import {
  type AnyVariables,
  type FetchOptions,
  type GraphQLResponse,
  type TypedDocumentTypeDecoration,
} from "./types";

export type GraphqlClient = ReturnType<typeof graphqlClient>;

export const graphqlClient = (
  url: string,
  opts?: {
    authToken?: Maybe<string>;
    logger?: FastifyBaseLogger;
    timeout?: number;
  }
) => ({
  execute: async <
    TResult = unknown,
    TVariables extends AnyVariables = AnyVariables,
  >(
    query: TypedDocumentTypeDecoration<TResult, TVariables>,
    input?: {
      options?: FetchOptions;
      variables?: TVariables;
    }
  ): Promise<TResult> => {
    const { authToken, timeout, logger } = { ...opts };
    const { variables, options } = input ?? {};
    const stringQuery = query.toString();

    const response = await fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: JSON.stringify({
        query: stringQuery,
        ...(variables && { variables }),
      }),
      signal: AbortSignal.timeout(timeout ?? CONFIG.FETCH_TIMEOUT),
    });

    if (!response.ok) {
      throw new GraphQLClientHttpError({
        statusCode: response.status,
        message: response.text,
      });
    }

    const operationName = getOperationName(stringQuery);
    let responseJson: GraphQLResponse<TResult>;

    try {
      logger?.debug(`Executing ${operationName} operation.`, { variables });

      responseJson = (await response.json()) as GraphQLResponse<TResult>;
    } catch (error) {
      logger?.error(`Invalid response.`, { error });
      throw new GraphQLClientInvalidResponseError();
    }

    if (!isObject(responseJson) || !("data" in responseJson)) {
      logger?.error("Invalid json response.", { response: responseJson });
      throw new GraphQLClientInvalidResponseError();
    }

    const data = responseJson["data"];
    const errors = responseJson["errors"];

    logger?.debug(`${operationName} operation response.`, {
      response: responseJson,
    });

    if (errors) {
      throw GraphQLClientMultiGraphQLError.fromErrors(errors);
    }

    return data as TResult;
  },
});
