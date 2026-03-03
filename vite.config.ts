import type { UserConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default {
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
} satisfies UserConfig;
