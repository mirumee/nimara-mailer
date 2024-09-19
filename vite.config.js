/** @type {import('vite').UserConfig} */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [tsConfigPaths()],
  exclude: ["**/*/*.test.ts"],
  test: {
    root: __dirname,
    exclude: ["node_modules"],
    include: ["**/*/*.test.ts"],
    setupFiles: ["./src/lib/test/setup"],
    env: {
      ...process.env,
      ...config({ path: ".env.test" }).parsed,
      NODE_ENV: "test",
    },
  },
});
