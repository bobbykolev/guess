'use strict';

let gulp = require('gulp');
let serve = require('./build/gulp-serve');
let test = require('./build/gulp-test');
let build = require('./build/gulp-build');

gulp.task('build', build);
gulp.task('test:unit', test.unit);
gulp.task('serve',['build:dev'], serve);

gulp.task('default', ['build:dev'], serve);