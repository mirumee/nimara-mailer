import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";

import { CONFIG } from "@/config";
import { isObject } from "@/lib/core";
import {
  GraphQLClientHttpError,
  GraphQLClientInvalidResponseError,
  GraphQLClientMultiGraphQLError,
} from "@/lib/graphql/errors";
import { getOperationName } from "@/lib/graphql/helpers";
import type { Maybe } from "@/lib/types";
import { logger } from "@/server";

import {
  type AnyVariables,
  type FetchOptions,
  type GraphQLResponse,
} from "./types";

export type GraphqlClient = ReturnType<typeof graphqlClient>;

export const graphqlClient = (
  url: string,
  opts?: {
    authToken?: Maybe<string>;
    timeout?: number;
  }
) => ({
  execute: async <
    TResult = unknown,
    TVariables extends AnyVariables = AnyVariables,
  >(
    query: DocumentTypeDecoration<TResult, TVariables> & { toString(): string },
    input?: {
      options?: FetchOptions;
      variables?: TVariables;
    }
  ): Promise<TResult> => {
    const { authToken, timeout } = { ...opts };
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

    let responseJson: GraphQLResponse<TResult>;

    try {
      logger.debug(
        `Executing ${getOperationName(stringQuery)} operation with variables ${JSON.stringify(variables ?? {})}`
      );

      responseJson = (await response.json()) as GraphQLResponse<TResult>;
    } catch (err) {
      logger.error(`Invalid response: ${err}`);
      throw new GraphQLClientInvalidResponseError();
    }

    if (!isObject(responseJson) || !("data" in responseJson)) {
      logger.error(`Invalid json response: ${responseJson}`);
      throw new GraphQLClientInvalidResponseError();
    }

    const data = responseJson["data"];
    const errors = responseJson["errors"];

    logger.debug(
      `${getOperationName(stringQuery)} operation response: ${JSON.stringify(responseJson ?? {})}`
    );

    if (errors) {
      throw GraphQLClientMultiGraphQLError.fromErrors(errors);
    }

    return data as TResult;
  },
});
