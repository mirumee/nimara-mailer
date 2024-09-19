export type User = {
  email: string;
  id: number;
  name: string;
};

export const getUserById = async (id: number): Promise<User> => {
  return {
    id,
    name: `name ${id}`,
    email: `email+${id}@example.com`,
  };
};

export const getUserByIdsLoader = async (
  ids: readonly number[]
): Promise<User[]> => {
  return await Promise.all(ids.map((id) => getUserById(id)));
};
