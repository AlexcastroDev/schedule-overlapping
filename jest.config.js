module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.ts$': ['babel-jest', { configFile: './config/babel.config.js' }],
    '\\.tsx$': ['babel-jest', { configFile: './config/babel.config.js' }],
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/config/setupJest.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '**/*.tsx'],
  coveragePathIgnorePatterns: ['.styles.ts', '.types.ts', '.config.ts'],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
}
