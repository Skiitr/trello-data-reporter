'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var maps = require('gulp-sourcemaps')
var del = require('del')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var autoprefixer = require('gulp-autoprefixer')

/* DEVELOPMENT TASKS */

// Gulp task to compile Sass to CSS
gulp.task('compileSass', function () {
  return gulp.src('src/scss/main.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('concatScripts', function () {
  return gulp.src(['src/js/moment.js', 'src/js/main.js'])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'))
})

// Serve the page up with BrowserSync and watch the Sass and HTML for changes
gulp.task('serve', ['compileSass', 'concatScripts'], function () {
  browserSync({
    server: './'
  })
  gulp.watch('src/scss/**/*', ['compileSass'])
  gulp.watch('src/js/**/*', ['concatScripts'])
  gulp.watch('index.html').on('change', browserSync.reload())
})

/* BUILD TASKS */

// Clean task to clear build files
gulp.task('clean', function () {
  return del(['dist/**/*'])
})

gulp.task('minifyScripts', ['concatScripts'], function () {
  return gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'))
})

// Build task to get files ready for production
gulp.task('build', ['clean', 'minifyScripts'], function () {
  gulp.src(['css/main.css', 'js/app.min.js', 'index.html'], { base: './' })
  .pipe(gulp.dest('dist'))
})

// Default gulp task
gulp.task('default', ['build'], function () {
  console.log('All tasks complete!')
})
