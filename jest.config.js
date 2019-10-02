const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^@ws/react-server/(.*)$': resolve(__dirname, './server/$1'),
    '^@ws/react-next/(.*)$': resolve(__dirname, './src/$1'),
    '\\.(css|less)$': resolve(__dirname, './__mocks__/styleMock.js'),
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/*.(test|spec).(ts|tsx)'],
  setupFiles: ['./jest.setup.js'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      pathRegex: /\.(spec|test)\.(ts|tsx)$/,
      warnOnly: true,
    },
  },
};
