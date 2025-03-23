import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  // Ensure CSV files are treated properly
  assetsInclude: ["**/*.csv"],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "VueParkingTable",
      fileName: (format) =>
        `vue-parking-table.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      // Externalize Vue to avoid bundling it
      external: ["vue"],
      output: {
        // Global variable used when the bundle is loaded in UMD format
        globals: {
          vue: "Vue",
        },
        // Make sure assets are properly handled
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".csv")) {
            return "assets/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
