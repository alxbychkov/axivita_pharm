import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import handlebars from 'vite-plugin-handlebars';
import { imagetools } from 'vite-imagetools';
import viteImagemin from 'vite-plugin-imagemin';
import imagePresets from 'vite-plugin-image-presets';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        services: resolve(__dirname, 'pages/services.html'),
        quality: resolve(__dirname, 'pages/quality.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (
            /\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)
          ) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
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
    // HTML plugin for multi-page support
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
    }),
    // Handlebars templating
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
      context: (pagePath) => {
        return {
          isHomepage: pagePath.endsWith('index.html'),
          isAbout: pagePath.endsWith('about.html'),
          isServices: pagePath.endsWith('services.html'),
          isQuality: pagePath.endsWith('quality.html'),
          isContact: pagePath.endsWith('contact.html'),
          company: {
            name: 'Axivita Pharm',
            address: 'Leopold Ungar Platz 2, 1190 Vienna, Austria',
            phone: '+43 664 148 06 20',
            email: 'office@axivita-pharm.com',
          },
        };
      },
    }),
    // Сжатие изображений + webp
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
      },
    }),

    // Импорт изображений с трансформацией
    imagetools(),
    imagePresets({
      presets: {
        default: {
          formats: ['webp', 'jpeg'],
          widths: [400, 800, 1200],
          sizes: '100vw',
          loading: 'lazy',
        },
        avatar: {
          formats: ['webp'],
          widths: [100, 200],
          sizes: '(max-width: 600px) 100px, 200px',
          loading: 'lazy',
        },
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
  css: {
    devSourcemap: true,
  },
});
