import swc from 'unplugin-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default'],
    coverage: {
      enabled: false,
      reportOnFailure: true,
    },
    exclude: [...configDefaults.exclude, 'lib/**/*.spec.ts'],
  },
  plugins: [
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
    viteTsconfigPaths(),
  ],
});
