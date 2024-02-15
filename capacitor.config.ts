import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sokkaku.collemo.app',
  appName: 'コレモ',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
