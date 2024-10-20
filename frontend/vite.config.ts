import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
/// <reference types='vitest' />
import react from '@vitejs/plugin-react';
import path, { join } from 'path';
import { cwd } from 'process';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load the environment variables based on the mode (e.g., production or development)
  const environmentsPath = path.join(process.cwd(), 'src', 'environments');

  // Load the environment variables from the environments folder
  const env = loadEnv(mode, environmentsPath);


  // Automatically include all VITE_ prefixed env variables
  const envPrefix = 'VITE_';
  const processEnv: any = {};
  for (const key in env) {
    if (key.startsWith(envPrefix)) {
      processEnv[`import.meta.env.${key}`] = JSON.stringify(env[key]);
    }
  }

  return {
    root: __dirname,
    cacheDir: './node_modules/.vite/frontend',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [react(), nxViteTsPaths()],

    build: {
      outDir: './dist/frontend',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      }
    },

    define: processEnv,

    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './coverage/frontend',
        provider: 'v8',
      },
    },
  };
});
