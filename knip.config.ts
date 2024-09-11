import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['app/*', 'babel.config.js'],
  ignoreDependencies: [
    'eslint-config-standard',
    'eslint-plugin-promise',
    'eslint-plugin-import',
    'eslint-plugin-n',
    'prettier',
    'expo-system-ui',
  ],
};

export default config;
