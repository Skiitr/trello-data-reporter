'use strict'

/* ----GULP REQUIREMENTS---- */

var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var maps = require('gulp-sourcemaps')
var del = require('del')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var autoprefixer = require('gulp-autoprefixer')
var ghPages = require('gulp-gh-pages')

/* ----DEVELOPMENT TASKS---- */

// Compile Sass to CSS
gulp.task('compileSass', function () {
  return gulp.src('src/scss/main.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({ stream: true }))
})

// Combine all local JavaScript files into app.js
gulp.task('concatScripts', function () {
  return gulp.src(['src/js/moment.js', 'src/js/main.js'])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'))
})

gulp.task('minifyScripts', ['concatScripts'], function () {
  return gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'))
  .pipe(browserSync.reload({ stream: true }))
})

// Serve the page up with BrowserSync and watch the Sass and HTML for changes
gulp.task('serve', ['compileSass', 'minifyScripts'], function (cb) {
  if (cb.err) {}
  browserSync({ server: './' })
  gulp.watch('src/scss/**/*', ['compileSass'])
  gulp.watch('src/js/**/*', ['minifyScripts'])
  gulp.watch('index.html').on('change', browserSync.reload())
})

/* ----BUILD TASKS---- */

// Clean task to clear build files
gulp.task('clean', function () {
  return del(['dist'])
})

// Build task to get files ready for production
gulp.task('build', ['clean', 'minifyScripts', 'compileSass'], function () {
  gulp.src(['css/main.css', 'js/app.min.js', 'index.html'], { base: './' })
  .pipe(gulp.dest('dist'))
  browserSync({ server: './dist' })
})

gulp.task('deploy', function () {
  gulp.src('./dist/**/*')
  .pipe(ghPages())
})

// Default gulp task
gulp.task('default', ['build'], function () {
  console.log('All tasks complete!')
})
