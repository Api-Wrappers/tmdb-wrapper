import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  platform: "neutral",
  target: "es2022",
  format: ["esm", "cjs"],
  outDir: "./dist",
  dts: true,
  skipNodeModulesBundle: true,
  clean: true,
  shims: true,
  fixedExtension: true,
});
