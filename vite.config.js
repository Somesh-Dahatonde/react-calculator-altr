import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "node_modules/**", 
        "src/setupTests.js",
        "dist/**",
        "eslint.config.js",
        "vite.config.js",
        "src/main.jsx",
        "src/App.jsx"
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});
