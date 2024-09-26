/* global process console */
import * as esbuild from "esbuild";

import { esbuildConfig } from "./common.mjs";

try {
  const ctx = await esbuild.context({
    ...esbuildConfig,
    entryPoints: ["src/server.ts", "src/emails-sender-proxy.ts"],
  });
  await ctx.watch();
  console.log("Watching for changes...");
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
