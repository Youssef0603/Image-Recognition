module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
  ],
};
