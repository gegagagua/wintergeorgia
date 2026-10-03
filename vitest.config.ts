import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    globals: false,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Next injects `server-only` in prod; in tests it's a no-op.
      "server-only": path.resolve(__dirname, "./src/test/server-only-shim.ts"),
    },
  },
});
