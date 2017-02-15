'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let reload = require('browser-sync').reload;
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

let src = require('./sources');

gulp.task('styles', styles);

function styles() {
  return gulp.src(src.styles.main)
    .pipe($.sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers: ['last 2 versions', 'ie 10', 'ios 7'],
	 }))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(src.dist_src))
    .pipe(reload({stream: true}));
}