import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    {
      name: 'inject-data-manager',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          '    <script src="./static/data-manager.js"></script>\n  </head>'
        )
      }
    }
  ],
})
