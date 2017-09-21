'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const processors = [
	require('autoprefixer')({browsers: ['ie 11', 'last 2 version']}),
	require('cssnano')({'safe': true, 'zindex': false}),
];

// Clean DIST folder
gulp.task('clean dist', function(){
	return gulp.src(['./dist/res/css/*', '/dist/res/js/*'], {read: false})
	.pipe(clean());
});

// Compile from SASS
gulp.task('compile styles', function () {
	return gulp.src([
		'./src/vendor-styles/*.scss',
		'./src/vendor-styles/*.sass',
		'./src/styles/*.scss',
		'./src/styles/*.sass'
	])
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('app-style.css'))
    
    // Original
    .pipe(gulp.dest('./dist/res/css'))

    // minified
    .pipe(rename({suffix: '.min'}))
	.pipe(postcss(processors))
	.pipe(csso())
	.pipe(gulp.dest("./dist/res/css"));;
});

gulp.task('compile scripts', function(){
	return gulp.src(require('./src/js-static.js'))
	.pipe(babel())
	.pipe(concat('app.js'))

	// Original
	.pipe(gulp.dest('./dist/res/js'))

	// Minify
	.pipe(sourcemaps.init())
	.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/res/js'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', gulp.parallel('compile scripts'));
  gulp.watch('./src/styles/*.*', gulp.parallel('compile styles'));
});

gulp.task('build', gulp.series('clean dist', 'compile scripts', 'compile styles'));
