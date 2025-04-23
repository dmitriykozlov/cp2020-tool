import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@domain",
        replacement: fileURLToPath(new URL("./src/domain", import.meta.url)),
      },
      {
        find: "@repo",
        replacement: fileURLToPath(
          new URL("./src/repository", import.meta.url),
        ),
      },
    ],
  },
  plugins: [react()],
});
