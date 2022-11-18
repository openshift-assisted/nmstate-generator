import { resolve } from 'pathe';
import { defineConfig } from 'vite';
import { WatcherOptions } from 'rollup';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

const watcherOptions: WatcherOptions = {};
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NMState utilites library',
      // the proper extensions will be added
      fileName: 'nmstate-ui-lib',
    },
    watch: watcherOptions,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react',
        'react-dom',
        '@patternfly/react-core',
        '@patternfly/react-icons',
        '@patternfly/react-table',
        '@patternfly/react-code-editor',
        'react-monaco-editor',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    react(),
  ],
});
