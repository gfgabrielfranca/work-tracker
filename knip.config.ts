import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['app/*', 'babel.config.js', 'metro.config.js'],
  ignoreDependencies: [
    'eslint-config-standard',
    'eslint-plugin-promise',
    'eslint-plugin-import',
    'eslint-plugin-n',
    'expo-system-ui',
    'babel-plugin-inline-import',
  ],
};

export default config;
