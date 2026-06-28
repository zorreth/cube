import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/react-dom/') || id.includes('/react/')) return 'react-vendor';
          if (id.includes('/react-router/')) return 'router';
          if (id.includes('/@supabase/')) return 'supabase';
          if (id.includes('/radix-ui/')) return 'radix';
          if (id.includes('/lucide-react/')) return 'lucide';
        },
      },
    },
  },
});
