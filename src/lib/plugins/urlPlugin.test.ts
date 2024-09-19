import Fastify, { type FastifyInstance, type FastifyRequest } from "fastify";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { type ConfigSchema } from "@/config";
import { MagicMock } from "@/lib/test/mock";

import UrlPlugin, { hook } from "./urlPlugin";

let fastify: FastifyInstance;
const mockedConfig = vi.hoisted(() => ({}) as Partial<ConfigSchema>);

vi.mock("@/config", () => ({
  CONFIG: mockedConfig,
}));

beforeEach(async () => {
  fastify = Fastify();
});

afterEach(async () => {
  await fastify.close();
});

describe("urlPlugin", () => {
  test("Adds appUrl & urlFull properties to the request object.", async () => {
    // Given
    await fastify.register(UrlPlugin);

    // When
    await fastify.ready();

    // Then
    expect(fastify.hasRequestDecorator("appUrl")).toBeTruthy();
    expect(fastify.hasRequestDecorator("urlFull")).toBeTruthy();
  });

  test("Populates proper appUrl & urlFull and adds it to the request.", async () => {
    // Given
    mockedConfig.APP_URL = undefined;

    const mockedRequest = MagicMock<FastifyRequest>({
      headers: {
        "x-forwarded-proto": "http",
      },
      hostname: "cool.app.com",
      url: "/awesome/api",
    });

    const appUrl = `${mockedRequest.headers["x-forwarded-proto"]}://${mockedRequest.hostname}`;

    // When
    // @ts-expect-error intended to use within on request/response hook.
    hook(mockedRequest, vi.fn(), vi.fn());

    // Then
    expect(mockedRequest.appUrl).toStrictEqual(appUrl);
    expect(mockedRequest.urlFull).toStrictEqual(
      `${appUrl}${mockedRequest.url}`
    );
  });

  test("Adds app url full to the request.", async () => {
    // Given
    mockedConfig.APP_URL = "https://xyz.com";

    const mockedRequest = MagicMock<FastifyRequest>({
      headers: {
        "x-forwarded-proto": "http",
      },
      hostname: "cool.app.com",
      url: "/awesome/api",
    });

    // @ts-expect-error intended to use within on request/response hook.
    hook(mockedRequest, vi.fn(), vi.fn());

    // Then
    expect(mockedRequest.appUrl).toStrictEqual(mockedConfig.APP_URL);
    expect(mockedRequest.urlFull).toStrictEqual(
      `${mockedConfig.APP_URL}/awesome/api`
    );
  });
});
