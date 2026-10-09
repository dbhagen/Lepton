module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/app/utilities/**/__tests__/**/*.test.js'],
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { presets: ['@babel/preset-env'], babelrc: false, configFile: false }]
  }
}
