module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  rootDir: './src',
  setupFilesAfterEnv: [],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.js'],
  verbose: true,
}
