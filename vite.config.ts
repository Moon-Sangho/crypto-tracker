import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/utils/setup-tests.ts",
    // https://vitest.dev/config/#test-globals
    globals: true,
    css: true,
    include: ["./src/**/*.test.{ts,tsx}"],
  },
});
