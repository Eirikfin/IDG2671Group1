import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure .js and .jsx files are resolved
  },
  esbuild: {
    loader: "jsx", // Treat .js files as .jsx
    include: /src\/.*\.(js|jsx)$/, // Apply this loader to .js and .jsx files in the src folder
    jsx: "automatic", // Enable automatic JSX runtime
  },
});
