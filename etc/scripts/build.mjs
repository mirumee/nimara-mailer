/* global process console */
import * as esbuild from "esbuild";

import { esbuildConfig } from "./common.mjs";

try {
  console.log("Building Fastify artifacts serverless...");
  await esbuild.build({
    ...esbuildConfig,
    banner: {
      js: `
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);`,
    },
    external: ["fsevents", "lightningcss", "esbuild", "vite", "wrangler"],
    packages: "bundle",
  });
  console.log("Server build successful!");
  process.exit(0);
} catch (error) {
  console.log("An error occurred:", error);
  process.exit(1);
}
