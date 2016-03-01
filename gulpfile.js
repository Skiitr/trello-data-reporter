'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')

// Serve the page up with BrowserSync and watch the Sass and HTML for changes
gulp.task('serve', ['compileSass'], function () {
  browserSync({
    server: './'
  })
  gulp.watch('stylesheets/**/*', ['compileSass'])
  gulp.watch('index.html').on('change', browserSync.reload())
})

// Gulp task to compile Sass to CSS
gulp.task('compileSass', function () {
  gulp.src('stylesheets/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('stylesheets'))
  .pipe(browserSync.reload({stream: true}))
})

// Default gulp task
gulp.task('default', ['serve'], function () {
  console.log('All tasks complete!')
})
