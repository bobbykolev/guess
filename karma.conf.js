// Karma configuration

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'test/**/*.spec.js'
    ],
    preprocessors: {
      'test/**/*.spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
