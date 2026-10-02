import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fork } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'booking-agent-launcher',
      configureServer(server) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const scriptPath = path.resolve(__dirname, 'scripts/booking-agent.js');
        
        console.log('🤖 [Vite Plugin] Starting booking agent backend...');
        const agentProcess = fork(scriptPath);
        
        server.httpServer?.once('close', () => {
          console.log('🤖 [Vite Plugin] Stopping booking agent backend...');
          agentProcess.kill();
        });
      }
    }
  ],
})
