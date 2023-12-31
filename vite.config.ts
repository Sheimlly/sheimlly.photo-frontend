import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'
import generouted from '@generouted/react-router/plugin'

// see all documentation here https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build change as your need
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    generouted(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  server: {
    proxy: {
      '/photos': {
        target: 'http://localhost:8000/photos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/photos/, ''),
      },
    }
  }
})