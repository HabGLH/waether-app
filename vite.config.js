import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Set base to the repository name used on GitHub Pages so assets are served
  // from the correct subpath. Adjust if your repo name differs.
  base: "/waether-app/",
  plugins: [tailwindcss()],
});
