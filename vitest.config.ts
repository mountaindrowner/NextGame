import { defineConfig } from 'vitest/config';

// Default environment stays `node` so the existing pure-core / data suites run
// fast and unchanged. Scene-lifecycle tests opt into happy-dom per file with a
// `// @vitest-environment happy-dom` docblock. setupFiles installs the canvas
// stub Phaser needs at import time (no-op under node).
export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/helpers/setup.ts'],
  },
});
