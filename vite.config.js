import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Determinar base URL baseado no ambiente
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || mode === 'github'
  const base = isGitHubPages ? '/pdf0800/' : '/'
  
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            pdf: ['pdf-lib', 'jspdf'],
            utils: ['html2canvas', 'file-saver']
          }
        }
      }
    },
    server: {
      port: 5173,
      host: true
    },
    preview: {
      port: 4173,
      host: true
    }
  }
})

