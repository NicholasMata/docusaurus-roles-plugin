import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts", "src/runtime/index.ts", "src/options/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
      "react",
      "react-dom",
      "@docusaurus/Translate",
      "@theme/Heading",
      "@theme-init/*",
      "@theme-original/*",
    ],
  },
  {
    entry: ["src/theme/**/*.tsx"],
    outDir: "dist/theme",
    format: ["esm"],
    dts: false, // usually not needed for theme runtime files
    sourcemap: true,
    bundle: false,
    target: "es2020",
    external: [
      "react",
      "react-dom",
      "@docusaurus/*",
      "@theme/*",
      "@theme-init/*",
      "@theme-original/*",
    ],
    outExtension() {
      return { js: ".js" };
    },
    esbuildOptions(options) {
      options.outbase = "src/theme";
      options.platform = "browser";
      options.loader = {
        ...options.loader,
        ".ts": "ts",
        ".tsx": "tsx",
      };
    },
  },
]);
