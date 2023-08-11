const jestConfig = {
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    roots: ['<rootDir>'],
    moduleFileExtensions: ['ts', 'js', 'tsx'],
    testURL: "http://localhost/",
    'transform': {
      '^.+\\.tsx?$': 'babel-jest',
    },
    testMatch: ['**/__tests__/*.ts?(x)'],
  }
  
  module.exports = jestConfig
  