module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  testMatch: ['**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/client/build/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^src/server/models$': '<rootDir>/tests/__mocks__/models.js',
    '^src/server/models/index.js$': '<rootDir>/tests/__mocks__/models/index.js',
    '^src/server/config/database$': '<rootDir>/tests/__mocks__/database.js',
    '^src/server$': '<rootDir>/tests/__mocks__/server.js',
    '^bcrypt$': '<rootDir>/tests/__mocks__/bcrypt.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!uuid|sequelize)/'
  ],
  moduleDirectories: ['node_modules', 'src'],
};
