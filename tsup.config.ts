import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  target: "es5",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  minify: false,
});
