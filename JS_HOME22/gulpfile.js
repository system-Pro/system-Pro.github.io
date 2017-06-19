const gulp = require('gulp');
const buble = require('gulp-buble');

gulp.task('default', function () {
    return gulp.src('src/*.js')
        .pipe(buble())
        .pipe(gulp.dest('js'));
});

gulp.task('watch', ['default'], function(){
    gulp.watch('src/*.js', ['default']);
});
