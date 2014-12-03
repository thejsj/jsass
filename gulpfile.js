var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
  return browserify('./src/index.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('jsass.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], ['browserify']);
});