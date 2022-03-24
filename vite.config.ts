import reactRefresh from "@vitejs/plugin-react-refresh";
import { join } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "build",
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  define: {
    "process.env": "{}",
  },
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1"),
      },
    ],
  },
  plugins: [reactRefresh()],
  test: {
    environment: "happy-dom",
  },
});
