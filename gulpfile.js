var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  fileinclude = require('gulp-file-include');
var paths = {
  'assets' : './assets'
}

gulp.task('serve', function() {
    watchOptions: {
        ignoreInitial: true
    }
    browserSync.init({
        server: "./_site",
        open: false,
        ui: false,
        notify: false
    });

   gulp.watch(paths.assets + '/styles/**/*.scss', ['styles']),
   gulp.watch(paths.assets + '/**/*.html', ['fileinclude']);
   gulp.watch("assets/**/*").on('change', browserSync.reload);
});

// For includes
gulp.task('fileinclude', function() {
  gulp.src(['./assets/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./_site/'));
});

// Move all images
gulp.task('copy', function () {
  return gulp.src('./public/*', {
    base: './public/'
  }).pipe(gulp.dest('_site/img'));
});

gulp.task('styles', function(){
  gulp.src(['./assets/styles/app.scss'])
  .pipe(plumber())
  .pipe(sass())
  .pipe(concat('app.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  // .pipe(minifyCss())
  .pipe(gulp.dest('./_site/css'));
});

gulp.task('scripts', function(){
  gulp.src([
    paths.assets + '/js/app.js',
  ])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./_site/js'));
});

gulp.task('default', ['styles']);
