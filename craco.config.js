const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    postOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  jest: {
    preset: 'ts-jest',
    configure: {
      moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths,
        { prefix: '<rootDir>/' },
      ),
    },
  }
};
