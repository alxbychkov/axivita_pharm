import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import handlebars from 'vite-plugin-handlebars';
import { imagetools } from 'vite-imagetools';
import viteImagemin from 'vite-plugin-imagemin';
import imagePresets from 'vite-plugin-image-presets';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const lang = mode === 'de' ? 'de' : 'en';
  const outDir = lang === 'de' ? 'dist/de' : 'dist';
  const base = process.env.NODE_ENV === 'production' ? '/' : '/';
  const i18nPath = resolve(process.cwd(), `locales/${lang}.json`);
  const i18n = fs.existsSync(i18nPath)
    ? JSON.parse(fs.readFileSync(i18nPath, 'utf8'))
    : {};

  return {
    root: '.',
    base,
    assetsDir: 'assets',
    build: {
      outDir,
      emptyOutDir: lang !== 'de',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'pages/about.html'),
          services: resolve(__dirname, 'pages/services.html'),
          quality: resolve(__dirname, 'pages/quality.html'),
          contact: resolve(__dirname, 'pages/contact.html'),
        },
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];

            if (/\.(css)$/.test(assetInfo.name)) {
              return `css/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
              return `images/[name]-[hash].${ext}`;
            }
            return `[name].${ext}`;
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      cssMinify: true,
    },
    plugins: [
      // HTML plugin for multi-page support + EJS data injection
      createHtmlPlugin({
        minify: {
          collapseWhitespace: false,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true,
        },
        inject: {
          data: { i18n, lang },
        },
      }),
      // Handlebars templating with i18n injection
      handlebars({
        viteNext: true,
        partialDirectory: resolve(__dirname, 'partials'),
        helpers: {
          eq: function (a, b) {
            return a === b;
          },
        },
        context: (pagePath) => {
          return {
            i18n,
            lang,
            isHomepage: pagePath.endsWith('index.html'),
            isAbout: pagePath.endsWith('about.html'),
            isServices: pagePath.endsWith('services.html'),
            isQuality: pagePath.endsWith('quality.html'),
            isContact: pagePath.endsWith('contact.html'),
            company: {
              name: 'Axivita Pharm',
              address: 'Leopold Ungar Platz 2, 1190 Vienna, Austria',
              phone: '+436641480620',
              email: 'office@axivita-pharm.com',
            },
          };
        },
      }),
      // Сжатие изображений + webp
      viteImagemin({
        gifsicle: { optimizationLevel: 7, interlaced: false },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 75 },
        svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
        webp: { quality: 80 },
      }),
      // Импорт изображений с трансформацией
      imagetools(),
      imagePresets({
        presets: {
          default: { formats: ['webp', 'jpeg'], widths: [400, 800, 1200], sizes: '100vw', loading: 'lazy' },
          avatar: { formats: ['webp'], widths: [100, 200], sizes: '(max-width: 600px) 100px, 200px', loading: 'lazy' },
        },
      }),
      // Плагин для очистки папки /de после сборки
      {
        name: 'clean-de-folder',
        closeBundle() {
          const deDir = resolve(__dirname, 'dist/de');
          if (fs.existsSync(deDir)) {
            const files = fs.readdirSync(deDir);
            files.forEach(file => {
              const filePath = path.join(deDir, file);
              const stat = fs.statSync(filePath);
              if (stat.isFile() && !file.endsWith('.html')) {
                fs.unlinkSync(filePath);
              } else if (stat.isDirectory() && file !== 'pages') {
                fs.rmSync(filePath, { recursive: true, force: true });
              }
            });
          }
        },
      },
    ],
    server: { port: 3000, open: true, host: true },
    preview: { port: 4173, open: true },
    css: { devSourcemap: true },
  };
});
