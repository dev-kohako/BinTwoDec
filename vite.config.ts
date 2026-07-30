// defineConfig vem de vitest/config, e não de vite, para o bloco `test` ser
// tipado. Em runtime é o mesmo defineConfig do Vite.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  },
  test: {
    // A lógica de conversão é pura: não precisa de DOM, e node roda bem mais
    // rápido que jsdom.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
