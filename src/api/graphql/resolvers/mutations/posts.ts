import { type GraphqlResolver, type Replace } from "@/api/graphql/helpers";
import { type Post } from "@/api/graphql/schema";

export const publish: GraphqlResolver<
  Replace<Post, { user: number }>,
  unknown,
  { id: string }
> = async (parent, { id }) => {
  return {
    id,
    title: "title",
    published: true,
    content: "Just published!",
    user: 999,
  };
};
