import AWSLambdaFastify from "@fastify/aws-lambda";

import { createServer } from "./server";

const app = await createServer();

export const handler = AWSLambdaFastify(app);

await app.ready();
