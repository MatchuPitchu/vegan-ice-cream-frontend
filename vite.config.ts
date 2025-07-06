import react from '@vitejs/plugin-react'
import * as path from 'path'
// adds typecheck directly in the dev server in browser
// https://github.com/fi3ework/vite-plugin-checker
import checker from 'vite-plugin-checker'
// vite-plugin-svgr allow to import SVGs as React components.
// Example: import Logo from "./logo.svg?react"
import svgrPlugin from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin(), !process.env.VITEST ? checker({ typescript: true }) : undefined],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true, // automatically open app in browser on server start
    port: 5000, // change port number
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-tests.ts',
  },
})
