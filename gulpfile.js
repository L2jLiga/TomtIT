'use strict';

const [ gulp, sass, postcss, newer, rename, clean, concat, concatCss, uglify, babel, sourcemaps ] = [
  require('gulp'),
  require('gulp-sass'),
  require('gulp-postcss'),
  require('gulp-newer'),
  require('gulp-rename'),
  require('gulp-clean'),
  require('gulp-concat'),
  require('gulp-concat-css'),
  require('gulp-uglifyes'),
  require('gulp-babel'),
  require('gulp-sourcemaps')
];

/**
 * Gulp tasks
 */

gulp.task('clean', runClean);

gulp.task('appStyles', buildAppStyles);

gulp.task('appLogic', buildAppLogic);

gulp.task('watch', runWatch);

gulp.task('build', gulp.series('clean', 'appLogic', 'appStyles'));

/**
 * Removes all builded from source files
 * @return {Gulp} Gulp task
 */
function runClean() {
  return gulp.src([
    './dist/res/css/*',
    './dist/res/js/*'
    ], { read: false })

  .pipe(clean());
}

/**
 * Builds newer app styles and minify it.
 * @return {Gulp} Gulp task
 */
function buildAppStyles() {
  const distFolder = './dist/res/css/';
  const fileName = 'app-styles.css';

  const preprocessors = [
  require('postcss-fixes')({ preset: 'fixes-only' }),
  require('autoprefixer'),
  ];

  const minify = [
  require('postcss-csso'),
  ];

  return gulp.src([
    './src/vendor-styles/*.scss',
    './src/styles/*.scss'
    ])

  .pipe(sass().on('error', sass.logError))

  .pipe(newer(distFolder + fileName))
  .pipe(concatCss(fileName))

  .pipe(postcss(preprocessors))
  .pipe(gulp.dest(distFolder))

  .pipe(rename({suffix: '.min'}))
  .pipe(postcss(minify))
  .pipe(gulp.dest(distFolder));
}

/**
 * Builds newer app logic and minify it
 * @return {Gulp} Gulp task
 */
function buildAppLogic() {
  const distFolder = './dist/res/js';
  const fileName = 'app.js';

  return gulp.src(require('./src/js-static.js'))

  .pipe(newer(distFolder + fileName))
  .pipe(concat(fileName))

  .pipe(babel())
  .pipe(gulp.dest(distFolder))

  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/res/js'));
}

/**
 * Runs watcher
 * @return {Gulp} Gulp task
 */
function runWatch() {
  const watcherParams = [
    {
      tasksList: ['appLogic'],
      sourceFiles: [
      './src/js-static.js',
      './src/js/**/*.js',
      ]
    },

    {
      tasksList: ['appStyles'],
      sourceFiles: [
      './src/vendor-styles/*.scss',
      './src/styles/*.scss',
      ]
    },
  ];

  watcherParams.forEach(task => gulp.watch(task.sourceFiles, gulp.parallel(...task.tasksList)));
}