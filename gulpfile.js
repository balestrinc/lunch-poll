const gulp = require('gulp');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const rev = require('gulp-rev');
const ngAnnotate = require('gulp-ng-annotate');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const bowerFiles = require('main-bower-files');

gulp.task('clean', function () {
  return gulp.src('build/')
    .pipe(clean());
});

gulp.task('usemin', function () {
  return gulp.src('./public/src/index.html')
    .pipe(usemin({
      css: [
        rev()
      ],
      js: [
        ngAnnotate(),
        uglify(),
        rev()
      ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function () {
  return gulp.src(['./public/**/*.html', '!./public/vendor/**', '!./public/src/index.html'])
    .pipe(gulp.dest('build/'));
});

gulp.task('bower', function () {
  return gulp.src('./public/src/index.html')
    .pipe(inject(gulp.src(bowerFiles(), { read: false }), { name: 'bower', relative: true }))
    .pipe(inject(gulp.src(['./public/src/js/**/*.js', './public/src/css/**/*.css'], { read: false }), { relative: true }))
    .pipe(gulp.dest('./public/src/'));
});

gulp.task('default', function (cb) {
  return runSequence('clean', 'bower', 'usemin', 'copy', cb)
});