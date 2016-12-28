var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    //pump = require('pump'),
    rename = require("gulp-rename");

gulp.task('concat', function () {
    return gulp.src(['js/src/*.js'])
      .pipe(concat({ path: 'script.main.js' }))
      .pipe(gulp.dest('js/build/'));
});

gulp.task('uglify', function () {
    return gulp.src('js/build/script.main.js')
          .pipe(uglify())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest('js/build'));
});

// Default task
//gulp.task('default', ['concat', 'uglify']);
gulp.task('default', function () {
    gulp.start('concat', 'uglify');
    //gulp.start('uglify', 'concat');
});