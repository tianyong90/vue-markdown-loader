const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    "<rootDir>/test/tests/*.test.ts"
  ],
  coverageDirectory: '<rootDir>/test/coverage',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
}
