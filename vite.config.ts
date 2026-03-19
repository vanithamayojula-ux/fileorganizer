import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  let fileConfig = {};
  try {
    const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
  } catch (e) {
    console.warn('Could not load firebase-applet-config.json');
  }

  const firebaseConfig = {
    projectId: env.VITE_FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID || (fileConfig as any).projectId,
    appId: env.VITE_FIREBASE_APP_ID || env.FIREBASE_APP_ID || (fileConfig as any).appId,
    apiKey: env.VITE_FIREBASE_API_KEY || env.FIREBASE_API_KEY || (fileConfig as any).apiKey,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || env.FIREBASE_AUTH_DOMAIN || (fileConfig as any).authDomain,
    firestoreDatabaseId: env.VITE_FIREBASE_DATABASE_ID || env.FIREBASE_DATABASE_ID || (fileConfig as any).firestoreDatabaseId,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || env.FIREBASE_STORAGE_BUCKET || (fileConfig as any).storageBucket,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.FIREBASE_MESSAGING_SENDER_ID || (fileConfig as any).messagingSenderId,
  };

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': JSON.stringify({
        ...env,
        GEMINI_API_KEY: env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY,
        FIREBASE_CONFIG: firebaseConfig,
      }),
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
