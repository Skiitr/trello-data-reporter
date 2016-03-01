'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')

// Gulp task to compile Sass to CSS
gulp.task('compileSass', function () {
  gulp.src('stylesheets/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('stylesheets'))
})
// Default gulp task
gulp.task('default', ['compileSass'], function () {
  console.log('All tasks complete!')
})
