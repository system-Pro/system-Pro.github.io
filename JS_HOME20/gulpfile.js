var browserSync     = require('browser-sync')
    del             = require('del'),
    gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    cache           = require('gulp-cache'),
    concat          = require('gulp-concat'),
    csscomb         = require('gulp-csscomb'),
    cssnano         = require('gulp-cssnano'),  
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    pngquant        = require('imagemin-pngquant');

gulp.task('lib-fonts', function(){
  return gulp.src('src/libs/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts/'));
});

gulp.task('lib-css', ['lib-fonts'], function(){
  var cssmin = gulp.src([
      'src/libs/normalize-css/normalize.css',
      'src/libs/font-awesome/css/font-awesome.min.css'      
    ])
  .pipe(concat('libs.min.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('src/css'));

  var jCarouselCss = gulp.src([
    'src/libs/jcarousel/examples/_shared/css/style.css',
    'src/libs/jcarousel/examples/basic/jcarousel.basic.css'
    ])
  .pipe(concat('jcarousel.basic.css'))
  .pipe(gulp.dest('src/css'))
});

gulp.task('lib-scripts', function(){
    var jsmin = gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/jcarousel/dist/jquery.jcarousel.min.js'
      ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/'));

    var jCouroselJs = gulp.src('src/libs/jcarousel/examples/basic/jcarousel.basic.js')
    .pipe(gulp.dest('src/js/'));
});

gulp.task('sass', ['lib-css'], function(){
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(csscomb())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'lib-scripts'], function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/css/**/*.css', browserSync.reload);
});

gulp.task('default', ['sass', 'lib-scripts']);

gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('clear', function(){
  return cache.clearAll();
});

gulp.task('img', function(){
  return gulp.src('src/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});


gulp.task('build', ['clean', 'img', 'sass', 'lib-scripts'], function(){
  var buildCss = gulp.src('src/css/**/*')
  .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('src/js/**/*')
  .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
});