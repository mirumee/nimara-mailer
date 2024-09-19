import { Mutation } from "./mutations/index";
import { Query } from "./queries/index";
import { loaders as typesLoaders, types } from "./types/index";

export const resolvers = {
  Query,
  ...types,
  Mutation,
};

export const loaders = { ...typesLoaders };
