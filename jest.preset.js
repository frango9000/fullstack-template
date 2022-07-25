const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: ['lcov', 'html'],
  setupFilesAfterEnv: ['jest-extended/all'],
  coveragePathIgnorePatterns: ['/node_modules/', '^.*\\.(stub|mock|model|module)\\.ts$'],
};
