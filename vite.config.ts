import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";

export default defineConfig({
  base: "/Otus_Lesson_31_Base/",
  plugins: [react(), githubPagesSpa()],

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setupTests.ts",

    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        functions: 50,
        branches: 50,
        lines: 50,
      },
    },
  },
});
