import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import mdx from '@mdx-js/rollup';
import rehypeStarryNight from 'rehype-starry-night';
import path from 'path';

export default defineConfig({
  plugins: [
    solid(),
    mdx({
      jsxImportSource: 'solid-js/h',
      rehypePlugins: [rehypeStarryNight]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './_var.scss';\n`,
        loadPaths: [
          './src/styles',
        ]
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@wooorm/starry-night', replacement: path.resolve(__dirname, '../../node_modules/@wooorm/starry-night') },
    ]
  }
})
