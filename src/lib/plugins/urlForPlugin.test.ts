import Fastify, { type FastifyInstance } from "fastify";
import { type compile } from "path-to-regexp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import UrlForPlugin, { addRoute, urlFor, urlPathFor } from "./urlForPlugin";

let fastify: FastifyInstance;
let routesMap: Map<string, ReturnType<typeof compile>>;

beforeEach(async () => {
  fastify = Fastify();
  routesMap = new Map();
});

afterEach(async () => {
  await fastify.close();
  routesMap.clear();
});

describe("urlForPlugin", () => {
  describe("Plugin", () => {
    it("Adds urlFor & urlPathFor methods to the request object.", async () => {
      // Given
      await fastify.register(UrlForPlugin);

      // When
      await fastify.ready();

      // Then
      expect(fastify.hasRequestDecorator("urlPathFor")).toBeTruthy();
      expect(fastify.hasRequestDecorator("urlFor")).toBeTruthy();
    });

    it("Throws an error for duplicated routes.", async () => {
      // Given
      const routeName = "test-route";
      await fastify.register(UrlForPlugin);

      // When
      fastify.get("/url-for", { name: routeName }, () => "ok");

      // Then
      expect(() =>
        fastify.get("/url-for2", { name: routeName }, () => "ok")
      ).toThrowError("Route with name test-route already registered");
    });
  });

  describe("urlPathFor", () => {
    it("Throws an error for non existing route.", async () => {
      // Given
      const routeName = "not-there";

      // When
      const pathFor = urlPathFor(routesMap);

      // Then
      // @ts-expect-error intended to use within FastifyRequest context.
      expect(() => pathFor(routeName)).toThrowError(
        "Route with name not-there is not registered"
      );
    });

    it("Generates path for name.", async () => {
      // Given
      const routeName = "not-there";
      const expectedPath = "/super/cool/path";

      // When
      addRoute({
        routes: routesMap,
        routeName: routeName,
        url: expectedPath,
      });
      const pathFor = urlPathFor(routesMap);

      // Then
      // @ts-expect-error intended to use within FastifyRequest context.
      expect(pathFor(routeName)).toStrictEqual(expectedPath);
    });
  });

  describe("urlFor", () => {
    it("Throws an error when appUrl is not defined.", async () => {
      // Given-When-Then
      // @ts-expect-error intended to use within FastifyRequest context.
      expect(() => urlFor(routesMap)).toThrowError(
        "`appUrl` must be defined. Please install `urlPlugin`."
      );
    });

    it("Generates url for name.", async () => {
      const routeName = "cool-route";
      const expectedPath = "/super/cool/another-path";
      const appUrl = "http://cool.app.com";
      const requestContext = {
        appUrl,
        urlPathFor: urlPathFor(routesMap),
      };

      // When
      addRoute({
        routes: routesMap,
        routeName: routeName,
        url: expectedPath,
      });

      // Then
      // @ts-expect-error intended to use within FastifyRequest context.
      expect(urlFor.call(requestContext, routeName)).toStrictEqual(
        appUrl + expectedPath
      );
    });
  });

  describe("addRoute", () => {
    it("Adds route to the routes map", () => {
      // Given
      const routeName = "another-route";

      // When
      expect(routesMap.has(routeName)).toBeFalsy();
      addRoute({
        routes: routesMap,
        url: "/",
        routeName,
      });

      // Then
      expect(routesMap.has(routeName)).toBeTruthy();
    });
  });
});
