export type FetchOptions = Omit<RequestInit, "method" | "body">;

export type AnyVariables = Record<string, unknown> | undefined;

export type GraphqlError = {
  extensions: object;
  locations: object[];
  message: string;
  path: string[];
};

export type GraphQLResponse<TData = unknown> = {
  data?: TData;
  errors?: GraphqlError[];
  extensions: {
    cost?: {
      maximumAvailable: number;
      requestedQueryCost: number;
    };
    exception?: object;
  };
};
