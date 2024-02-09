import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sokkaku.collemo.app',
  appName: 'collemo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
