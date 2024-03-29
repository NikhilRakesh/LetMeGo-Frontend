import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "LetMeGo",
        "short_name": "LMG",
        "start_url": ".",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#ffffff",
        "icons": [
          {
            "src": "lmg -144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "lmg 512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "screenshots": [
          {
            "src": "/Screenshot 2024-03-29 192716.png",
            "sizes": "1894x958",     
            "type": "image/png",
            "form_factor": "narrow"
          },
          {
            "src": "/26_HOME (1).jpg",
            "sizes": "370x800",     
            "type": "image/png",
            "form_factor": "wide"
          }
        ]
      },
        
    })
  ],
  server: {
    port: 6001,
  },
});
