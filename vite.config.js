/** @type {import('vite').UserConfig} */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  exclude: ["**/*/*.test.ts"],
  plugins: [tsConfigPaths()],
  test: {
    env: {
      ...process.env,
      ...config({ path: ".env.test" }).parsed,
      NODE_ENV: "test",
    },
    exclude: ["node_modules"],
    include: ["**/*/*.test.ts"],
    root: __dirname,
    setupFiles: ["./src/lib/test/setup"],
  },
});
