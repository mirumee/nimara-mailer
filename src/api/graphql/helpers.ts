import type DataLoader from "dataloader";
import { type FastifyReply, type FastifyRequest } from "fastify";

import { type User } from "@/api/graphql/resolvers/types/user/dataLoaders";

export type GraphqlResolver<ReturnType, Parent = unknown, Args = unknown> = (
  parent: Parent,
  arg: Args,
  ctx: Context
) => Promise<ReturnType>;

export type Replace<T, New> = {
  [K in keyof T]: K extends keyof New ? New[K] : T[K];
};

export type Context = {
  loaders: {
    getUserByIds: DataLoader<number, User>;
  };
  params: {
    extensions: object;
    operationName: string;
    query: string;
  };
  reply: FastifyReply;
  req: FastifyRequest;
};
