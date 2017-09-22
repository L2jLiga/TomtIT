'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// PostCSS settings
const postcssPreprocess = [
	//require('usedcss')({
	//	html: './dist/**/*.html',
	//	js: require('./src/js-static.js')
	//}),
	require('postcss-nth-child-fix'),
	require('postcss-fixes')({preset: 'fixes-only'}),
	require('autoprefixer'),
	
];
const postcssMinify = [
	require('cssnano')({'safe': true, 'zindex': false}),
	require('postcss-csso')(),
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
		'./src/styles/*.scss'
	])
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('app-style.css'))
	.pipe(postcss(postcssPreprocess))
    
    // Original
    .pipe(gulp.dest('./dist/res/css'))

    // minified
    .pipe(rename({suffix: '.min'}))
	.pipe(postcss(postcssMinify))
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
  gulp.watch([
	  	'./src/js-static.js',
	  	'./src/js/**/*.js'
  	], gulp.parallel('compile scripts'));
  gulp.watch([
		'./src/vendor-styles/*.scss',
		'./src/styles/*.scss',
		'./dist/**/*.html'
	], gulp.parallel('compile styles'));
});

gulp.task('build', gulp.series('clean dist', 'compile scripts', 'compile styles'));
