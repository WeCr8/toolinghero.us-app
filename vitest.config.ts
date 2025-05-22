// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom', // or 'happy-dom' if you want faster/simpler
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('.', import.meta.url)),
      globals: true, // Optional: enables global `describe`, `it`, etc.
      setupFiles: './src/tests/setup.ts', // Optional: preload global mocks or config
    },
  }),
)
