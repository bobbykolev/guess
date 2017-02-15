'use strict';

require('./gulp-scripts');
require('./gulp-lint');
require('./gulp-styles');
require('./gulp-templates');
require('./gulp-img');
require('./gulp-clean');
require('./gulp-test');

let gulp = require('gulp');
let runSequence = require('run-sequence');

gulp.task('build:dev', (done) => {
  runSequence(
    ['clean'],
    ['scripts'],
    ['styles'],
    ['html'],
    ['img'],
    done
  );
});

module.exports = build;

function build(done) {
  runSequence(
    ['lint'],
    ['test:ci'],
    ['clean'],
    ['scripts'],
    ['styles'],
    ['html'],
    ['img'],
    done
  );
}