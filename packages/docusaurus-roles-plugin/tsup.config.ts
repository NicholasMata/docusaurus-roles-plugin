import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts", "src/runtime/index.ts"],
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
]);
