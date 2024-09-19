import { type Post } from "@/api/graphql/schema";

import { type GraphqlResolver, type Replace } from "../../helpers";

export const posts: GraphqlResolver<
  Replace<Post, { user: number }>[]
> = async () => {
  return [
    {
      id: "1",
      title: "title",
      published: true,
      content: "content",
      user: 5,
    },
    {
      id: "2",
      title: "title 2",
      published: true,
      content: "content 2",
      user: 7,
    },
  ];
};
