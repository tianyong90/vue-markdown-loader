const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    "<rootDir>/test/specs/*.js"
  ],
  coverageDirectory: '<rootDir>/test/coverage',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
}
