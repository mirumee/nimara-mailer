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
    coverage: {
      reporter: ["text"],
      provider: "v8",
      include: [
        "src/**/*.ts",
        // "src/**/*.tsx" Should we test email templates?
      ],
      exclude: [
        "src/graphql/schema.ts",
        "src/**/*/generated.ts",
        "src/**/*/types.ts",
        "src/**/*/tailwind.ts",
        "src/emails-sender-proxy.ts",
        "src/**/*/*.d.ts",
        "src/instrument.*",
        "src/lib/plugins/**/*/config.ts",
      ],
    },
    exclude: ["node_modules"],
    include: ["**/*/*.test.ts"],
    root: __dirname,
    setupFiles: ["./src/lib/test/setup"],
  },
});
