import copy from "esbuild-plugin-copy";

export const esbuildConfig = {
  entryPoints: ["src/server.ts"],
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
  outfile: "build/server.js",
  plugins: [
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
