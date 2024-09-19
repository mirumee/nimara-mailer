import type { FastifyPluginOptions } from "fastify/types/plugin";
import type {
  FastifyRegister,
  FastifyRegisterOptions,
} from "fastify/types/register";

export type FastifyPlugin = FastifyRegister extends {
  <Options extends FastifyPluginOptions>(
    plugin: infer P,
    opts?: FastifyRegisterOptions<Options>
  ): any;
}
  ? P
  : never;
