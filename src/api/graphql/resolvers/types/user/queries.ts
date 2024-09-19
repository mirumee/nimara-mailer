import { type GraphqlResolver, type Replace } from "@/api/graphql/helpers";
import { type Post } from "@/api/graphql/schema";

export const id: GraphqlResolver<number, number> = async (
  id,
  _,
  { loaders }
) => {
  const user = await loaders.getUserByIds.load(id);
  return user.id;
};

export const email: GraphqlResolver<string, number> = async (
  id,
  _,
  { loaders }
) => {
  const user = await loaders.getUserByIds.load(id);
  return user.email;
};

export const name: GraphqlResolver<string, number> = async (
  id,
  _,
  { loaders }
) => {
  const user = await loaders.getUserByIds.load(id);
  return user.email;
};

export const posts: GraphqlResolver<
  Array<Replace<Post, { user: number }>>
> = async () => [
  {
    id: "5",
    title: "title",
    user: 3,
    published: true,
    content: "content",
  },
];
