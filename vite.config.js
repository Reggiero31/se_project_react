import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  // add the server object
  server: {
    port: 3000,
  },
});
