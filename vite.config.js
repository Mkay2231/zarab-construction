import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard static build: `npm run build` outputs to /dist, deployable to any host.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
