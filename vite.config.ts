import { defineConfig } from "vite";
import typescript from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    sourcemap: true,
    minify: false,
    lib: {
      entry: "src/index.tsx",
      name: "EmojiCaptcha",
      // fileName: (format) => `EmojiCaptcha.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react"],
      plugins: [typescript()],

      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
        sourcemapExcludeSources: true,
      },
    },
  },
});
