
export default {

  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
