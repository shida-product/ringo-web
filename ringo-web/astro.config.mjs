import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://shida-product.github.io',
  base: '/ringo-web',
  // Astro 7 で既定が 'jsx' になり、インライン要素間の空白（例: 「ご相談は 03-… か LINE で」）が消える。
  // 表示を変えないため、Astro 6 までと同じ空白の扱いに固定する。
  compressHTML: true,
});
