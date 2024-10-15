import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";
import copy from "esbuild-plugin-copy";

const isSentryEnabled =
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN;

export const esbuildConfig = {
  entryPoints: ["src/events-receiver.ts", "src/emails-sender.ts"],
  outdir: "build",
  bundle: true,
  allowOverwrite: true,
  sourcemap: true,
  minify: false,
  platform: "node",
  target: ["node20"],
  treeShaking: true,
  packages: "external",
  banner: {},
  external: [],
  format: "esm",
  tsconfig: "./tsconfig.json",
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV ?? "production"}"`,
  },
  plugins: [
    sentryEsbuildPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      disable: !isSentryEnabled,
    }),
    copy({
      watch: true,
      resolveFrom: "cwd",
      assets: {
        from: ["./src/api/graphql/schema.graphql"],
        to: ["./build"],
      },
    }),
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./package.json"],
        to: ["./build/package.json"],
      },
    }),
  ],
};
