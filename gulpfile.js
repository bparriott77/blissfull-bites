// include gulp
var gulp = require('gulp'); 
var del = require('del');

// include plug-ins
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

// default gulp task
gulp.task('default', ['clean', 'imagemin', 'scripts'], function() {
  // watch for JS or image changes
  gulp.watch(['./assets/scripts/source/**/*.js', './assets/images/source/*'], function() {
    gulp.run('clean', 'jshint', 'imagemin', 'scripts');
  });
});

// clean distribution
gulp.task('clean', function() {
    del(['./assets/images/dist/*', './assets/scripts/dist/*']);
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./assets/scripts/source/app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './assets/images/source/**/*',
      imgDst = './assets/images/dist';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./assets/scripts/source/app/*.js'])
    .pipe(browserify({
      debug: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/scripts/dist/'));
});