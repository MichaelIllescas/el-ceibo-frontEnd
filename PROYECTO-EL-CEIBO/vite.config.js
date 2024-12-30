import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escucha en todas las interfaces de red (0.0.0.0)
    port: 3000, // Cambia el puerto si lo necesitas
  },
});