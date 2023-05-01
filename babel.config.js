module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
          components: './src/components',
          constants: './src/constants',
          i18n: './src/i18n',
          navigations: './src/navigations',
          screens: './src/screens',
          store: './src/store',
          utils: './src/utils',
          nativeInterface: './src/nativeInterface',
        },
      },
    ],
  ],
};
