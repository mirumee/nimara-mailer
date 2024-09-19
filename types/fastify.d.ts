import { type FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    /**
     * Application base url.
     */
    appUrl: string;

    /**
     * Generate url from route name.
     * @param name - Route name.
     * @param params - Params of a route.
     */
    urlFor: (name: string, params?: Record<string, string | number>) => string;

    /**
     * Request full url.
     */
    urlFull: string;

    /**
     * Generate path from route name.
     * @param name - Route name.
     * @param params - Params of a route.
     */
    urlPathFor: (
      name: string,
      params?: Record<string, string | number>
    ) => string;
  }

  interface RouteShorthandOptions {
    /**
     * Name of path used to generate path via `urlFor` or `urlPathFor`.
     */
    name?: string;
  }
}
