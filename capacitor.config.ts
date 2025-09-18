import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.4059d1023fc540349cb21aabfafff17d',
  appName: 'Style Hub',
  webDir: 'dist',
  server: {
    url: 'https://4059d102-3fc5-4034-9cb2-1aabfafff17d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1a1a1a'
    }
  }
};

export default config;