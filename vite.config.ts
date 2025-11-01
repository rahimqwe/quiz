// vite.config.ts — клиентская сборка + dev-сервер c Express только локально
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    // Подключаем express-мидлвар только в режиме `vite serve`
    ...(command === "serve" ? [expressDevPlugin()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressDevPlugin(): Plugin {
  return {
    name: "express-dev-plugin",
    apply: "serve",
    async configureServer(server) {
      // ВАЖНО: динамический импорт, чтобы не резолвился при build
      const { createServer } = await import("./server/index.ts").catch(async () =>
        // если входная точка у тебя `server/index.ts` нет — пробуем просто `./server`
        await import("./server")
      );
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
