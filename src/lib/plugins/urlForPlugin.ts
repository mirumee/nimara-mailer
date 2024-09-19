import type {
  FastifyPluginCallback,
  FastifyRequest,
  HTTPMethods,
} from "fastify";
import fastifyPlugin from "fastify-plugin";
import { compile } from "path-to-regexp";

/**
 * Inspired by https://github.com/dimonnwc3/fastify-reverse-routes
 */

export function urlPathFor(routes: Map<string, ReturnType<typeof compile>>) {
  return function (
    this: FastifyRequest,
    name: string,
    params?: Record<string, string | number>
  ) {
    const toPath = routes.get(name);

    if (!toPath) {
      throw new Error(`Route with name ${name} is not registered`);
    }

    const parsedParams = Object.entries(params ?? {}).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      acc[key] = value.toString();
      return acc;
    }, {});

    return toPath(parsedParams);
  };
}

export function urlFor(
  this: FastifyRequest,
  name: string,
  params?: Record<string, string | number>
) {
  if (!this.appUrl) {
    throw new Error("`appUrl` must be defined. Please install `urlPlugin`.");
  }

  return `${this.appUrl}${this.urlPathFor(name, params)}`;
}

export const addRoute = ({
  routes,
  routeName,
  url,
}: {
  routeName: string;
  routes: Map<string, ReturnType<typeof compile>>;
  url: string;
}) => {
  routes.set(routeName, compile(url));
};

/**
 * Attach full url to all the requests.
 */
const urlForPlugin: FastifyPluginCallback = (fastify, _, next) => {
  /**
   * This way it is scoped per fastify instance = no errors with routes registration while running multiple test.
   */
  const ROUTES = new Map();

  fastify.decorateRequest("urlPathFor", urlPathFor(ROUTES));
  fastify.decorateRequest("urlFor", urlFor);

  fastify.addHook("onRoute", (routeOptions) => {
    /**
     * Get methods expose `HEAD` by default, thus might produce unexpected errors.
     * Ignore them in route map generation.
     * https://github.com/fastify/fastify/blob/main/docs/Guides/Migration-Guide-V4.md@/exposeheadroutes-true-by-default
     */
    const routeMethods = (
      Array.isArray(routeOptions.method)
        ? routeOptions.method
        : [routeOptions.method]
    ) as HTTPMethods[];
    const ignoredMethods: HTTPMethods[] = ["HEAD", "OPTIONS"];
    const allowedMethods = routeMethods.filter(
      (method) => !ignoredMethods.includes(<HTTPMethods>method.toUpperCase())
    );

    if (!allowedMethods.length) {
      return;
    }

    const routeName = routeOptions?.name;
    const url = routeOptions.url;

    if (routeName) {
      if (ROUTES.has(routeName)) {
        throw new Error(`Route with name ${routeName} already registered`);
      }

      addRoute({
        url,
        routes: ROUTES,
        routeName,
      });
    }
  });

  next();
};

export default fastifyPlugin(urlForPlugin, { name: "urlForPlugin" });
