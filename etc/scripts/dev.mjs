/* global process console */
import * as esbuild from "esbuild";

import { esbuildConfig } from "./common.mjs";

try {
  const ctx = await esbuild.context(esbuildConfig);
  await ctx.watch();
  console.log("Watching server...");
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
