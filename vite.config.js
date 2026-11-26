import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  input: {
    main: resolve(import.meta.dirname, "index.html"),
    shop: resolve(import.meta.dirname, "shop.html"),
    product: resolve(import.meta.dirname, "product-details.html"),
    care: resolve(import.meta.dirname, "care-tips.html"),
  },
});
