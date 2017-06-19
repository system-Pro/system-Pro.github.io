;'use strict';

var browserSync     = require('browser-sync'),
    del             = require('del'),
    gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    cache           = require('gulp-cache'),
    cleancss		= require('gulp-clean-css'),
    concat          = require('gulp-concat'),
    imagemin        = require('gulp-imagemin'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    rigger          = require('gulp-rigger'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    spritesmith     = require('gulp.spritesmith'),
    pngquant        = require('imagemin-pngquant');

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        fonts: 'build/fonts/',
        img: 'build/img/',
        js: 'build/js/',
        html5shiv: 'build/js/ie/',
        sprite: 'src/img/sprite/',
        stylesprite: 'src/style/partials/'
    },
    src: {
        html: 'src/*.html',
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        sprite: 'src/style/sprite/*.+(jpg|png)',
        html5shiv: 'node_modules/html5shiv/dist/html5shiv.min.js'
    },
    watch: {
        html: 'src/**/*.html',
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        sprite: 'src/style/sprite/*.+(jpg|png)'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "LiveReload"
}

gulp.task('html:build', function(){
    gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts:build', function(){
    gulp.src(path.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('img:build', function(){
    gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:build', function(){
    gulp.src(path.src.html5shiv)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.html5shiv));

    gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('style:build', function(){
    gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8'], {cascade: false}))
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build', [
    'clean',
    'clear',
    'sprite',
    'html:build',
    'fonts:build',
    'img:build',
    'js:build',
    'style:build'
]);

gulp.task('watch', ['build'], function(){
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
    gulp.watch(path.watch.img, ['img:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.sprite, ['sprite']);
});

gulp.task('sprite', function(){
    var spriteData = gulp.src(path.src.sprite)
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        imgPath: '../img/sprite/sprite.png',
        padding: 2
    }));
    spriteData.img.pipe(gulp.dest(path.build.sprite));
    spriteData.css.pipe(gulp.dest(path.build.stylesprite));
});

gulp.task('browser-sync', function(){
    browserSync(config);
});

gulp.task('clean', function(){
    return del.sync(path.clean);
});

gulp.task('clear', function(){
    return cache.clearAll();
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
