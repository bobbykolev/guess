'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();

let src = require('./sources');

gulp.task('img', img);

function img() {
  return gulp.src(src.img.all)
    .pipe(gulp.dest(src.dist));
}