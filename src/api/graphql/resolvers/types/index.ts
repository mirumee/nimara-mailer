import { getUserByIdsLoader } from "./user/dataLoaders";
import * as User from "./user/queries";

const types = { User };
const loaders = { getUserByIdsLoader };

export { types, loaders };
