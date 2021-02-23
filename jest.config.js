module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/pages/**/*.tsx',
    '!<rootDir>/src/pages/_*.tsx',
    '<rootDir>/src/components/**/*.tsx',
    '<rootDir>/src/store/modules/**/*.ts',
    '!<rootDir>/src/store/modules/**/root*',
    '!<rootDir>/src/store/**/types.ts',
  ],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
};
